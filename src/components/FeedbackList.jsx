import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {
	const { feedback, isLoading } = useContext(FeedbackContext)
	// console.log(feedback)
	// const isLoading = false
	if (!isLoading && (!feedback || feedback.length === 0)) {
		return <p>No Feedback Yet</p>
	}
	/* return (
		<div className="feedback-list">
			{feedback.map((item) => (
				<FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
			))}
		</div>
	) */

	return isLoading ? (
		<h3>Loading...</h3>
	) : (
		// <Spinner />
		// <Spinner />

		<div className="feedback-list">
			<AnimatePresence>
				{feedback.map((item) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<FeedbackItem key={item.id} item={item} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	)
}

export default FeedbackList
