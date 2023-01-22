import React from 'react'
import StickyBox from 'react-sticky-box'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import PLDB_API from '../../services/PLDB_API'

const SideProfileBar = () => {
	const { currentUser, loading } = useAuthContext()
	const navigate = useNavigate()

	const logoutUser = async () => {
		const res = await PLDB_API.logoutUser()

		if (res.status === 'success') {
			navigate('/login')
		}
	}

	return (
		<StickyBox offsetTop={20} offsetBottom={20}>
			<div className='sidebar-desktop sidebar-profile'>
				<div className='avatar'>
					{currentUser.avatar ? (
						<img
							className='img--avatar'
							onError={e =>
								(e.target.onerror = null)(
									(e.target.src =
										'./images/default--avatar.png')
								)
							}
							src={currentUser.avatar}
						/>
					) : (
						<img
							className='img--avatar'
							src='./images/default--avatar.png'
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
					<a
						className='button button--plus'
						onClick={() => logoutUser()}
					>
						Logout
					</a>
				</div>
			</div>
		</StickyBox>
	)
}

export default SideProfileBar
