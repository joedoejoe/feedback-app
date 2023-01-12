import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

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

	// fetch feedback
	const fetchFeedback = async () => {
		const response = await fetch(
			'http://localhost:5000/feedback?_sort=id&_order=desc'
		)
		const data = await response.json()

		setFeedback(data)
		setIsLoading(false)
	}

	// to add feedback
	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4()
		console.log(newFeedback)
		setFeedback([newFeedback, ...feedback])
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
