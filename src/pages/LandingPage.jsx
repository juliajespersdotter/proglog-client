import React from 'react'

const LandingPage = () => {
	return (
		<div id='container'>
			<div className='landing-image'>
				<img src='' alt='' />
			</div>
			<div className='login'>
				<h3>LOGIN</h3>
				<form id='login-form' action='submit'>
					<input
						className='inputbox input--small'
						type='text'
						placeholder='USERNAME_'
					/>
					<input
						className='inputbox input--small'
						type='text'
						placeholder='PASSWORD_'
					/>
					<button className='button button--secondary'>SUBMIT</button>
				</form>
			</div>
		</div>
	)
}

export default LandingPage
