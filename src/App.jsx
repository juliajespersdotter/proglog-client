import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import NotFound from './components/NotFound'
import Navigation from './components/Navigation'
import './assets/styles/globals.scss'
import LandingPage from './pages/LandingPage'
import LoginSuccess from './pages/LoginSuccess'

function App() {
	return (
		<div id='App'>
			{/**Navigation**/}
			{/* <Navigation /> */}
			{/**Routes**/}
			<Routes>
				<Route
					path='/'
					element={
						<>
							<Navigation />
							<FeedPage />
						</>
					}
				/>
				<Route path='/login' element={<LandingPage />} />
				<Route path='/login/success' element={<LoginSuccess />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
