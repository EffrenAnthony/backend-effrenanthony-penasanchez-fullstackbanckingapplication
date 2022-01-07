const db = require('mongoose')
// seteamos las promesas
db.Promise = global.Promise

async function connect (url) {
  await db.connect(url, {
  }).then(() => console.log('[db] Contected to DB'))
}

module.exports = connect
