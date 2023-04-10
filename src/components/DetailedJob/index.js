import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {RiSuitcaseLine} from 'react-icons/ri'
import {Link, Redirect} from 'react-router-dom'

import Header from '../Header'

class DetailedJob extends Component {
  state = {
    detailedJobObject: {},
    similarList: [],
    isLoading: true,
    isFailure: true,
  }

  componentDidMount() {
    this.getDetailJob()
  }

  successItem = data => {
    const updatedJobDetails = {
      title: data.job_details.title,
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      jobDescription: data.job_details.job_description,
      id: data.job_details.id,
      skills: data.job_details.skills.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      })),
      lifeAtCompany: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
      packagePerAnnum: data.job_details.package_per_annum,
      location: data.job_details.location,
      rating: data.job_details.rating,
    }
    const similarJobs = data.similar_jobs.map(similarItem => ({
      companyLogoUrl: similarItem.company_logo_url,
      employmentType: similarItem.employment_type,
      id: similarItem.id,
      jobDescription: similarItem.job_description,
      location: similarItem.location,
      rating: similarItem.rating,
      title: similarItem.title,
    }))

    this.setState({
      detailedJobObject: updatedJobDetails,
      similarList: similarJobs,
      isLoading: false,
      isFailure: false,
    })
  }

  failureItem = () => {
    this.setState({isLoading: false, isFailure: true})
  }

  retryJobs = () => {
    this.setState({isLoading: true})
    this.getDetailJob()
  }

  getDetailJob = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.successItem(data)
    } else {
      this.failureItem()
    }
  }

  render() {
    const {similarList, detailedJobObject, isLoading, isFailure} = this.state
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <>
            {isFailure ? (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                  alt=" failure view"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>We cannot seem to find the page you are looking for.</p>
                <button type="button" onClick={this.retryJobs}>
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div>
                  <img
                    src={detailedJobObject.companyLogoUrl}
                    alt=" job details company logo"
                  />
                  <p>{detailedJobObject.employmentType}</p>
                  <BsStarFill />
                  <p>{detailedJobObject.rating}</p>
                  <MdLocationOn />
                  <p>{detailedJobObject.location}</p>
                  <RiSuitcaseLine />
                  <p>{detailedJobObject.packagePerAnnum}</p>
                  <p>{detailedJobObject.title}</p>
                </div>
                <hr />

                <div>
                  <h1>Description</h1>
                  <p>{detailedJobObject.jobDescription}</p>

                  <button type="button">
                    <a href={detailedJobObject.companyWebsiteUrl}>Visit</a>
                  </button>
                </div>

                <div>
                  <h1>Skills</h1>
                  <ul>
                    {detailedJobObject.skills.map(skillItem => (
                      <li key={skillItem.name}>
                        <img src={skillItem.imageUrl} alt={skillItem.name} />
                        <p>{skillItem.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h1>Life at Company</h1>
                  <p>{detailedJobObject.lifeAtCompany.description}</p>
                  <img
                    src={detailedJobObject.lifeAtCompany.imageUrl}
                    alt="life at company"
                  />
                </div>

                <div>
                  <h1>Similar Jobs</h1>
                  <ul>
                    {similarList.map(similarListItem => (
                      <li key={similarListItem.id}>
                        <img
                          src={similarListItem.companyLogoUrl}
                          alt="similar job company logo"
                        />

                        <h1>{similarListItem.title}</h1>
                        <BsStarFill />
                        <p>{similarListItem.rating}</p>
                        <h1>Description</h1>
                        <p>{similarListItem.jobDescription}</p>
                        <MdLocationOn />
                        <p>{similarListItem.location}</p>
                        <RiSuitcaseLine />
                        <p>{similarListItem.employmentType}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </>
    )
  }
}
export default DetailedJob
