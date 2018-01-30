import feathers from 'feathers/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import feathersStorage from '~/helpers/feathers-storage';
import io from 'socket.io-client';
// import { CookieStorage } from 'cookie-storage';

const host = window.location.origin;
const socket = io(host, {transports: ['websocket']});

const api = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(auth({ storage: feathersStorage }));
  // .configure(auth({ storage: new CookieStorage() }));

export default api;
