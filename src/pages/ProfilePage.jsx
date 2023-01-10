import { useEffect } from 'react'
import Profile from '../components/Profile'
import SideBar from '../components/SideBar'
import User_API from '../services/User_API'
import { useAuthContext } from '../contexts/AuthContext'
import useSteamData from '../hooks/useSteamData'
import LoadingSpinner from '../components/LoadingSpinner'

const ProfilePage = () => {
	const { currentUser } = useAuthContext()
	const { data: steamData, isLoading } = useSteamData(currentUser.steamId)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{isLoading && <LoadingSpinner />}
				{!isLoading && (
					<Profile user={currentUser} steamUser={steamData.data} />
				)}
			</div>
			{/* <SideProfileBar /> */}
		</div>
	)
}

export default ProfilePage
