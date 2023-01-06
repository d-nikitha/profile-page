import { useState } from 'react';
import "./App.css";
import Profile from "./components/MainProfile/Profile";
import Popup from "./components/EditPopup/FirstPopup/Popup";
import SecondPopUp from "./components/EditPopup/SecondPopup/SecondPopUp";
import ThirdPopup from "./components/EditPopup/ThirdPopup/ThirdPopup";
import FourthPopup from "./components/EditPopup/FourthPopup/FourthPopup";
import FifthPopup from "./components/EditPopup/FifthPopup/FifthPopup";
import SixthPopup from "./components/EditPopup/SixthPopup/SixthPopup";
import SeventhPopup from './components/EditPopup/SeventhPopup/SeventhPopup';
import EighthPopup from "./components/EditPopup/EighthPopup/EighthPopup";

function App() {
  const [page, setPage] = useState(0);

  return (
    <>
      
      {page === 0 ? <Profile updatePage={setPage} /> : null}
      {page === 1 ? <Popup updatePage={setPage} /> : null}
      {page === 2 ? <SecondPopUp updatePage={setPage} /> : null}
      {page === 3 ? <ThirdPopup updatePage={setPage} /> : null}
      {page === 4 ? <FourthPopup updatePage={setPage} /> : null}
      {page === 5 ? <FifthPopup updatePage={setPage} /> : null}
      {page === 6 ? <SixthPopup updatePage={setPage} /> : null} 
      {page === 7 ? <SeventhPopup updatePage={setPage} /> : null}
      {page === 8 ? <EighthPopup updatePage={setPage} /> : null}      

      {/* <SecondPopUp /> */}
      {/* <FourthPopup/>  */}
      {/* <FifthPopup />  */}
      {/* <SixthPopup /> */}
      {/* <SeventhPopup /> */}
      {/* <EighthPopup/> */}
      {/* <Popup /> */}
      {/* <ThirdPopup/>    */}

    </>
  );
}

export default App;