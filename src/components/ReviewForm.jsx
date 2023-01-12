import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import PLDB_API from '../services/PLDB_API'
import { queryClient } from '../main'

const ReviewForm = ({ user }) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm()

	const onSubmit = async data => {
		console.log(data)
		if (data) {
			const res = await PLDB_API.addReview(user.userId, data)
			reset()
			if ((res.status = 'success')) {
				queryClient.invalidateQueries('reviews')
			}
		}
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			id='add-review-form'
			className='form--post'
			action='submit'
		>
			<input
				required
				{...register('title')}
				className='inputbox input--large'
				placeholder='TITLE_'
				type='text'
				maxLength={45}
			/>
			<textarea
				required
				{...register('content')}
				maxLength={45}
				className='inputbox input--large'
				placeholder='WRITE YOUR REVIEW_'
				type='text'
			/>
			<div className='submit--container'>
				<div className='checkbox--container'>
					{' '}
					<input
						{...register('hide')}
						type='checkbox'
						className='checkbox-box'
					/>
					<label>Hide due to spoilers</label>
				</div>
				<button type='submit' className='button button--small'>
					Submit <BiPlus />
				</button>
			</div>
		</form>
	)
}

export default ReviewForm
