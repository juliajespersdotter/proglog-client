import React from 'react'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import useGenres from '../hooks/useGenres'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import HamburgerMenu from '../components/Navigation/HamburgerMenu'

const BrowsePage = ({ currentUser }) => {
	const { data: genres, isLoading } = useGenres()
	console.log(genres)
	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<HamburgerMenu />
			<div className='main-content browse'>
				<h2>Browse Genres</h2>
				{isLoading && <LoadingSpinner />}
				{genres && genres.data && !isLoading && (
					<>
						<div className='genre-links'>
							{genres.data.map(genre => (
								<div key={genre.id} className='genre--link'>
									<Link
										className='button button--plus'
										to={`/genres/${genre.slug}/${genre.id}`}
									>
										{genre.name}
									</Link>
								</div>
							))}
						</div>
					</>
				)}
			</div>
			<SideProfileBar currentUser={currentUser} />
		</div>
	)
}

export default BrowsePage
