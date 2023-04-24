import React from "react";

function Post() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    // Get form data
    const formData = new FormData(event.target);

    try {
      // Send POST request to Rails backend with access token in headers
      const response = await fetch("http://127.0.0.1:3000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include access token in headers
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful post creation
        console.log("Post created successfully:", data);
        // You can redirect or update UI as needed
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      // Handle error
      console.error(error);
      // You can show error message or take appropriate action
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data" // Set enctype to indicate form data includes files
        className="p-4 rounded shadow"
        style={{ maxWidth: "400px", backgroundColor: "#f8f9fa" }}
      >
        <h1 className="text-center mb-4">Create Post</h1>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" id="title" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="likes">Likes:</label>
          <input
            type="number"
            name="likes"
            id="likes"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            name="image" // Update name attribute for images
            id="images"
            className="form-control-file"
          />
        </div>
        <div className="form-group">
          <label htmlFor="videos">Videos:</label>
          <input
            type="file"
            name="video" // Update name attribute for videos
            id="videos"
            className="form-control-file"
          />
        </div>
        <div className="text-center">
          <input
            type="submit"
            value="Create Post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default Post;
