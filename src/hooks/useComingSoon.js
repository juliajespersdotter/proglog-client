import { useQuery } from 'react-query'
import IGDB_API from '../services/IGDB_API'

const useComingSoon = () => {
	return useQuery(['coming-soon'], () => IGDB_API.getComingSoon())
}

export default useComingSoon
