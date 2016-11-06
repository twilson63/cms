const React = require('react')
const { Link } = require('react-router')
const { pluck, prop } = require('ramda')

const DocumentIndex = React.createClass({
  getInitialState() {
    return { docs: [] }
  },
  componentDidMount() {
    this.props.route.all()
      .then(prop('rows'))
      .then(pluck('doc'))
      .then(docs => this.setState({docs}))
  },
  render() {
    return (
      <div className="pa4">
        <header>
          <h1>Content Managment System</h1>
        </header>
        <main className="mw6 center">
          <header>
            <div className="cf">
              <div className="fr">
                <Link to="/new" className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue">Add New</Link>
                <a href="#"
                  className="ml2 f6 link dim br2 ba ph3 pv2 mb2 dib black"
                  onClick={this.props.route.auth.logout}>
                  Logout
                </a>
              </div>
            </div>
            <h3>Documents</h3>
          </header>
          { this.state.docs.map(doc =>
            <article className="dt dim w-100 bb b--black-05 pb2 mt2 " key={doc._id}>
              <Link className="dtc v-mid pl3 link" to={`/${doc._id}`}>
                <h3 className="f3 near-black">{doc.name}</h3>
                <p className="black-50">{doc.description}</p>
              </Link>
            </article>

          )}
        </main>
      </div>
    )
  }
})

module.exports = DocumentIndex
