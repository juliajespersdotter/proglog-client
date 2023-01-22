import { useState } from 'react'
import StickyBox from 'react-sticky-box'
import { Link } from 'react-router-dom'

const SideBar = () => {
	return (
		<StickyBox offsetTop={10} offsetBottom={20}>
			<div className='sidebar-desktop'>
				<div className='kirby'>
					<img src='/images/kirby.webp' alt='kirby' />
				</div>
				<Link to='/browse'>
					<button className='button button--primary'>BROWSE</button>
				</Link>

				<Link to='/'>
					<button className='button button--primary'>UPCOMING</button>
				</Link>
			</div>
		</StickyBox>
	)
}

export default SideBar
