import { useQuery } from 'react-query'
import IGDB_API from '../services/IGDB_API'

const useGenres = () => {
	return useQuery(['genres'], () => IGDB_API.getGenres())
}

export default useGenres
