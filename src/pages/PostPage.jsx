import React, { useState } from "react";

const PostPage = () => {
  const [formData, setFormData] = useState({
    name: "", // mandatory
    description: "", // mandatory
    contactInfo: "", // mandatory,
    location: "", // mandatory
    image: "", // mandatory
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in formData and perform actions like sending it to a server or performing validation.
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="description"
            id="description"
            name="description"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="contact-info">Contact Info:</label>
          <input
            type="Contact Info"
            id="Contact Info"
            name="Contact Info"
            // value={formData.Phone Number}
            // onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location Found/Lost:</label>
          <textarea
            id="location"
            name="location"
            // value={formData.message}
            // onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="location">Image (optional)</label>
          <textarea
            id="image"
            name="image"
            // value={formData.message}
            // onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostPage;
