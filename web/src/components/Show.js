const React = require('react')
const { Link } = require('react-router')
const { path, pathOr, map } = require('ramda')

const action = (a, component) => path(['props', 'route', a], component)
const getState = (state, component) => path(['state', state], component)
const router = (a, component) => path(['props', 'router', a], component)

const Show = React.createClass({
  getInitialState () {
    return {
      doc: {}
    }
  },
  componentDidMount () {
    this.props.route.get(this.props.params.id)
      .then(doc => this.setState({doc}))
      .catch(err => console.log(err.message))
  },
  handleRemove () {
    if (confirm('Are you sure?')) {
      action('remove', this)(getState('doc', this))
        .then(res => router('push', this)('/'))
    }
  },
  render () {
    const field = s => pathOr('undefined', ['state', 'doc', s], this)
    const items = pathOr([], ['state', 'doc','items'], this)

    const card = item =>
      <article key={item._id} className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
        <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{item.key}</h1>
        <div className="pa3 bt b--black-10">
          <p className="f6 f5-ns lh-copy measure">{item.data}</p>
        </div>
      </article>

    return (
      <div className="pa4">
        <header>
          <h1>{field('name')}</h1>
          <p>{field('description')}</p>
        </header>
        <main>
          <h3>Items</h3>
          { map(card, items) }
          <div className="cf mt3">
            <div className="fr">
              <Link to={`/${field('_id')}/edit`} className="ml3 mt2 f6 link dim br2 ba ph3 pv2 mb2 dib black bg-transparent">Edit</Link>
              <button className="ml3 f6 link dim br2 ph3 pv2 mb2 dib white bg-orange" onClick={this.handleRemove}>Remove</button>
              <Link to="/" className="ml3 mt2 f6 link dim br2 ba ph3 pv2 mb2 dib black bg-transparent">Home</Link>
            </div>
          </div>
        </main>
      </div>
    )
  }
})

module.exports = Show
