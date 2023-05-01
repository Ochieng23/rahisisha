import React, { useState } from "react";

function Comments({ postCode}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    post_code: postCode,
    user_code: null,
    content: "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const userCode = decodedToken.user_ref;

      const response = await fetch("http://127.0.0.1:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...updatedData, user_code: userCode }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    setUpdatedData({
      ...updatedData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      {isEditing ? (
        <>
          <textarea
            className="mt-1 rounded"
            placeholder="lets talk..."
            type="text"
            name="content"
            value={updatedData.content}
            onChange={handleInputChange}
            style={{ width: "200px", height: "30px", border:"2px solid black" }}
          />
          <button
            style={{ color: "black" }}
            className="mt-1"
            onClick={handleSaveClick}
          >
            post
          </button>
        </>
      ) : (
        <button
          style={{ width: "100px", height: "30px", padding: "2px", border:"2px solid black" }}
          className="btn btn-dark text-dark mt-2 mx-3"
          onClick={handleEditClick}
        >
          Connect
        </button>
      )}
    </div>
  );
}

export default Comments;
