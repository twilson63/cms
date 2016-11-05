const React = require('react')
const { compose, equals, path } = require('ramda')
const FileInput = require('./shared/FileInput')

const AddItem = React.createClass({
  getInitialState() {
    return {
      key: '',
      type: 'Text',
      data: ''
    }
  },
  handleTypeChange (e) {
    this.setState({ type: e.target.value })
  },
  handleKeyChange (e) {
    this.setState({ key: e.target.value })
  },
  handleValueChange (e) {
    this.setState({ data: e.target.value })
  },
  handleFileChange(e) {
    if (FileReader && e.target.files[0]) {
      var fr = new FileReader()
      fr.onload = _ => {
        this.setState({ data: fr.result })
      }
      fr.readAsDataURL(e.target.files[0])
    }
  },
  handleSubmit (e) {
    e.preventDefault()
    this.props.addNewItem(this.state)
    this.setState({
      key: '',
      type: 'Text',
      data: ''
    })
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mv2 dib mr2">
          <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white"
            placeholder="key"
            onChange={this.handleKeyChange}
            value={this.state.key} />
        </div>
        <div className="mv2 dib mr2">
          <select className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w4"
            onChange={this.handleTypeChange}
            value={this.state.type}>
            <option>Text</option>
            <option>File</option>
          </select>
        </div>
        {
          compose(
            equals('Text'),
            path(['state','type'])
          )(this) ? (
            <div className="mv2 dib mr2">
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w5"
                onChange={this.handleValueChange}
                value={this.state.data} />
            </div>
            ) : null

        }
        {
          compose(
            equals('File'),
            path(['state','type'])
          )(this) ? (
            <div className="mv2 dib mr2">
              <FileInput className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w5"
                onChange={this.handleFileChange}
                placeholder="click here to upload file"
              />
            </div>
          ) : null
        }
        <div className="mv2 dib">
          <button className="ml3 mt2 f6 link dim br2 ba ph3 pv2 mb2 dib black bg-transparent">Add Item</button>
        </div>
      </form>
    )
  }
})

module.exports = AddItem
