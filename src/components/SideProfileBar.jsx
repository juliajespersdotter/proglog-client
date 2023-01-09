import React from 'react'
import StickyBox from 'react-sticky-box'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import User_API from '../services/User_API'
// import { Navigate } from 'react-router-dom'

const SideProfileBar = () => {
	const { currentUser, loading } = useAuthContext()
	const navigate = useNavigate()

	const logoutUser = async () => {
		const res = await User_API.logoutUser()

		if (res.status === 'success') {
			navigate('/login')
		}
	}

	return (
		<StickyBox offsetTop={20} offsetBottom={20}>
			<div className='sidebar sidebar--profile'>
				<div className='avatar'>
					<img className='img--avatar' src={currentUser.avatar} />
				</div>
				<h3>{currentUser.username}</h3>
				{/* <button className='button button--primary'>NEWS</button>
					<button className='button button--primary'>BROWSE</button> */}
				<a className='button--tertiery' onClick={() => logoutUser()}>
					Logout
				</a>
			</div>
		</StickyBox>
	)
}

export default SideProfileBar
