import { AuthenticationClient, ManagementClient } from 'auth0';
import log from '../lib/log.js';

export default async function auth0ManagementMiddleware(req, res, next) {
  log.verbose('Chiedo ad Auth0 un token id per gestire gli utenti');

  const authClient = new AuthenticationClient({
    domain: process.env.AUTH0_OLD_DOMAIN,
    clientId: process.env.M2M_CLIENTID,
    clientSecret: process.env.M2M_CLIENTSECRET,
  });

  authClient.clientCredentialsGrant(
    {
      audience: `https://${process.env.AUTH0_OLD_DOMAIN}/api/v2/`,
      scope: 'read:users update:users',
    },
    (err, response) => {
      if (err) {
        return next(err);
      }

      const newManagementClient = new ManagementClient({
        token: response.access_token,
        domain: process.env.AUTH0_OLD_DOMAIN,
      });

      log.verbose('Client Auth0 inizializzato');
      req.auth0Client = newManagementClient;
      next();
    }
  );
}
