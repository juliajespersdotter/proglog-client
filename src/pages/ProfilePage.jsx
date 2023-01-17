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

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{isLoading && <LoadingSpinner />}
				{profile && <Profile user={profile.user} profile={profile} />}
			</div>
		</div>
	)
}

export default ProfilePage
