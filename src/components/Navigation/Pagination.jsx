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
				<button
					className='button button--plus'
					disabled={!hasPreviousPage}
					onClick={onPreviousPage}
				>
					Previous Page
				</button>
			</div>

			<div className='current-page'>
				<p>
					{page}/{numPages}
				</p>
			</div>

			<div className='next-page'>
				<button
					className='button button--plus'
					disabled={!hasNextPage}
					onClick={onNextPage}
				>
					Next Page
				</button>
			</div>
		</div>
	)
}

export default Pagination
