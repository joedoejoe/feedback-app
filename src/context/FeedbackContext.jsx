import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [feedback, setFeedback] = useState([])

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	useEffect(() => {
		fetchFeedback()
	}, [])

	// function to add delay
	async function delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	// fetch feedback
	const fetchFeedback = async () => {
		await delay(1100)
		const response = await fetch('/feedback?_sort=id&_order=desc')
		const data = await response.json()

		setFeedback(data)
		setIsLoading(false)
	}

	// to add feedback
	const addFeedback = async (newFeedback) => {
		const response = await fetch('/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newFeedback),
		})

		const data = await response.json()
		setFeedback([data, ...feedback])
	}

	// to delete feedback
	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete this feedback?')) {
			setFeedback(feedback.filter((feedback) => feedback.id !== id))
		}
	}

	// set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({ item, edit: true })
	}

	// to update existing feedback
	const updateFeedback = (id, updItem) => {
		// console.log(id, updItem)
		setFeedback(
			feedback.map((item) =>
				item.id === id
					? {
							...item,
							...updItem,
					  }
					: item
			)
		)
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				deleteFeedback,
				addFeedback,
				editFeedback,
				feedbackEdit,
				updateFeedback,
				setIsLoading,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}

export default FeedbackContext
