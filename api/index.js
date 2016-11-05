require('dotenv').config()
const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
PouchDB.plugin(require('pouchdb-upsert'))

const { composeP, prop, pluck, head } = require('ramda')
const db = PouchDB(process.env.DB)
db.putIfNotExists({
  _id: '_design/doc',
  language: 'javascript',
  views: {
    key: {
      map: function (doc) {
        doc.items.forEach(function (item) {
          emit('/' + doc.name + '/' + item.key, item.data)
        })
      }.toString()
    }
  }
}).catch(err => console.log(err))

module.exports = async function (req, res) {
  // GET /profiles_page/title
  return await composeP(
    head,
    pluck('value'),
    prop('rows'),
    url => db.query('doc/key', {key: url, limit: 1})
  )(req.url)

  //return {ok: true}
}
