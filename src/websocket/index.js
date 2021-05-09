import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

window.Pusher = Pusher;

export default new Echo({
  // host: 'http://127.0.0.1:6001',
  wsHost: 'localhost',
  wsPort: 6001,
  broadcaster: 'pusher',
  key: 'lasjdoaisdoiajsdi',
  authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  },
  forceTLS: false,
  encrypted: false,
  disableStats: true,
  protocol: ['websocket'],
});

// By the moment Just and listening to this, for test, ok.
