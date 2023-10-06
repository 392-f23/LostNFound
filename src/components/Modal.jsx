import { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ post, onClose }) => {
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <div className="modal-hdr">
                    Post Information
                </div>
                <div className="description">
                    {post.description}
                    Found at {post.location}
                </div>
                <div className="contact-info">
                    Please contact {post.name} at {post.contactInfo}
                </div>
                <button className="modal-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;