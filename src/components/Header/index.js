import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const backToLogin = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav>
        <ul>
          <Link to="/">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </li>
          </Link>
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/jobs">
            <li>Jobs</li>
          </Link>
        </ul>
        <button type="button" onClick={backToLogin}>
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
