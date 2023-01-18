import { useState } from 'react'
import { useForm } from 'react-hook-form'

const CommentForm = ({ onSubmit, review, user }) => {
	const [toggle, setToggle] = useState()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
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
		</form>
	)
}

export default CommentForm
