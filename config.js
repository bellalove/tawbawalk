module.exports = {

  // client target
  clientd: __dirname + '/.',

  // server target
  serverd: __dirname + '/server', // '/.',

  // client source
  srcClient: __dirname + '/src/client',

  // server source
  srcServer: __dirname + '/src/server',

  // Dokku/Heroku
  port: Number(process.env.PORT || 8000)
 
}
