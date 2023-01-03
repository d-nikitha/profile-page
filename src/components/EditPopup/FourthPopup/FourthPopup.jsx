import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "../../ProgressBar/ProgressBar";
import GoBackLogo from "../../Images/GoBackLogo.svg";
import cls from "../FourthPopup/FourthPopup.module.css";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import SearchLogo from "../../Images/searchLogo.svg";

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

function FourthPopup({ updatePage }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [endSelectedDate, setEndSelectedDate] = useState(null);

  const cancelHandler = () => {
    updatePage(0);
  };

  const handleClick = () => {
    updatePage(5);
  };

  const goBackHandler = () => {
    updatePage(3);
  };

  return (
    <Formik
      initialValues={{
        search: "",
        location: "",
        degree: "",
        // startDate: "",
        // endDate: "",
        study: "",
        description: "",
      }}
      validationSchema={Yup.object({
        search: Yup.string().required("*University name!"),
        location: Yup.string().required("*Provide location adddress!"),
        degree: Yup.string().required("*Provide degree details!"),

        // startDate: Yup.date()
        // .required("Required"),

        // endDate: Yup.date()
        // .required("Required")
        // .min(
        //   Yup.ref('startDate'),
        //   "end date can't be before start date"
        // ),
       
        study: Yup.string().required("*Mention study!"),
        description: Yup.string().required(
          "*Please provide description about education!"
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

          <ProgressBar bgcolor={"#6257E4"} progress="40" />

          <div className={cls.progressText}>
            <span className={cls.basic}>Basic Information</span>
            <span className={cls.basic}>Education</span>
            <span>Experience</span>
            <span>Skills</span>
            <span>Certifications</span>
          </div>

          <div className={cls.titleContainer}>
            <div className={cls.educationText}>Add Education Details</div>
            <div className={cls.aboutYouText}>
              Add a profesional photo with clean background.
            </div>
          </div>

          <Form>
            <div className={cls.body}>
              <div>
                <MyTextInput
                  placeholder={"Search for your University"}
                  name="search"
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
                  placeholder={"Degree"}
                  name="degree"
                  className={cls.degreeText}
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
                  name="endDate"
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
                  placeholder={"Field of study"}
                  name="study"
                  className={cls.studyText}
                />
              </div>
            </div>

            <div>
              <MyTextarea
                placeholder={"Description"}
                name="description"
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

export default FourthPopup;
