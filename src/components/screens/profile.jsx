import React from 'react'
//import useFetchWithLoading from '../hooks/useFetchWithLoading'

const Profile = () => {
  //const { data, loading } = useFetchWithLoading(getTweetsAll)

  return (<div className="Profile">
  <p>PROFILE</p>
    {/* {loading ? 'Loading...' : data.map(tweet => (
      <div key={tweet.id}>{JSON.stringify(tweet)}</div>
    ))} */}
  </div>
  )
}

export default Profile