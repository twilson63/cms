const React = require('react')
const { Router, Route, browserHistory } = require('react-router')
const { path, curry } = require('ramda')
const PouchDB = require('pouchdb')
const db = PouchDB('cms')

const Index = require('./components/Index')
const Show = require('./components/Show')
const Form = require('./components/Form')
const Login = require('./components/Login')

const setAction = curry((component, action) => path(['state', action], component))

const AuthService = require('./utils/AuthService').default

const auth = new AuthService(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN
)

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}
const redirect = (nextState, replace) => {
  if (auth.loggedIn()) {
    replace({ pathname: '/'})
  }
}

const sync = _ => {
  PouchDB.sync(db, process.env.REACT_APP_DB, {
    live: true,
    retry: true,
    ajax: {
      headers: {
        'Authorization': 'Bearer ' + auth.getToken()
      }
    }
  })
}

const App = React.createClass({
  getInitialState() {
    console.log('init')
    if (auth.loggedIn()) { sync() }
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
        <Route path="/" component={Index} all={action('all')} onEnter={requireAuth} auth={auth} />
        <Route path="/login" component={Login} auth={auth} onEnter={redirect} onExit={sync} />
        <Route path="/new" component={Form} put={action('put')} onEnter={requireAuth} />
        <Route path="/:id" component={Show} get={action('get')} remove={action('remove')} onEnter={requireAuth} />
        <Route path="/:id/edit" component={Form} get={action('get')} put={action('put')} onEnter={requireAuth} />
        <Route path="/access_token=:token" component={Login} />
      </Router>
    )
  }
})

module.exports = App
