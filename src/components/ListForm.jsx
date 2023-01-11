import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import User_API from '../services/User_API'
import { queryClient } from '../main'

const ListForm = ({ user }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = async data => {
		console.log(data)
		const res = await User_API.addList(user.userId, data)

		if ((res.status = 'success')) {
			queryClient.invalidateQueries('userlists')
		}
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			id='add-list-form'
			className='form--post'
			action='submit'
		>
			<input
				{...register('name')}
				className='inputbox input--small'
				placeholder='NAME_'
				type='text'
				maxLength={30}
			/>
			<textarea
				{...register('description')}
				maxLength={45}
				className='inputbox input--small'
				placeholder='DESCRIPTION_'
				type='text'
			/>
			<div className='submit--container'>
				<div className='checkbox--container'>
					{' '}
					<input
						{...register('private')}
						type='checkbox'
						className='checkbox-box'
					/>
					<label>Private</label>
				</div>
				<button type='submit' className='button button--small'>
					Add <BiPlus />
				</button>
			</div>
		</form>
	)
}

export default ListForm
