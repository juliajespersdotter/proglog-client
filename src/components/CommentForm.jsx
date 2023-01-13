import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import PLDB_API from '../services/PLDB_API'
import { queryClient } from '../main'

const CommentForm = ({ review, user }) => {
	const [toggle, setToggle] = useState()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	const onSubmit = async formData => {
		console.log(formData)
		if (formData) {
			const authorId = review.user_id
			const creatorId = user.userId
			const data = { ...formData, authorId, creatorId }
			const res = await PLDB_API.postComment(review.id, data)
			reset()
			if ((res.status = 'success')) {
				queryClient.invalidateQueries('comments')
			}
		}
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			id='add-comment-form'
			className='form--post'
			action='submit'
		>
			<input
				required
				{...register('content')}
				onClick={() => setToggle(!toggle)}
				className='inputbox input--large'
				placeholder='WRITE A COMMENT_'
				type='text'
				maxLength={45}
			/>
			{toggle && (
				<div className='submit--container'>
					<button type='submit' className='button button--small'>
						Comment <BiPlus />
					</button>
				</div>
			)}
		</form>
	)
}

export default CommentForm
