import React, { useState } from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import GoBackLogo from "../../Images/GoBackLogo.svg";
import { Formik, Form, useField, Field } from "formik";
import * as Yup from "yup";
import cls from "../SeventhPopup/SeventhPopup.module.css";
import ResDownloadLogo from '../../Images/downloadResumeLogo.svg';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={cls.errorText}>{meta.error}</div>
      ) : null}
    </>
  );
};

function SeventhPopup({ updatePage }) {

  const [file, setSelectedFile] = useState({
    file: undefined,
    previewURI: undefined,
  });

  const cancelHandler = () => {
    updatePage(0);
  };

  const handleClick = () => {
    updatePage(8);
  };

  const goBackHandler = () => {
    updatePage(6);
  };

  return (
    <Formik
      initialValues={{
        certificate: "",
        myfile: "",
      }}
      validationSchema={Yup.object({
        certificate: Yup.string().required("*Add your certificate!"),
        myfile: Yup.mixed()
        .test("fileSize", "File size too large, max file is 32mb", (file) =>
          file ? file.size <= 32000000 : true
        )
        .test("fileType", "Incorrect file type", (file) =>
          file ? ["application/pdf"].includes(file.type) : true
        )
        .required("Please upload the certificate"),
      })}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          handleClick();
        }, 400);
      }}
    >
      <div className={cls.popupBackground}>
        <div className={cls.popupContainer}>
          <button className={cls.titleCloseBtn} onClick={cancelHandler}>
            x
          </button>

          <ProgressBar bgcolor={"#6257E4"} progress="92" />

          <div className={cls.progressText}>
            <span className={cls.basic}>Basic Information</span>
            <span className={cls.basic}>Education</span>
            <span className={cls.basic}>Experience</span>
            <span className={cls.basic}>Skills</span>
            <span className={cls.basic}>Certifications</span>
          </div>

          <div className={cls.titleContainer}>
            <div className={cls.experienceText}>Flex your wins</div>
            <div className={cls.aboutYouText}>
              Add a profesional photo with clean background.
            </div>
          </div>

          <Form>
            <div className={cls.body}>
                <div>
                <MyTextInput 
                name="certificate"
                className={cls.certificateText}
                placeholder={"Certificate name"}
                />
                </div>
            </div>

            <div className={cls.upload}>
              <img
                src={ResDownloadLogo}
                alt={"ResDownloadLogo"}
                className={cls.downloadLogo}
              />
              <div className={cls.uploadResumeText}>Upload Certificate</div>
              <div className={cls.pdfFileValue}>
                PDF, Max file size is 32 MB
              </div>
              
              <Field name="myfile">
                {({ form, ...rest }) => {
                  return (
                    <>
                      <input
                        name="myfile"
                        onBlur={form.handleBlur}
                        onChange={({ currentTarget }) => {
                          const file = currentTarget.files[0];
                          const reader = new FileReader();

                          if (file) {
                            reader.onloadend = () => {
                              setSelectedFile({
                                file,
                                previewURI: reader.result,
                              });
                            };
                            reader.readAsDataURL(file);
                            form.setFieldValue("myfile", file);
                          }
                        }}
                        type="file"
                        accept="application/pdf, .pdf"
                        className={cls.chooseRes}
                      />
                      {form.errors.myfile && form.touched.myfile ? (
                        <div className={cls.errorText}>
                          {JSON.stringify(form.errors.myfile, file)} 
                        </div>
                      ) : null}
                    </>
                  );
                }}
              </Field>


            </div>

            <div className={cls.breakline}></div>

            <div className={cls.footer}>
              <button onClick={goBackHandler} className={cls.goBackBtn}>
                <img src={GoBackLogo} alt={"GoBackLogo"} /> Go Back
              </button>

              <button className={cls.saveBtn} type="submit">
                Save & Next
              </button>
            </div>

          </Form>
        </div>
      </div>
    </Formik>
  );
}

export default SeventhPopup;
