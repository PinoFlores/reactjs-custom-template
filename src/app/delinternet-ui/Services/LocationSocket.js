import openSocketIO from 'socket.io-client';

const REALTIME_SOCKET_SERVER = process.env.REACT_APP_REALTIME_SOCKET_SERVER;

export class LocationSocket {
  static instance = LocationSocket.instance || new LocationSocket();

  constructor() {
    this.socket = this.createInstance();

    this.socket.on('disconnect', () => {
      console.log('disconnect');
      this.createInstance();
    });

    this.socket.on('connect_error', err => {
      this.createInstance();
      console.log(err.message);
    });
  }

  createInstance() {
    this.socket = openSocketIO(REALTIME_SOCKET_SERVER, {
      transports: ['websocket'],
      forceJSONP: true,
      forceNew: true,
    });
    return this.socket;
  }

  subscribeToUsersPositions(callback) {
    this.socket.on('usersPosition', callback);
  }
}
