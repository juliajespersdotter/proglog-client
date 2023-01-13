import React from 'react'
import SkewLoader from 'react-spinners/SkewLoader'

const LoadingSpinner = () => {
	return (
		<div className='loading-spinner'>
			<SkewLoader size={30} color='#ff003c' />
		</div>
	)
}

export default LoadingSpinner
