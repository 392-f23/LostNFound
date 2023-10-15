import React, { useState } from "react";
import "./PostCard.css";

const ProfileCard = ({ post }) => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};
	return (
		<div className='post-card'>
			<div className='card-body'>
				<div className='description'>{post.description}</div>
				<div className='name'>By: {post.name}</div>
			</div>

			<div className='post-image'>
				<img src={post.image} alt={post.title} />
			</div>

			<button className='button' onClick={toggleModal}>
				More Information
			</button>
			{/* <div className='dropdown'>
				<button
					className='btn btn-secondary dropdown-toggle'
					type='button'
					id='dropdownMenuButton'
					data-toggle='dropdown'
					aria-haspopup='true'
					aria-expanded='false'>
					Dropdown button
				</button>
				<div
					className='dropdown-menu'
					aria-labelledby='dropdownMenuButton'>
					<a className='dropdown-item' href='#'>
						Action
					</a>
					<a className='dropdown-item' href='#'>
						Another action
					</a>
					<a className='dropdown-item' href='#'>
						Something else here
					</a>
				</div>
			</div> */}
			{/* <div className='dropdown ms-auto optionsButton'>
				<i
					className='bi bi-three-dots-vertical'
					data-bs-toggle='dropdown'
					aria-expanded='false'></i>
				<ul className='dropdown-menu'>
					<li>
						<span className='dropdown-item'></span>
					</li>
					<li>
						<span className='dropdown-item'>Delete</span>
					</li>
				</ul>
			</div> */}

			{showModal && <Modal post={post} onClose={toggleModal} />}
		</div>
	);
};

export default ProfileCard;
