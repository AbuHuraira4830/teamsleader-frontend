import React, { useState } from "react";
import Signup0 from "./Signup0";
import Signup1 from "./Signup1";
import Signup2 from "./Signup2";
import Signup3 from "./Signup3";
import Signup4 from "./Signup4";
import Signup5 from "./Signup5";
import Signup6 from "./Signup6";
import { useStateContext } from "../../../contexts/ContextProvider";

const Signup = () => {
  const [activeView, setActiveView] = React.useState("view0");
  const { userEmail, setUserEmail } = useStateContext();
  return (
    <div>
      {activeView === "view0" ? (
        <Signup0
          setActiveView={setActiveView}
          setUserEmail={setUserEmail}
          userEmail={userEmail}
        />
      ) : activeView === "view1" ? (
        <Signup1 setActiveView={setActiveView} userEmail={userEmail} />
      ) : activeView === "view2" ? (
        <Signup2 setActiveView={setActiveView} />
      ) : activeView === "view3" ? (
        <Signup3 setActiveView={setActiveView} />
      ) : activeView === "view4" ? (
        <Signup4 setActiveView={setActiveView} />
      ) : activeView === "view5" ? (
        <Signup5 setActiveView={setActiveView} />
      ) : activeView === "view6" ? (
        <Signup6 setActiveView={setActiveView} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Signup;
