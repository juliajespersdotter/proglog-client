import React from 'react'
import LoginForm from '../components/User/LoginForm'

const LandingPage = () => {
	return (
		<div id='container'>
			<div className='landing-image'>
				<img src='' alt='' />
			</div>
			<div className='login--title'>
				<div className='login-title-image'>
					<img src='./images/login-hero.png' />
				</div>
				<div className='login-headings'>
					<div className='left-aligned'>
						<h1>
							<span className='heading--red'>PROG</span>LOG
						</h1>
						<h4>THE LOGGING TOOL FOR ORGANIZED GAMERS</h4>
					</div>
				</div>
			</div>
			<LoginForm />
		</div>
	)
}

export default LandingPage
