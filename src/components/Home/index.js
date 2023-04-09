import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../Header'

const Home = props => {
  const goToJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
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
      <button type="button" onClick={goToJobs}>
        Find Jobs
      </button>
    </>
  )
}

export default Home
