import { useState, useRef, useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import SmallLoadingSpinner from './Loading/SmallLoadingSpinner'
import useUserLists from '../hooks/useUserLists'
import DropdownItem from './DropdownItem'

const DropdownMenu = ({ game, user }) => {
	const [isOpen, setIsOpen] = useState(false)
	const { data: lists, isLoading } = useUserLists(user.userId)
	const ref = useRef(null)

	const handleClickOutside = event => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	})

	return (
		<div ref={ref} className='dropdown'>
			<button
				className='button button--small'
				onClick={() => setIsOpen(!isOpen)}
			>
				Add <BiPlus />
			</button>
			{isOpen && (
				<div className='dropdown-content'>
					{isLoading && <SmallLoadingSpinner />}
					{lists &&
						!isLoading &&
						lists.data.map(list => (
							<DropdownItem
								key={list.id}
								list={list}
								game={game}
								user={user}
							/>
						))}
				</div>
			)}
		</div>
	)
}

export default DropdownMenu
