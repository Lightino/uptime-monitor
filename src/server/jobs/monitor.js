import cron from "node-cron";
import { knex } from "../db/index.js";

let wsClients = new Set();
export function setWebSocketClients(clients) {
  wsClients = clients;
}

export function startMonitorJob() {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const endpoints = await knex("endpoints").select("*");

      for (const ep of endpoints) {
        const start = Date.now();
        let status = false;

        try {
          const res = await fetch(ep.url, {
            method: "GET",
            signal: AbortSignal.timeout(10000),
          });
          status = res.ok;
        } catch (err) {
          console.error(`❌ Errore su ${ep.url}:`, err.message);
        }

        const responseTime = Date.now() - start;

        await knex("endpoints").where({ id: ep.id }).update({
          status,
          responseTime: responseTime,
          updated_at: new Date(),
        });
      }

      // Prepara i dati aggiornati da inviare
      const updated = await knex("endpoints").select("*");
      const payload = JSON.stringify({ type: "update", data: updated });

      // Invia via WebSocket
      wsClients.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
          ws.send(payload);
        }
      });

      console.log("🔁 Monitor job executed");
    } catch (err) {
      console.error("Errore durante il monitoraggio:", err.message);
    }
  });
}
