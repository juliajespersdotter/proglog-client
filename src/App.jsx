import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import NotFound from './components/NotFound'
import './assets/styles/globals.scss'

function App() {
	return (
		<div id='App'>
			{/**Navigation**/}
			{/**Routes**/}
			<Routes>
				<Route path='/' element={<FeedPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
