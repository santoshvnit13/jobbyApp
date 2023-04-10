import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import Profile from '../Profile'
import JobsList from '../JobsList'

class Jobs extends Component {
  state = {}

  render() {
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <Profile />
        <JobsList />
      </>
    )
  }
}
export default Jobs
