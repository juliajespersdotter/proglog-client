import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			//server proxy
			'/api': import.meta.env.VITE_API_BASE_URL,
		},
	},
})
