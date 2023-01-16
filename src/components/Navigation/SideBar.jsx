import React from 'react'
import StickyBox from 'react-sticky-box'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
useAuthContext

const SideBar = () => {
	const { currentUser } = useAuthContext()

	return (
		<StickyBox offsetTop={10} offsetBottom={20}>
			<div className='sidebar'>
				<Link to='/browse'>
					<button className='button button--primary'>BROWSE</button>
				</Link>
				<Link to='/'>
					<button className='button button--primary'>UPCOMING</button>
				</Link>
				<Link to={`/profile/${currentUser.userId}`}>
					<button className='button button--primary'>PROFILE</button>
				</Link>
				<Link to={'/library'}>
					<button className='button button--primary'>MY GAMES</button>
				</Link>
			</div>
		</StickyBox>
	)
}

export default SideBar
