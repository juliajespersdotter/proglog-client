import React from 'react'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'

const LibraryPage = () => {
	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				<h3>My Games</h3>
			</div>
			<SideProfileBar />
		</div>
	)
}

export default LibraryPage
