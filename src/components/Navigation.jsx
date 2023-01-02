import React from 'react'
import { BiMessageRounded, BiBell, BiCog } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'

const Navigation = () => {
	return (
		<nav id='navigation'>
			<h4>WELCOME, PLAYER</h4>
			<form action='submit'>
				<input
					type='text'
					className='inputbox input--large'
					placeholder='SEARCH_'
				/>
			</form>
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
