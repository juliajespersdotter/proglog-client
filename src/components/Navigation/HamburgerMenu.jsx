import { useState } from 'react'
import StickyBox from 'react-sticky-box'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { slide as Menu } from 'react-burger-menu'
import PLDB_API from '../../services/PLDB_API'

const HamburgerMenu = () => {
	const { currentUser } = useAuthContext()

	const handleImageError = event => {
		event.target.src = './images/default--avatar.png'
	}

	const logoutUser = async () => {
		const res = await PLDB_API.logoutUser()

		if (res.status === 'success') {
			navigate('/login')
		}
	}

	return (
		<StickyBox offsetTop={10} offsetBottom={20}>
			<Menu itemListClassName={'sidebar-mobile'}>
				<div className='avatar'>
					{currentUser.avatar && (
						<img
							className='img--avatar'
							src={currentUser.avatar}
							onError={handleImageError}
						/>
					)}
				</div>
				<div className='space-between'>
					<h3>{currentUser.username}</h3>
					<Link to={`/profile/${currentUser.userId}`}>
						<button className='button button--primary'>
							PROFILE
						</button>
					</Link>
					<Link to={'/library'}>
						<button className='button button--primary'>
							MY GAMES
						</button>
					</Link>
					<Link to='/browse'>
						<button className='button button--primary'>
							BROWSE
						</button>
					</Link>
					<Link to='/'>
						<button className='button button--primary'>
							UPCOMING
						</button>
					</Link>
					<Link to='/activity'>
						<button className='button button--primary'>
							ACTIVITY
						</button>
					</Link>
					<a
						className='button button--plus'
						onClick={() => logoutUser()}
					>
						Logout
					</a>
					{/* <button className='button button--primary'>NEWS</button>
					<button className='button button--primary'>BROWSE</button> */}
				</div>
			</Menu>
		</StickyBox>
	)
}

export default HamburgerMenu
