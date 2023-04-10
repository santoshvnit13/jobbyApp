import {Link} from 'react-router-dom'

import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {RiSuitcaseLine} from 'react-icons/ri'

const JobItem = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem
  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <img src={companyLogoUrl} alt="company logo" />
        <h1>{title}</h1>
        <p>{rating}</p>
        <BsStarFill />
        <MdLocationOn />
        <p>{location}</p>
        <RiSuitcaseLine />
        <p>{employmentType}</p>
        <p>{packagePerAnnum}</p>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
