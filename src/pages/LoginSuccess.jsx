import { useEffect } from 'react'

const LoginSuccess = () => {
	useEffect(() => {
		setTimeout(() => {
			window.close()
		}, 1000)
	}, [])

	return (
		<div className='container'>
			<h1>Thank you for logging in!</h1>
		</div>
	)
}

export default LoginSuccess
