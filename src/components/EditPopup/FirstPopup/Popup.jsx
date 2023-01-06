import React, { useState } from "react";
import cls from "../FirstPopup/Popup.module.css";
import ProgressBar from "../../ProgressBar/ProgressBar";
import ResDownloadLogo from "../../Images/downloadResumeLogo.svg";
import GoBackLogo from "../../Images/GoBackLogo.svg";
import { Form, Formik, useField, Field } from "formik";
import * as Yup from "yup";

// custom formik input to get validate by yup validation error or touched inputs.
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={cls.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

const Popup = ({ updatePage }) => {

  const [file, setSelectedFile] = useState({
    file: undefined,
    previewURI: undefined,
  });

  //to move next page/popup
  const handleClick = () => {
    updatePage(2);
  };

 //on cancel of x it will redirect to zero/starting page
  const cancelHandler = () => {
    updatePage(0);
  };

  //to go back or jump into previous page
  const goBackHandler = () => {
    updatePage(0);
  };

  //mapping
  const page = [
    {
      name: "firstname",
      type: "text",
      placeholder: "First Name",
      className: cls.fisrtname,
    },

    {
      name: "lastname",
      type: "text",
      placeholder: "Last Name",
      className: cls.lastname,
    },

    {
      name: "contact",
      type: "number",
      placeholder: "Contact Number",
      className: cls.contactNumber,
    },
  ];

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        contact: "",
        myfile: "",
      }}

      //validations of all inputs 
      validationSchema={Yup.object({
        firstname: Yup.string()
          .min(3, "Too Short!")
          .max(50, "Too Long!")
          .required("*Firstname is required."),
        lastname: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long")
          .required("*Lastname can't be empty."),
        contact: Yup.string()
          .min(8, "Number is not correct!")
          .max(16, "It's not correct number!")
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Phone number is not valid"
          )
          .required("*Contact number is must."),
        myfile: Yup.mixed()
          .test("fileSize", "File size too large, max file is 3.2mb", (file) =>
            file ? file.size <= 3355433 : true
          )
          .test("fileType", "Incorrect file type", (file) =>
            file ? ["application/pdf"].includes(file.type) : true
          )
          .required("Please upload the resume"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          handleClick(); //after clearance of all errors form will get submit/next page...
        }, 400);
      }}
    >
      <div className={cls.popupBackground}>
        <div className={cls.popupContainer}>
          <button className={cls.titleCloseBtn} onClick={cancelHandler}>
            x
          </button>

          {/* Using the ProgressBar component to update progress of each popup */}
          <ProgressBar bgcolor={"#6257E4"} progress="10" />

          <div className={cls.progressText}>
            <span className={cls.basic}>Basic Information</span>
            <span>Education</span>
            <span>Experience</span>
            <span>Skills</span>
            <span>Certifications</span>
          </div>

          <Form>
            <div className={cls.titleContainer}>
              <div className={cls.tellUsText}>Tell us about yourself</div>
              <div className={cls.aboutYouText}>
                Tell us about what you do and we will create a stunning profile
                for you
              </div>
            </div>

            {/* mapping  */}
            <div className={cls.body}>
              {page.map((data) => (
                <div>
                  <MyTextInput
                    name={data.name}
                    type={data.type}
                    placeholder={data.placeholder}
                    className={data.className}
                  />
                </div>
              ))}
            </div>

            <div className={cls.upload}>
              <img
                src={ResDownloadLogo}
                alt={"ResDownloadLogo"}
                className={cls.downloadLogo}
              />
              <div className={cls.uploadResumeText}>Upload Resume</div>
              <div className={cls.pdfFileValue}>
                PDF, Max file size is 3.2 MB
              </div>

              {/* condition of resume pdf type */}
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
                        id="upload-resume"
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

            {/* The bottom design of popup */}
            <div className={cls.breakline}></div>
            <div className={cls.footer}>
              <button className={cls.goBackBtn} onClick={goBackHandler}>
                <img src={GoBackLogo} alt={"GoBackLogo"} /> Go Back
              </button>
              <button className={cls.showMoreBtn}>Show me jobs</button>
              <button className={cls.saveBtn} type="submit">
                Save & Next
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default Popup;
