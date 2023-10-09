import React, { useState } from "react";
import { useDbUpdate } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "", // mandatory
    description: "", // mandatory
    contactInfo: "", // mandatory,
    location: "", // mandatory
    image: "", // optional
    lostOrFound: "lost",
  });
  const [selectedOption, setSelectedOption] = useState("lost");
  let post_id = Date.now();
  const [updateFoundPosts, resultFoundPosts] = useDbUpdate(
    `/foundPosts/${post_id}`
  );
  const [updateLostPosts, resultLostPosts] = useDbUpdate(
    `/lostPosts/${post_id}`
  );
  let navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    handleInputChange(e);
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];  // Get the first selected file
    if (file && file.type.match('image.*')) {  // Optional: check if the file is an image
      // Now you have a reference to the selected image file
      // You can pass it to `handleInputChange` or handle it directly within this function 
      // Or, if you want to pass the file to `handleInputChange`:
      // Create a new event object with the necessary information
      const newEvent = {
        target: {
          name: 'image',
          value: file
        }
      };
      handleInputChange(newEvent);
    } else {
      console.error('Please select an image file.');
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    if (formData.lostOrFound === "found") {
      updateFoundPosts({
        id: post_id,
        name: formData.name,
        description: formData.description,
        contactInfo: formData.contactInfo,
        location: formData.location,
        image: formData.image,
        lostOrFound: "found",
      });
      navigate("/");
    } else if (formData.lostOrFound === "lost") {
      updateLostPosts({
        id: post_id,
        name: formData.name,
        description: formData.description,
        contactInfo: formData.contactInfo,
        location: formData.location,
        image: formData.image,
        lostOrFound: "lost",
      });
      navigate("/lostpage");
    }
  };

  return (
    <div className="container">
      <h2>Post Lost or Found Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactInfo">Contact Info:</label>
          <input
            type="text"
            className="form-control"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location Found/Lost:</label>
          <textarea
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image (optional):</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <br></br>
          <div>
            <label className="radio-inline">
              <input
                type="radio"
                name="lostOrFound"
                value="lost"
                checked={selectedOption === "lost"}
                onChange={handleOptionChange}
                className= "mx-2"
              />
              Lost
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="lostOrFound"
                value="found"
                checked={selectedOption === "found"}
                onChange={handleOptionChange}
                className = "mx-2"  
              />
              Found
            </label>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostPage;
