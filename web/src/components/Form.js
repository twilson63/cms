const React = require('react')
const { Link } = require('react-router')
const { pathOr, path, set, lensProp, clone, reject, propEq, lensPath } = require('ramda')

const AddItem = require('./AddItem')

const Form = React.createClass({
  getInitialState () {
    return {
      doc: {
        items: []
      }
    }
  },
  componentDidMount () {
    const id = path(['props', 'params', 'id'], this)
    if (id) {
      path(['props', 'route', 'get'], this)(id)
        .then(doc => this.setState({doc}))

    }
  },
  handleChange (v) {
    return (e) =>
      this.setState({doc: set(lensProp(v), e.target.value, this.state.doc)})
  },
  addNewItem (item) {
    item._id = new Date().toISOString()
    const doc = clone(this.state.doc)
    doc.items = [...doc.items, item]
    this.setState({ doc })
  },
  removeItem (id) {
    return e => {
      const items = reject(propEq('_id', id), this.state.doc.items)
      this.setState(set(lensPath(['doc', 'items']), items, this.state))
    }
  },
  putDoc (e) {
    const doc = clone(this.state.doc)
    doc._id = !doc._id ? new Date().toISOString() : doc._id
    doc.type = 'content'
    this.props.route.put(doc)
      .then(res => {
        this.props.router.push('/')
      })
  },
  render () {
    return (
      <div className="pa4">
        <header>
          <h1>Content Management System</h1>
        </header>
        <main className="pa2 bg-near-white">
          <header><h3>New Document</h3></header>
          <article className="cf">
            <div className="fl w-25">
              <div className="mv2">
                <label className="db">Name</label>
                <input type="text" className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" onChange={this.handleChange('name')} value={pathOr('', ['state', 'doc', 'name'], this)} />
              </div>
              <div className="mv2">
                <label className="db">Description</label>
                <textarea type="text" className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white h5"
                  onChange={this.handleChange('description')}
                  value={pathOr('', ['state', 'doc', 'description'], this)}
                ></textarea>
              </div>
            </div>
            <div className="fl w-75">
              <div className="">
                <AddItem addNewItem={this.addNewItem} />
                <h3>Items</h3>
                <table className="collapse ba br2 b--black-10 pv2 ph3 w-100">
                  <tbody>
                    <tr className="striped--light-gray">
                      <th className="pv2 ph3 tl f6 fw6 ttu">Name</th>
                      <th className="tr f6 ttu fw6 pv2 ph3">Type</th>
                      <th className="tr f6 ttu fw6 pv2 ph3">
                        Actions
                      </th>
                    </tr>
                    {this.state.doc.items.map(item => {
                      return (
                        <tr key={item._id} className="mt4">
                          <td className="pv2 ph3 tl f6 fw6 ttu">{item.key}</td>
                          <td className="tr f6 ttu fw6 pv2 ph3">{item.type}</td>
                          <td className="tr f6 ttu fw6 pv2 ph3">
                            <button
                              className="mt2 f6 link dim br2 ba ph3 pv2 mb2 dib black bg-transparent"
                              onClick={this.removeItem(item._id)}>
                              remove
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </article>
          <div className="cf mt3">
            <div className="fr">
              <button
                className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue"
                onClick={this.putDoc}>
                Submit
              </button>
              <Link href="/" className="ml3 mt2 f6 link dim br2 ba ph3 pv2 mb2 dib black bg-transparent">Cancel</Link>
            </div>
          </div>

        </main>
      </div>
    )
  }
})

module.exports = Form
