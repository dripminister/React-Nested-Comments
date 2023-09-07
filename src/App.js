import { useState } from "react"

const dummyComments = [
	{
		body: "Comment 1",
		comments: [],
	},
	{
		body: "Comment 2",
		comments: [],
	},
	{
		body: "Comment 3",
		comments: [],
	},
]

function App() {
	const [comments, setComments] = useState(dummyComments)

	const onComment = (newComment) => {
		setComments((prev) => [newComment, ...prev])
	}

	return (
		<div className="flex flex-col gap-3 h-screen w-[100%] p-6">
			<span className="text-3xl">Comments</span>
			<CommentInput onComment={onComment} />
			<div className="flex flex-col gap-4 mt-10">
				{comments.map((comment) => (
					<CommentItem comment={comment} />
				))}
			</div>
		</div>
	)
}

function CommentInput({ onComment }) {
	const [commentBody, setCommentBody] = useState("")

	return (
		<div className="flex flex-col mt-4">
			<input
				value={commentBody}
				onChange={(e) => setCommentBody(e.target.value)}
				placeholder="What are your thoughts?"
				className="border-[1px] border-zinc-400 p-4 w-3/4"
			/>
			<button
				className="border-[1px] rounded-full border-zinc-400 w-20"
				onClick={() => {
					onComment({ body: commentBody, comments: [] })
					setCommentBody("")
				}}
			>
				Comment
			</button>
		</div>
	)
}

function CommentItem({ comment }) {
	const [isReplying, setIsReplying] = useState(false)
	const [comments, setComments] = useState(comment.comments)

	const onComment = (newComment) => {
		setComments((prev) => [newComment, ...prev])
	}

	return (
		<div className="flex flex-col border-[1px] border-zinc-500 rounded-md p-3 my-3">
			<span>{comment.body}</span>
				{isReplying ? (
					<button
						className="border-[1px] rounded-full border-zinc-400 w-20"
						onClick={() => setIsReplying(false)}
					>
						Cancel
					</button>
				) : (
					<button
						className="border-[1px] rounded-full border-zinc-400 w-20"
						onClick={() => setIsReplying(true)}
					>
						Reply
					</button>
				)}
			{isReplying && <CommentInput onComment={onComment} />}
			<div className="flex flex-col gap-3">
				{comments &&
					comments.map((comment) => <CommentItem comment={comment} />)}
			</div>
		</div>
	)
}

export default App
