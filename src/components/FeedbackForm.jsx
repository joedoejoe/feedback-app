import { useState, useContext } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm({ handleAdd }) {
	const [text, setText] = useState('')
	const [rating, setRating] = useState(10)
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [message, setMessage] = useState('')
	const { addFeedback } = useContext(FeedbackContext)

	const handleTextChange = (e) => {
		const text = e.target.value
		setText(text)
		if (text === '') {
			setMessage('')
			setBtnDisabled(true)
		}
		if (text !== '' && text.trim().length >= 3) {
			setMessage('')
			setBtnDisabled(false)
			setText(text)
		} else {
			setMessage('Please write at least 3 characters')
			setBtnDisabled(true)
		}
		// console.log('Count: ', text)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (text.trim().length >= 3) {
			const newFeedback = {
				text,
				rating,
			}
			addFeedback(newFeedback)
			setText('')
			setBtnDisabled(true)
		}
	}

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your experience with us?</h2>
				<RatingSelect select={(rating) => setRating(rating)} />
				<div className="input-group">
					<input
						value={text}
						onChange={handleTextChange}
						type="text"
						placeholder="Write a review"
					/>
					<Button type="submit" isDisabled={btnDisabled}>
						Send
					</Button>
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	)
}
export default FeedbackForm
