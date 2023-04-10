import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

class Profile extends Component {
  state = {
    isLoading: true,
    profileObject: {},
    profileFail: false,
  }

  componentDidMount() {
    this.getProfile()
  }

  profileFunction = profileDetails => {
    const updatedData = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    this.setState({
      profileObject: updatedData,
      isLoading: false,
      profileFail: false,
    })
  }

  profileFailure = () => {
    this.setState({profileFail: true, isLoading: false})
  }

  retrying = () => {
    this.getProfile()
  }

  getProfile = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.profileFunction(data.profile_details)
    } else {
      this.profileFailure()
    }
  }

  render() {
    const {isLoading, profileObject, profileFail} = this.state
    return (
      <>
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <>
            {profileFail ? (
              <button type="button" onClick={this.retrying}>
                Retry
              </button>
            ) : (
              <>
                <div>
                  <img src={profileObject.profileImageUrl} alt="profile" />
                  <h1>{profileObject.name}</h1>
                  <p>{profileObject.shortBio}</p>
                </div>
              </>
            )}
          </>
        )}
        <hr />
      </>
    )
  }
}

export default Profile
