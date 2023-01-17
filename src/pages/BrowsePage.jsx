import React from 'react'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import useGenres from '../hooks/useGenres'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/Loading/LoadingSpinner'

const BrowsePage = ({ currentUser }) => {
	const { data: genres, isLoading } = useGenres()
	console.log(genres)
	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content browse'>
				{isLoading && <LoadingSpinner />}
				{genres && genres.data && !isLoading && (
					<>
						<h2>Browse Genres</h2>

						<div className='genre-links'>
							{genres.data.map(genre => (
								<div className='genre--link'>
									<a
										key={genre.id}
										className='button button--plus'
										href={`/genre/${genre.id}`}
									>
										{genre.name}
									</a>
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
