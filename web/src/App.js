const React = require('react')
const { Router, Route, browserHistory } = require('react-router')
const { path, curry } = require('ramda')
const PouchDB = require('pouchdb')
const db = PouchDB('cms')
PouchDB.sync(db, 'https://mymwa-cms-api-vgwmpgoceb.now.sh', {
  live: true,
  retry: true
})

const Index = require('./components/Index')
const Show = require('./components/Show')
const Form = require('./components/Form')

const setAction = curry((component, action) => path(['state', action], component))

const App = React.createClass({
  getInitialState() {
    return {
      all: _ => db.allDocs({include_docs: true}),
      get: id => db.get(id),
      put: doc => db.put(doc),
      remove: doc => db.remove(doc)
    }
  },
  render () {
    const action = setAction(this)
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Index} all={action('all')} />
        <Route path="/new" component={Form} put={action('put')} />
        <Route path="/:id" component={Show} get={action('get')} remove={action('remove')} />
        <Route path="/:id/edit" component={Form} get={action('get')} put={action('put')} />
      </Router>
    )
  }
})

module.exports = App
