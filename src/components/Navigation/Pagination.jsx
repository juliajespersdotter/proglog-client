const Pagination = ({
	page,
	numPages,
	hasPreviousPage,
	onPreviousPage,
	hasNextPage,
	onNextPage,
}) => {
	return (
		<div className='pagination d-flex justify-content-between align-items-center mt-3'>
			<div className='previous-page'>
				<button disabled={!hasPreviousPage} onClick={onPreviousPage}>
					Previous Page
				</button>
			</div>

			<div className='current-page'>
				{page}/{numPages}
			</div>

			<div className='next-page'>
				<button disabled={!hasNextPage} onClick={onNextPage}>
					Next Page
				</button>
			</div>
		</div>
	)
}

export default Pagination
