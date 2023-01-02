import React from 'react'

const FeedPage = () => {
	return (
		<div id='container' className='feedpage'>
			<div className='sidebar'>
				<button className='button button--primary'>PROFILE</button>
				<button className='button button--primary'>LIBRARY</button>
				<button className='button button--primary'>NEWS</button>
				<button className='button button--primary'>BROWSE</button>
			</div>
			<div className='feed'>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Voluptates fugiat dolore numquam unde facere sunt eum
					nesciunt laborum? Corporis libero at earum nihil numquam
					illum alias dolorem suscipit officiis natus.
				</p>
			</div>
			<div className='sidebar'></div>
		</div>
	)
}

export default FeedPage
