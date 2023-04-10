import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    usernameValue: '',
    passwordValue: '',
    errorMsg: '',
    isLoginFailure: false,
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errMessage => {
    this.setState({errorMsg: errMessage, isLoginFailure: true})
  }

  usernameFunction = event => {
    this.setState({usernameValue: event.target.value})
  }

  passwordFunction = event => {
    this.setState({passwordValue: event.target.value})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {usernameValue, passwordValue} = this.state

    const userDetails = {username: usernameValue, password: passwordValue}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',

      body: JSON.stringify(userDetails),
    }
    console.log(options)
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()

    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {usernameValue, passwordValue, errorMsg, isLoginFailure} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.submitLoginForm}>
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={usernameValue}
              onChange={this.usernameFunction}
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={passwordValue}
              onChange={this.passwordFunction}
            />

            <button type="submit">Login</button>
          </form>
          {isLoginFailure && <p>{errorMsg}</p>}
        </div>
      </>
    )
  }
}

export default Login
