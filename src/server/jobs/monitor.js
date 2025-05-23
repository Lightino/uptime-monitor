import cron from "node-cron";
import { knex } from "../db/index.js";
import _ from "lodash";

let wsClients = new Set();
export function setWebSocketClients(clients) {
  wsClients = clients;
}

export function startMonitorJob() {
  cron.schedule("*/5 * * * *", async () => { // Every 5 min
    try {
      const endpoints = await knex("endpoints").select("*");

      for (const ep of endpoints) {
        const start = Date.now();
        let status = false;

        let errors = 0;

        try {
          const res = await fetch(ep.url, {
            method: "GET",
            signal: AbortSignal.timeout(10000),
          });
          status = res.ok;
        } catch (err) {
          errors = ep.incidents + 1;
          console.error(`❌ Errore su ${ep.url}:`, err.message);
        }

        const responseTime = Date.now() - start;

        ep.responseTimeArray['data'] = _.takeRight([...ep.responseTimeArray['data'] , responseTime], 10);

        await knex("endpoints").where({ id: ep.id }).update({
          status,
          responseTime: responseTime,
          incidents: errors,
          prev_responseTime: ep.responseTime,
          responseTimeArray: ep.responseTimeArray,
          prev_incidents: ep.incidents,
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
