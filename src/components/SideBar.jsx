import React from 'react'
import StickyBox from 'react-sticky-box'
import { Link } from 'react-router-dom'

const SideBar = () => {
	return (
		<StickyBox offsetTop={10} offsetBottom={20}>
			<div className='sidebar'>
				<Link to={'/profile'}>
					<button className='button button--primary'>PROFILE</button>
				</Link>
				<Link to={'/library'}>
					<button className='button button--primary'>MY GAMES</button>
				</Link>
				<button className='button button--primary'>NEWS</button>
				<Link to='/browse'>
					<button className='button button--primary'>BROWSE</button>
				</Link>
			</div>
		</StickyBox>
	)
}

export default SideBar
