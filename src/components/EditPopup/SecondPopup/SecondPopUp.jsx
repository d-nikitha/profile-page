import React from "react";
import cls from "../SecondPopup/SecondPopUp.module.css";
import GoBackLogo from "../../Images/GoBackLogo.svg";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";

// custom formik input to get validate by yup validation error or touched inputs.
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

// custom formik textarea to get validate by yup validation error or touched inputs.
const MyTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={cls.errorText}>{meta.error}</div>
      ) : null}
    </>
  );
};

// custom formik select input to get validate by yup validation error or touched inputs.
const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className={cls.textInput} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={cls.errorText}>{meta.error}</div>
      ) : null}
    </>
  );
};

function SecondPopUp({ updatePage }) {

  //to move next page/popup
  const handleClick = () => {
    updatePage(3);
  };

 //on cancel of x it will redirect to zero/starting page
  const cancelHandler = () => {
    updatePage(0);
  };

  //to go back or jump into previous page
  const goBackHandler = () => {
    updatePage(1);
  };

  return (
    <Formik
      initialValues={{
        headline: "",
        location: "",
        experience: "",
        tellusabout: "",
      }}
      //validations of all inputs
      validationSchema={Yup.object({
        headline: Yup.string().required("*Headline can't be empty!"),
        location: Yup.string().required("*Provide location adddress!"),
        experience: Yup.string()
          .oneOf(
            ["0-1 Year", "1-2 Years", "2-3 Years", "3-5 Years"],
            "Invalid experience"
          )
          .required("*Select the experience!"),
        tellusabout: Yup.string().required("Let us know about yourself!"),
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

          <div className={cls.titleContainer}>
            <div className={cls.tellUsText}>Welcome Mike,</div>
            <div className={cls.aboutYouText}>
              Tell us about what you do and we will create a stunning profile
              for you
            </div>
          </div>

          <Form>
            <div className={cls.body}>
              <div>
                <MyTextInput
                  placeholder={"Headline"}
                  name="headline"
                  className={cls.headline}
                />
              </div>

              <div>
                <MyTextInput
                  placeholder={"Location"}
                  name="location"
                  className={cls.location}
                />
              </div>

              <div>
                <MySelect name="experience" className={cls.selectValue}>
                  <option value="" className={cls.optionValue}>
                    Experience
                  </option>
                  <option value="0-1 Year">0 to 1 Year</option>
                  <option value="1-2 Years">1 to 2 Years</option>
                  <option value="2-3 Years">2 to 3 Years</option>
                  <option value="3-5 Years">3 to 5 Years</option>
                </MySelect>
              </div>
            </div>

            <MyTextarea
              name="tellusabout"
              placeholder={"Tell us about yourself"}
              className={cls.tellUsAbout}
            />

            <div className={cls.breakline}></div>

            <div className={cls.footer}>
              <button onClick={goBackHandler} className={cls.goBackBtn}>
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
}

export default SecondPopUp;
