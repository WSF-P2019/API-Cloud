module.exports = {
  name: 'token',
  version: '1.0.0',
  register: (server, handler) => {
    server.events.on('request', (req, res) => {
      return res.continue;
    });
  }
}
