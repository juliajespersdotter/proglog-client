import React from 'react'
import SquareLoader from 'react-spinners/SquareLoader'

const SmallLoadingSpinner = () => {
	return (
		<div className='loading-spinner'>
			<SquareLoader size={15} color='#ff003c' />
		</div>
	)
}

export default SmallLoadingSpinner
