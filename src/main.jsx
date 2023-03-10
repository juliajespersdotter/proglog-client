import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthContextProvider from './contexts/AuthContext'
import App from './App'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 120000, // 2 minutes
			cacheTime: 1000 * 60 * 60 * 4, // 4 hours
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<App />
				</AuthContextProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
)
