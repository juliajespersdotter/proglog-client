import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = () => {
	const fetchAuthUser = async () => {
		const response = await axios
			.get('http://localhost:3000/user/user', { withCredentials: true })
			.catch(err => {
				console.log('Not properly authenticated')
			})

		if (response && response.data) {
			console.log('User:', response.data)
		}
	}

	const redirectToGoogle = async () => {
		const googleLoginURL = 'http://localhost:3000/auth/google'
		const newWindow = window.open(
			googleLoginURL,
			'blank',
			'width=500, height=600'
		)

		if (newWindow) {
			const timer = setInterval(() => {
				if (newWindow.closed) {
					console.log('Yay we are authenticated!')
					fetchAuthUser()
					if (timer) clearInterval(timer)
				}
			}, 500)
		}
	}

	return (
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
			</form>
			<button
				onClick={redirectToGoogle}
				className='button button--secondary'
			>
				Login with Google
			</button>
		</div>
	)
}

export default LoginForm
