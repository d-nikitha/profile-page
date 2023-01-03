import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
//  import * as Yup from "yup";
import ProgressBar from "../../ProgressBar/ProgressBar";
import GoBackLogo from "../../Images/GoBackLogo.svg";
import cls from "../SixthPopup/SixthPopup.module.css";

const MyButtonInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <button {...field} {...props}>Add Skill </button>
        <img src={props.src} alt={props.alt} className={cls.logoValue} />
        {meta.touched && meta.error ? (
          <div className={cls.errorText}>{meta.error}</div>
        ) : null}
      </>
    );
};

function SixthPopup({ updatePage }) {
  const cancelHandler = () => {
    updatePage(0);
  };

  const handleClick = () => {
    updatePage(7);
  };

  const goBackHandler = () => {
    updatePage(5);
  };

  //to add skills from userend

  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s) => {
      const lastId = s[s.length - 1].id;
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChange1 = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };

  return (
    <Formik

      //  initialValues={{
      //   skill: "",
      //  }}

      //  validationSchema={Yup.object({
      //   skill: Yup.string().required("Add your skills!"),
      //  })}

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

          <ProgressBar bgcolor={"#6257E4"} progress="72" />

          <div className={cls.progressText}>
            <span className={cls.basic}>Basic Information</span>
            <span className={cls.basic}>Education</span>
            <span className={cls.basic}>Experience</span>
            <span className={cls.basic}>Skills</span>
            <span>Certifications</span>
          </div>

          <div className={cls.titleContainer}>
            <div className={cls.experienceText}>Add Skills</div>
            <div className={cls.aboutYouText}>
              Add a profesional photo with clean background.
            </div>
          </div>

          <Form>
            <div className={cls.body}>
              <div>

                <MyButtonInput
                  name="skill"
                  className={cls.skillBtn}
                  onClick={addInput}
                >
                  Add Skill
                </MyButtonInput>

                {arr.map((item, i) => {
                  return (
                    <input
                      onChange={handleChange1}
                      value={item.value}
                      id={i}
                      type={item.type}
                      className={cls.skillNew}
                      placeholder={"Type Here"}
                    />
                  );
                })}
              </div>
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
}

export default SixthPopup;
