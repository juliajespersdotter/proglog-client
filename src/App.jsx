import { Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import NotFound from './components/NotFound'
import Navigation from './components/Navigation'
import './assets/styles/globals.scss'
import LandingPage from './pages/LandingPage'
import LoginSuccess from './pages/LoginSuccess'
import PrivateRoute from './components/PrivateRoute/privateRoute'
import LibraryPage from './pages/LibraryPage'
import ProfilePage from './pages/ProfilePage'
import SideBar from './components/SideBar'

function App() {
	return (
		<div id='App'>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								{/* <SideBar /> */}
								<FeedPage />
							</PrivateRoute>
						</>
					}
				/>
				<Route path='/login' element={<LandingPage />} />
				<Route
					path='/profile'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								<ProfilePage />
							</PrivateRoute>
						</>
					}
				/>
				<Route
					path='/library'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								<LibraryPage />
							</PrivateRoute>
						</>
					}
				/>
				<Route path='/login/success' element={<LoginSuccess />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
