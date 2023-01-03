import { Formik } from "formik";
import React from "react";
import cls from "../EighthPopup/EighthPopup.module.css";
import ProgressBar from "../../ProgressBar/ProgressBar";
import ColorLine from "../../Images/colorlines.svg";
import EmojiLast from "../../Images/EmojiLast.svg";

function EighthPopup({ updatePage }) {
  const cancelHandler = () => {
    updatePage(0);
  };

  return (
    <Formik>
      <div className={cls.popupBackground}>
        <div className={cls.popupContainer}>
          <button className={cls.titleCloseBtn} onClick={cancelHandler}>
            x
          </button>

          <ProgressBar bgcolor={"#6257E4"} progress="100" />

          <div className={cls.progressText}>
            <span className={cls.basic}>Basic Information</span>
            <span className={cls.basic}>Education</span>
            <span className={cls.basic}>Experience</span>
            <span className={cls.basic}>Skills</span>
            <span className={cls.basic}>Certifications</span>
          </div>

          <div>
            <img src={ColorLine} alt={"ColorLine"} className={cls.background} />
          </div>

          <div className={cls.emojiContainer}>
            <img src={EmojiLast} alt={"EmojiLast"} className={cls.emojiValue} />
          </div>

          <div className={cls.text}>Yay, You Earned</div>
          <div className={cls.coinText}>1000 Dripp Coins</div>
          <button className={cls.claimBtn}>Claim Rewards</button>
          <div className={cls.showText}>Show me jobs</div>
        </div>
      </div>
    </Formik>
  );
}

export default EighthPopup;
