import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobItem from '../JobItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsList extends Component {
  state = {
    isLoading: true,
    employmentType: [],
    minimumPackage: '',
    search: '',
    list: [],
    failure: true,
  }

  componentDidMount() {
    this.getJobs()
  }

  listOfJobsDisplay = dataJobs => {
    const updatedList = dataJobs.map(item => ({
      companyLogoUrl: item.company_logo_url,
      employmentType: item.employment_type,
      id: item.id,
      jobDescription: item.job_description,
      location: item.location,
      packagePerAnnum: item.package_per_annum,
      rating: item.rating,
      title: item.title,
    }))

    this.setState({list: updatedList, isLoading: false, failure: false})
  }

  failureViewOfJobsList = () => {
    this.setState({failure: true, isLoading: false})
  }

  checkboxFunction = event => {
    console.log('hi')
    const {employmentType} = this.state
    this.setState({
      employmentType: employmentType.push(event.target.value),
    })
  }

  salaryFunction = event => {
    this.setState({minimumPackage: event.target.value})
  }

  filterJobsList = () => {
    const {employmentType, minimumPackage, search} = this.state
    this.setState({employmentType, minimumPackage, search}, this.getJobs)
  }

  searchFunction = event => {
    this.setState({search: event.target.value})
  }

  retryJobs = () => {
    this.getJobs()
    this.setState({isLoading: true})
  }

  getJobs = async () => {
    const {employmentType, minimumPackage, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.listOfJobsDisplay(data.jobs)
    } else {
      this.failureViewOfJobsList()
    }
  }

  render() {
    const {isLoading, list, failure, search} = this.state

    return (
      <>
        <input
          type="search"
          placeholder="Search"
          onChange={this.searchFunction}
          value={search}
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={this.filterJobsList}
        >
          <BsSearch className="search-icon" />
        </button>
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map(employee => (
            <li key={employee.employmentTypeId}>
              <input
                type="checkbox"
                id={employee.employmentTypeId}
                onChange={this.checkboxFunction}
                value={employee.employmentTypeId}
              />
              <label htmlFor={employee.employmentTypeId}>
                {employee.label}
              </label>
            </li>
          ))}
        </ul>
        <hr />
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(salary => (
            <li key={salary.salaryRangeId}>
              <input
                type="radio"
                id={salary.salaryRangeId}
                onChange={this.salaryFunction}
                name="salary"
                value={salary.salaryRangeId}
              />
              <label htmlFor={salary.salaryRangeId}>{salary.label}</label>
            </li>
          ))}
        </ul>
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <>
            {failure ? (
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
                {list.length >= 1 ? (
                  <ul>
                    {list.map(jobItem => (
                      <JobItem jobItem={jobItem} key={jobItem.id} />
                    ))}
                  </ul>
                ) : (
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                      alt="no jobs"
                    />
                    <h1>No Jobs Found</h1>
                    <p>We could not find any jobs. Try other filters</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </>
    )
  }
}
export default JobsList
