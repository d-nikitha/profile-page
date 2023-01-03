import React from "react";
import cls from "../MainProfile/Profile.module.css";
import Editbg from '../Images/Editbg.svg';
import EditLogo from '../Images/EditLogo.svg';

function Profile({ updatePage }) {

  const handleClick = () => {
    updatePage(1);
  }

  return (
      <div className={cls.skillBoard}>
        <img className={cls.editImage} src={Editbg} alt={"Editbg"} />
        <img className={cls.editlogoImage} src={EditLogo} alt={"EditLogo"} onClick={handleClick}/>
      </div>
  );
}

export default Profile;
