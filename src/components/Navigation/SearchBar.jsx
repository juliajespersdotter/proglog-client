import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
	const navigate = useNavigate()

	const { register, handleSubmit, reset } = useForm()

	const onSubmit = async formData => {
		const query = formData.query
		if (query) {
			navigate({
				pathname: `/search/${query}`,
			})
			reset()
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			action='submit'
			id='search-form'
		>
			<input
				{...register('query')}
				required
				maxLength={45}
				type='text'
				className='inputbox input--large'
				placeholder='SEARCH_'
			/>
		</form>
	)
}

export default SearchBar
