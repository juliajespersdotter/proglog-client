import React from 'react'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'

const GamePage = () => {
	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				<h3>Game</h3>
				<div>
					{/* {isLoading && <LoadingSpinner />}
					{lists &&
						lists.data.map(list => (
							<ListCard key={list.list_id} list={list} />
						))} */}
					Game Info
				</div>
			</div>
			<SideProfileBar />
		</div>
	)
}

export default GamePage
