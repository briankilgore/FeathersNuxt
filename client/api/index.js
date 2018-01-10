import feathers from 'feathers/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import feathersStorage from '~/helpers/feathers-storage';
import io from 'socket.io-client';

const socket = io('http://localhost:3030', {transports: ['websocket']});

const api = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(auth({ storage: feathersStorage }));

export default api;
