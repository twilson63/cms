const React = require('react')
const AuthService = require('../utils/AuthService').default
const { PropTypes } = React

const Login = React.createClass({
  render() {
    const { auth } = this.props.route
    return (
      <div>
        <button onClick={auth.login}>Login</button>
      </div>
    )
  },
  propTypes: {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }
})


module.exports = Login
