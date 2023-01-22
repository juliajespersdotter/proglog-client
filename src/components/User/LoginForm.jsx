import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import PLDB_API from '../../services/PLDB_API'

const LoginForm = () => {
	const { setUser } = useAuthContext()
	const navigate = useNavigate()

	const fetchAuthUser = async () => {
		const res = await PLDB_API.authenticateUser()

		if (res.status === 'success') {
			navigate('/')
			await setUser(res)
		}
	}

	const redirectToGoogle = async () => {
		const googleLoginURL = `${
			import.meta.env.VITE_API_BASE_URL
		}/auth/google`
		const newWindow = window.open(
			googleLoginURL,
			'blank',
			'width=500, height=600'
		)

		if (newWindow) {
			const timer = setInterval(() => {
				if (newWindow.closed) {
					fetchAuthUser()
					if (timer) clearInterval(timer)
				}
			}, 500)
		}
	}

	const redirectToSteam = async () => {
		const steamLoginUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/steam`
		const newWindow = window.open(
			steamLoginUrl,
			'blank',
			'width=500, height=600'
		)

		if (newWindow) {
			const timer = setInterval(() => {
				if (newWindow.closed) {
					fetchAuthUser()
					if (timer) clearInterval(timer)
				}
			}, 500)
		}
	}

	return (
		<div className='login'>
			<div className='login-image'>
				<img src='./images/login.png' />
			</div>
			<button onClick={redirectToGoogle} className='button button--wide'>
				LOGIN WITH GOOGLE
			</button>
			<button onClick={redirectToSteam} className='button button--wide'>
				LOGIN WITH STEAM
			</button>
		</div>
	)
}

export default LoginForm
