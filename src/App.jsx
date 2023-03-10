import { Routes, Route } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import NotFound from './components/NotFound'
import Navigation from './components/Navigation/Navigation'
import './assets/styles/globals.scss'
import LandingPage from './pages/LandingPage'
import LoginSuccess from './pages/LoginSuccess'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import LibraryPage from './pages/LibraryPage'
import ProfilePage from './pages/ProfilePage'
import ListPage from './pages/ListPage'
import GamePage from './pages/GamePage'
import SearchPage from './pages/SearchPage'
import BrowsePage from './pages/BrowsePage'
import { useAuthContext } from './contexts/AuthContext'
import GenrePage from './pages/GenrePage'

function App() {
	const { currentUser } = useAuthContext()

	return (
		<div id='App'>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								<FeedPage currentUser={currentUser} />
							</PrivateRoute>
						</>
					}
				/>
				<Route
					path='/list/:id'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								<ListPage currentUser={currentUser} />
							</PrivateRoute>
						</>
					}
				/>
				<Route path='/login' element={<LandingPage />} />
				<Route
					path='/profile/:id'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								<ProfilePage currentUser={currentUser} />
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
								<LibraryPage currentUser={currentUser} />
							</PrivateRoute>
						</>
					}
				/>
				<Route
					path='/game/:gameId'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								<GamePage currentUser={currentUser} />
							</PrivateRoute>
						</>
					}
				/>
				<Route
					path='/search/:query'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								<SearchPage currentUser={currentUser} />
							</PrivateRoute>
						</>
					}
				/>
				<Route
					path='/browse'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								<BrowsePage currentUser={currentUser} />
							</PrivateRoute>
						</>
					}
				/>
				<Route
					path='/genres/:genre/:id'
					element={
						<>
							<PrivateRoute>
								<Navigation />
								<GenrePage currentUser={currentUser} />
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
