import React from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'

const Navigation = () => {
	return (
		<nav id='navigation'>
			<h4>
				<Link to='/' className='button--tertiery'>
					Prog<span className='heading--red'>Log</span>
				</Link>
			</h4>
			<SearchBar />
		</nav>
	)
}

export default Navigation
