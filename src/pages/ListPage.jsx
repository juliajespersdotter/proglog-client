import React from 'react'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'

const ListPage = () => {
	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				<h3>List Name</h3>
				<div>
					{/* {isLoading && <LoadingSpinner />}
					{lists &&
						lists.data.map(list => (
							<ListCard key={list.list_id} list={list} />
						))} */}
					Games
				</div>
			</div>
			<SideProfileBar />
		</div>
	)
}

export default ListPage
