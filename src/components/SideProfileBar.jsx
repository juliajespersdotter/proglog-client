import React from 'react'
import StickyBox from 'react-sticky-box'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const SideProfileBar = () => {
	const { currentUser, loading } = useAuthContext()

	return (
		<StickyBox offsetTop={20} offsetBottom={20}>
			<div className='sidebar sidebar--profile'>
				<div className='avatar'>
					<img className='img--avatar' src={currentUser.avatar} />
				</div>
				<p>{currentUser.username}</p>
				{/* <button className='button button--primary'>NEWS</button>
					<button className='button button--primary'>BROWSE</button> */}
			</div>
		</StickyBox>
	)
}

export default SideProfileBar
