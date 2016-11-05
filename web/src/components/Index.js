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
        <main>
          <header>
            <Link to="/new">Add New</Link>
            <h3>Documents</h3>
          </header>
          <ul className="list">
            { this.state.docs.map(doc =>
              <li key={doc._id}>
                <Link className="link" to={`/${doc._id}`}>{doc.name}</Link>
              </li>

            )}
          </ul>
        </main>
      </div>
    )
  }
})

module.exports = DocumentIndex
