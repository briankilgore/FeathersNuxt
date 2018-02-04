import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import socketio from '@feathersjs/socketio-client';
import feathersStorage from '~/helpers/feathers-storage';
import io from 'socket.io-client';
// import { CookieStorage } from 'cookie-storage';

const host = window.location.origin;
const socket = io(host, {transports: ['websocket']});

const api = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: feathersStorage }));
  // .configure(auth({ storage: new CookieStorage() }));

export default api;
