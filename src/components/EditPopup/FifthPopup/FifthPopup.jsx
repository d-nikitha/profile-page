import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "../../ProgressBar/ProgressBar";
import GoBackLogo from "../../Images/GoBackLogo.svg";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import SearchLogo from "../../Images/searchLogo.svg";
import cls from "../FifthPopup/FifthPopup.module.css";

// custom formik input to get validate by yup validation error or touched inputs.
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      <img src={props.src} alt={props.alt} className={cls.logoValue} />
      {meta.touched && meta.error ? (
        <div className={cls.errorText}>{meta.error}</div>
      ) : null}
    </>
  );
};

// custom formik textarea input to get validate by yup validation error or touched inputs.
const MyTextArea = ({ label, ...props }) => {
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

// custom formik date input to get validate by yup validation error or touched inputs.

const MyDate = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} type="date" />
      {meta.touched && meta.error ? (
        <div className={cls.errorTextMsg}>{meta.error}</div>
      ) : null}
    </>
  );
};


function FifthPopup({ updatePage }) {
   
  //on cancel of x it will redirect to zero/starting page
  const cancelHandler = () => {
    updatePage(0);
  };

  //to move next page/popup
  const handleClick = () => {
    updatePage(6);
  };

  //to go back or jump into previous page

  const goBackHandler = () => {
    updatePage(4);
  };

  return (
    <Formik
      initialValues={{
        company: "",
        location: "",
        designation: "",
        industry: "",
        description: "",
        startDate: "",
        endDate: "",
      }}
       //validations of all inputs
      validationSchema={Yup.object({
        company: Yup.string().required("*Company name!"),
        location: Yup.string().required("*Provide location adddress!"),
        designation: Yup.string().required("*Designation details!"),
        industry: Yup.string().required("*Mention industry!"),
        description: Yup.string().required(
          "*Please describe about your experience!"
        ),
        startDate: Yup.date()
        .required("*Select the start date")
        .max(new Date(), "Start Date can't be more than current date")
        .min(
          new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
          "Min date"
        ),
        endDate: Yup.date()
        .required("*Select the end date")
        .min(Yup.ref("startDate"), "*End date can't be before start date.")
        .notOneOf(
          [Yup.ref("startDate"), null],
          "End date should not be the same as the start date"
        )
        .max(new Date(), " End Date can't be more than current date"),

      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          handleClick();//after clearance of all errors form will get submit/next page...
        }, 400);
      }}
    >
      <div className={cls.popupBackground}>
        <div className={cls.popupContainer}>
          <button className={cls.titleCloseBtn} onClick={cancelHandler}>
            x
          </button>
          {/* Using the ProgressBar component to update progress of each popup */}
          <ProgressBar bgcolor={"#6257E4"} progress="55" />

          <div className={cls.progressText}>
            <span className={cls.basic}>Basic Information</span>
            <span className={cls.basic}>Education</span>
            <span className={cls.basic}>Experience</span>
            <span>Skills</span>
            <span>Certifications</span>
          </div>

          <div className={cls.titleContainer}>
            <div className={cls.experienceText}>Add Experience</div>
            <div className={cls.aboutYouText}>
              Add a profesional photo with clean background.
            </div>
          </div>

          <Form>
            <div className={cls.body}>
              <div>
                <MyTextInput
                  placeholder={"Search for your Company"}
                  name="company"
                  className={cls.searchText}
                  src={SearchLogo}
                  alt={"searchlogo"}
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
                <MyTextInput
                  placeholder={"Designation"}
                  name="designation"
                  className={cls.designationText}
                />
              </div>
            </div>

            <div className={cls.bodyText}>
              <div>
                 <MyDate
                  className={cls.startDateBtn}
                  name="startDate"
                  placeholder={"Start Date"}
                />
              </div>

              <div>
                 <MyDate
                  className={cls.endDateBtn}
                  name="endDate"
                  placeholder="End Date"
                />
              </div>

              <div>
                <MyTextInput
                  placeholder={"Industry"}
                  name="industry"
                  className={cls.industryText}
                />
              </div>
            </div>

            <div>
              <MyTextArea
                name="description"
                placeholder={"Description"}
                className={cls.textAreaDesc}
              />
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

export default FifthPopup;
