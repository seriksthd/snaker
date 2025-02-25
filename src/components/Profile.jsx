import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfileImage, uploadProfileImage } from "../store/snaker/snakerSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.snaker.profileImage);
  const [preview, setPreview] = useState(profileImage);
  
  useEffect(() => {
    setPreview(profileImage);
  }, [profileImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setPreview(imageData);
        dispatch(uploadProfileImage(imageData));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    dispatch(deleteProfileImage());
    setPreview(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Профиль сүрөтү</h2>
      <label style={{ cursor: "pointer", display: "block" }}>
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            width="150"
            height="150"
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <div
            style={{
              width: "150px",
              height: "150px",
              background: "#ddd",
              borderRadius: "50%",
              lineHeight: "150px",
              textAlign: "center",
            }}
          >
            📷 Тандоо
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>
      {preview && <button onClick={handleDelete}>Өчүрүү</button>}
    </div>
  );
}