import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => {
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <h1>Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs,salary information,company
        reviews. Find the job that fits your abilities and potential.{' '}
      </p>
      <img src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png" />
      <Link to="/jobs">
        <button type="button">Find Jobs</button>
      </Link>
    </>
  )
}

export default Home
