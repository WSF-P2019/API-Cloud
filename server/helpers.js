module.exports = new Promise(server.start)
  .then(data => {
    return [data, null]
  })
  .catch(err => {
    return [null, err]
  })
