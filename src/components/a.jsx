import Card from './Shared/Card'
import { useState } from 'react'
import Button from './Shared/Button'

function FeedbackForm() {
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [message, setMessage] = useState('')

	const handleTextChange = (e) => {
		const text = e.target.value
		if (text === '') {
			setMessage(null)
			setBtnDisabled(true)
		}

		if (text !== '' && text.trim().length >= 3) {
			setMessage('')
			setBtnDisabled(false)
		} else {
			setMessage('Please write at least 3 characters')
			setBtnDisabled(true)
		}
	}

	return (
		<Card>
			<form>
				<h2>How would you rate your experience with us?</h2>
				{/* @todo - rating select component */}
				<div className="input-group">
					<input
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
export default a
