import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "../../ProgressBar/ProgressBar";
import GoBackLogo from "../../Images/GoBackLogo.svg";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import SearchLogo from "../../Images/searchLogo.svg";
import cls from "../FifthPopup/FifthPopup.module.css";

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

// const MyDatePicker =({ label, ...props }) => {
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <DatePicker {...field} {...props} type='' />
//       {meta.touched && meta.error ? (
//         <div className={cls.errorText}>{meta.error}</div>
//       ) : null}
//     </>
//   );

// }

function FifthPopup({ updatePage }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [endSelectedDate, setEndSelectedDate] = useState(null);

  const cancelHandler = () => {
    updatePage(0);
  };

  const handleClick = () => {
    updatePage(6);
  };

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
      }}
      validationSchema={Yup.object({
        company: Yup.string().required("*Company name!"),
        location: Yup.string().required("*Provide location adddress!"),
        designation: Yup.string().required("*Designation details!"),
        industry: Yup.string().required("*Mention industry!"),
        description: Yup.string().required(
          "*Please describe about your experience!"
        ),
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
                <DatePicker
                  name="startDate"
                  selected={selectedDate}
                  className={cls.startDateBtn}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Start Date"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  scrollableMonthYearDropdown
                  required
                />
              </div>

              <div>
                <DatePicker
                  selected={endSelectedDate}
                  className={cls.endDateBtn}
                  onChange={(date) => setEndSelectedDate(date)}
                  placeholderText="End Date"
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  scrollableMonthYearDropdown
                  required
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
              <MyTextarea
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
