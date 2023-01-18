import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import PLDB_API from '../../services/PLDB_API'
import { useQueryClient } from 'react-query'

const ListForm = ({ user }) => {
	const queryClient = useQueryClient()
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
			const res = await PLDB_API.addList(user.userId, data)
			reset()
			if (res.status === 'success') {
				queryClient.invalidateQueries('userlists')
			}
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
				required
				{...register('name')}
				className='inputbox input--small'
				placeholder='NAME_'
				type='text'
				maxLength={30}
			/>
			<textarea
				required
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
