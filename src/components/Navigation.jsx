import React from 'react'
import { BiMessageRounded, BiBell, BiCog } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import SearchBar from './SearchBar'

const Navigation = () => {
	return (
		<nav id='navigation'>
			<h4>
				Prog<span className='heading--yellow'>Log</span>
			</h4>
			<SearchBar />
			<ul id='nav-links'>
				<li>
					<FiUsers />
				</li>
				<li>
					<BiMessageRounded />
				</li>
				<li>
					<BiBell />
				</li>
				<li>
					<BiCog />
				</li>
			</ul>
		</nav>
	)
}

export default Navigation
