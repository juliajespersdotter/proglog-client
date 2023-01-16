import { useEffect, useState } from 'react'
import Profile from '../components/User/Profile'
import SideBar from '../components/Navigation/SideBar'
import { useAuthContext } from '../contexts/AuthContext'
import { useParams } from 'react-router'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import useProfile from '../hooks/useProfile'

const ProfilePage = () => {
	const { id } = useParams()
	const { data: profile, isLoading } = useProfile(id)
	const { currentUser } = useAuthContext()

	// console.log(id)
	// console.log(profile)
	// const { data: reviews, isLoading } = useReviews(currentUser.userId)
	// const { data: lists } = useUserLists(currentUser.userId)
	// console.log(currentUser)
	// const { data: steamData, isLoading } = useSteamData()

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{isLoading && <LoadingSpinner />}
				{profile && (
					<Profile
						user={profile.user}
						// steamUser={steamData}
						profile={profile}
					/>
				)}
			</div>
			{/* <SideProfileBar /> */}
		</div>
	)
}

export default ProfilePage
