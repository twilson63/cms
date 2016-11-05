require('dotenv').config()
const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
PouchDB.plugin(require('pouchdb-upsert'))

const { composeP, prop, pluck, head,
  ifElse, isEmpty } = require('ramda')

const db = PouchDB(process.env.DB)

module.exports = async function (req, res) {
  // GET /profiles_page
  return await composeP(
    ifElse(isEmpty, _ => ({ok: false}), head),
    pluck('value'),
    prop('rows'),
    url =>
      db.query('doc', {key: url, limit: 1})
        .catch(err => ({ok: false}))
  )(req.url)
}

// setup view if does not exist
db.putIfNotExists({
  _id: '_design/doc',
  language: 'javascript',
  views: {
    doc: {
      map: function (doc) {
        if (doc.type === 'content') {
          var v = {}
          doc.items.forEach(function (item) {
            v[item.key] = item.data
          })
          emit('/' + doc.name, v)
        }
      }.toString()
    }
  }
}).catch(err => console.log(err))
