import { useState } from 'react'
import ListGameCard from './ListGameCard'

const ListSorter = ({ list, data, user }) => {
	const [sortOption, setSortOption] = useState('name')
	const [sortDirection, setSortDirection] = useState('asc')

	const handleSortOptionChange = event => {
		setSortOption(event.target.value)
	}

	const handleSortDirectionChange = event => {
		setSortDirection(event.target.value)
	}

	const sortList = (list, sortOption, sortDirection) => {
		if (sortOption === 'name') {
			return sortDirection === 'asc'
				? list.sort((a, b) => a.name.localeCompare(b.name))
				: list.sort((a, b) => b.name.localeCompare(a.name))
		}
		if (sortOption === 'date-added') {
			return sortDirection === 'asc'
				? list.sort((a, b) => a.date_added - b.date_added)
				: list.sort((a, b) => b.date_added - a.date_added)
		}
		if (sortOption === 'release-date') {
			return sortDirection === 'asc'
				? list.sort(
						(a, b) => a.first_release_date - b.first_release_date
				  )
				: list.sort(
						(a, b) => b.first_release_date - a.first_release_date
				  )
		}
	}

	const sortedList = sortList(list, sortOption, sortDirection)

	return (
		<>
			<div className='sort--container'>
				<div className='sort'>
					<label className='heading--red'>Sort by:</label>
					<select
						className='sort-select'
						onChange={handleSortOptionChange}
					>
						<option value='name'>Sort by Name</option>
						<option value='date-added'>Sort by Date Added</option>
						<option value='release-date'>
							Sort by Release Date
						</option>
					</select>
				</div>
				<div className='sort'>
					<label className='heading--red'>Sort direction:</label>
					<select onChange={handleSortDirectionChange}>
						<option value='asc'>Ascending</option>
						<option value='desc'>Descending</option>
					</select>
				</div>
			</div>
			{sortedList &&
				sortedList.map(game => (
					<ListGameCard
						key={game.id}
						data={game}
						list={data.list}
						user={user}
					/>
				))}
		</>
	)
}

export default ListSorter
