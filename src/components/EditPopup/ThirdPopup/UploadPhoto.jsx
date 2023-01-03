import React, { useState } from "react";

const UploadPhoto = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>

      {selectedImage && (
        <div>
        <img alt="not fount" width={"110px"} height={"110px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
    

      <input
        type="file"
        name="myImage"
        accept="image/*"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />


    </div>
  );
};

export default UploadPhoto;