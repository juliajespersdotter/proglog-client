import { useEffect, useState } from 'react'
import Profile from '../components/Profile'
import SideBar from '../components/SideBar'
import PLDB_API from '../services/PLDB_API'
import { useAuthContext } from '../contexts/AuthContext'
import useSteamData from '../hooks/useSteamData'
import LoadingSpinner from '../components/LoadingSpinner'

const ProfilePage = () => {
	const { currentUser } = useAuthContext()
	const [loading, setLoading] = useState(false)
	const [steamData, setSteamData] = useState(null)
	// const { data: steamData, isLoading } = useSteamData()

	useEffect(() => {
		const getSteamData = async () => {
			setLoading(true)
			const res = await PLDB_API.getSteamUserData(currentUser.steamId)
			setLoading(false)
			setSteamData(res.data)
		}
		if (currentUser.steamId) {
			getSteamData()
		}
	}, [])

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{loading && <LoadingSpinner />}
				{!loading && (
					<Profile user={currentUser} steamUser={steamData} />
				)}
			</div>
			{/* <SideProfileBar /> */}
		</div>
	)
}

export default ProfilePage
