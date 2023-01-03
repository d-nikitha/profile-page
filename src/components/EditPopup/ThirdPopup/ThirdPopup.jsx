import React, { useRef, useState, useCallback } from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import GoBackLogo from "../../Images/GoBackLogo.svg";
import cls from "../ThirdPopup/ThirdPopup.module.css";
import { Formik, Form } from "formik";
import UploadPhoto from "./UploadPhoto";
import Webcam from "react-webcam";

const ThirdPopup = ({ updatePage }) => {
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

  const cancelHandler = () => {
    updatePage(0);
  };

  const handleClick = () => {
    updatePage(4);
  };

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

          <ProgressBar bgcolor={"#6257E4"} progress="22" />

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

            <div className={cls.body}>
              <UploadPhoto />
              <span>
                {img === null ? (
                  <>
                    <Webcam
                      audio={false}
                      mirrored={true}
                      height={120}
                      width={120}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                    />
                    <button onClick={capture} className={cls.captureBtn}>
                      Use Camera
                    </button>
                  </>
                ) : (
                  <>
                    <img src={img} alt="screenshot" />
                    <button
                      onClick={() => setImg(null)}
                      className={cls.retakeText}
                    >
                      Retake Photo
                    </button>
                  </>
                )}

              </span>
            </div>

            <div className={cls.breakline}></div>

            <div className={cls.footer}>
              <button onClick={goBackHandler} className={cls.goBackBtn}>
                <img src={GoBackLogo} alt={"GoBackLogo"} /> Go Back
              </button>

              <button
                className={cls.saveBtn}
                type="submit"
                onClick={handleClick}
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
