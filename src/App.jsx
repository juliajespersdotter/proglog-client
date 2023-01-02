import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import NotFound from './components/NotFound'
import Navigation from './components/Navigation'
import './assets/styles/globals.scss'

function App() {
	return (
		<div id='App'>
			{/**Navigation**/}
			<Navigation />
			{/**Routes**/}
			<Routes>
				<Route path='/' element={<FeedPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
