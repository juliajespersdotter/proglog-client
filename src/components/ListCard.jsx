import React from 'react'
import { Link } from 'react-router-dom'

const ListCard = ({ list }) => {
	return (
		<div className='list-card'>
			<h4>
				<Link to={`/list/${list.id}`} className='button--tertiery'>
					{list.list_name}
				</Link>
			</h4>
			<p>{list.description}</p>
		</div>
	)
}

export default ListCard
