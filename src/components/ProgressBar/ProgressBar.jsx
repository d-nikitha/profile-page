import React from "react";
import cls from "../ProgressBar/ProgressBar.module.css";
import emoji from "../Images/emoji.svg";
import emojibg from "../Images/emojibg.svg";

const ProgressBar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  };

  const Childdiv = {
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
    height: "7px",
  };

  return (
    <>
      <div style={Parentdiv}>
        <div style={Childdiv}></div>
      </div>

      <div className={cls.emojiBgValue}>
        <img className={cls.emojiBg} src={emojibg} alt={"emojibg"} />
      </div>

      <div className={cls.smileEmojiValue}>
        <img className={cls.smileEmoji} src={emoji} alt={"emoji"} />
      </div>
      
    </>
  );
};

export default ProgressBar;