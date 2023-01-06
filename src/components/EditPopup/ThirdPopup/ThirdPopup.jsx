import React, { useRef, useState, useCallback } from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import GoBackLogo from "../../Images/GoBackLogo.svg";
import cls from "../ThirdPopup/ThirdPopup.module.css";
import { Formik, Form } from "formik";
import Webcam from "react-webcam";

const ThirdPopup = ({ updatePage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 120,
    height: 120,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  //on cancel of x it will redirect to zero/starting page
  const cancelHandler = () => {
    updatePage(0);
  };
  
  //to move next page/popup
  const handleClick = () => {
    updatePage(4);
  };

  //to go back or jump into previous page
  const goBackHandler = () => {
    updatePage(2);
  };

  return (
    <Formik>
      <div className={cls.popupBackground}>
        <div className={cls.popupContainer}>
          <button className={cls.titleCloseBtn} onClick={cancelHandler}>
            x
          </button>
          
          {/* Using the ProgressBar component to update progress of each popup */}
          <ProgressBar bgcolor={"#6257E4"} progress="22"/>

          <div className={cls.progressText}>
            <span className={cls.basic}>Basic Information</span>
            <span>Education</span>
            <span>Experience</span>
            <span>Skills</span>
            <span>Certifications</span>
          </div>

          <Form>
            <div className={cls.titleContainer}>
              <div className={cls.uploadPhoto}>Upload Photo</div>
              <div className={cls.uploadPhotoAdd}>
                Add a profesional photo with clean background.
              </div>
            </div>

            {/* The below code is for, on the camera and capture photo from user */}
            {/* The camera captured photo will be appear thrice according to design */}
            
            <div className={cls.body}>
              <div>
                {img === null ? (
                  <>
                    <Webcam
                      audio={false}
                      mirrored={true}
                      className={cls.oneImg}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                    <Webcam
                      audio={false}
                      mirrored={true}
                      className={cls.twoImg}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                    <Webcam
                      audio={false}
                      mirrored={true}
                      className={cls.threeImg}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                    <div>
                      <button
                        onClick={capture}
                        className={cls.captureBtn}
                        type="button"
                      >
                        Use Camera
                      </button>
                    </div>
                  </>
                ) : (
                  //Here is the condition that, if we are using camera we can't use retake button
                  //Once photo is captured we can see the retake button option
                  //Retake photo button to re-capture the camera photo again 
                  <>
                    <img src={img} alt="screenshot" className={cls.firstImg} />
                    <img src={img} alt="screenshot" className={cls.secondImg} />
                    <img src={img} alt="screenshot" className={cls.thirdImg} />
                    <div>
                      <button
                        onClick={() => setImg(null)}
                        className={cls.retakeText}
                        type="button"
                      >
                        Retake Photo
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* The below code to choose photo from device & upload the photo */}
            {selectedImage && (
              <div>
                <img
                  alt="not fount"
                  src={URL.createObjectURL(selectedImage)}
                  className={cls.oneImgSelect}
                />
                <img
                  alt="not fount"
                  src={URL.createObjectURL(selectedImage)}
                  className={cls.twoImgSelect}
                />
                <img
                  alt="not fount"
                  src={URL.createObjectURL(selectedImage)}
                  className={cls.threeImgSelect}
                />
              </div>
            )}

              {/* Here is the upload photo condition, if upload photo is done we can see that photo thrice as per design  
              - the user can remove the uploaded photo and can upload again, by clicking on remove button 
              - the condition is :
              - if user can see upload button then they can't see remove button
              - if user can see remove button then they can't see upload button */}

            {selectedImage === null ? (
              <>
                <label htmlFor="upload-photo" className={cls.uploadBtn}>
                  Upload Photo
                </label>
                <input
                  id="upload-photo"
                  type="file"
                  name="myImage"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedImage(null)}
                  className={cls.removeBtn}>Remove
                </button>
              </>
            )}
            
            {/* The bottom design of popup */}
            <div className={cls.breakline}></div>
            <div className={cls.footer}>
              <button onClick={goBackHandler} className={cls.goBackBtn}>
                <img src={GoBackLogo} alt={"GoBackLogo"} /> Go Back
              </button>

              {/* button will be disable till it meet the requirement, upload photo or camera photo has some value */}

              <button
                className={cls.saveBtn}
                type="submit"
                onClick={handleClick}
                disabled={!selectedImage && !img}
              >
                Save & Next
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default ThirdPopup;
