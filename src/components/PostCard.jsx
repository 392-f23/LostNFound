import "./PostCard.css";
import Modal from "./Modal";
import { useState } from "react";
import { useAuthState } from "../utilities/firebase";

const PostCard = ({ post }) => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const [user, isNorthwesternEmail] = useAuthState();

	return (
		<div className='post-card'>
			<div className='card-body'>
				{/* <div className="post-image">
                    <img src={post.image} alt={post.title} />
                </div> */}
				<div className='description'>{post.description}</div>
				{/* <div className="location">Location: {post.location}</div> */}
				<div className='name'>By: {post.name}</div>
			</div>

			{post.image != "" ? (
				<div className='post-image'>
					<img src={post.image} alt={post.description} />
				</div>
			) : null}

			<button
				disabled={!isNorthwesternEmail}
				className='button'
				onClick={toggleModal}>
				More Information
			</button>

			{showModal && <Modal post={post} onClose={toggleModal} />}
		</div>
	);
};

export default PostCard;
