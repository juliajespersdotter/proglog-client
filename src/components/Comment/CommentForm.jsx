import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PLDB_API from '../../services/PLDB_API'
import { useQueryClient } from 'react-query'
import SmallLoadingSpinner from '../Loading/SmallLoadingSpinner'

const CommentForm = ({ review, user }) => {
	const queryClient = useQueryClient()
	const [toggle, setToggle] = useState()
	const [loading, setLoading] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	const postComment = async formData => {
		if (formData) {
			setLoading(true)
			const authorId = review.user_id
			const creatorId = user.userId
			const comment = { ...formData, authorId, creatorId }
			const res = await PLDB_API.postComment(review.id, comment)
			reset()
			if ((res.status = 'success')) {
				queryClient.invalidateQueries('comments')
				setLoading(false)
			}
		}
	}

	return (
		<form
			onSubmit={handleSubmit(postComment)}
			id='add-comment-form'
			className='form--post comment--form'
			action='submit'
		>
			<input
				required
				{...register('content')}
				onClick={() => setToggle(!toggle)}
				className='inputbox input--large'
				placeholder='WRITE A COMMENT_'
				type='text'
				maxLength={255}
			/>
			{loading && <SmallLoadingSpinner />}
		</form>
	)
}

export default CommentForm
