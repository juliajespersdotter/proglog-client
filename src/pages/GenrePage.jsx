import React from 'react'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import { useParams } from 'react-router'

const GenrePage = ({ currentUser }) => {
	const { id } = useParams()
	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content genres'>
				<h2>{id}</h2>
			</div>
			<SideProfileBar currentUser={currentUser} />
		</div>
	)
}

export default GenrePage
