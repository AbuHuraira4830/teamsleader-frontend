// import React, { useEffect, useState } from "react";
// import Sidebar from "../sidebar/Sidebar";
// import Navbar from "../navbar/Navbar";
// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/js/froala_editor.pkgd.min.js";
// import "froala-editor/js/plugins.pkgd.min.js";
// import { useStateContext } from "../../contexts/ContextProvider";
// import SlateEditor from "../Pages/DocCreater/DocEditor";
// import { getAPI } from "../../helpers/apis";
// import { useNavigate, useParams } from "react-router-dom";
// import { NewTeam } from "../Pages/NewTeam/NewTeam";
// import Gallery from "../Pages/fileGallery/Gallery";
// import DocEditor from "../Pages/DocCreater/DocEditor";
// import PasswordTable from "../Pages/PasswordsTable/PasswordTable";
// import PasswordTableWrapper from "../Pages/PasswordsTable/PasswordTable";

// const Home = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState();
//   const {
//     theme,
//     setTheme,
//     isSidebarVisible,
//     setIsSidebarVisible,
//     isEmailVerified,
//     selectedTeam,
//     selectedWorkspace,
//   } = useStateContext();
//   console.log({ selectedWorkspace , selectedTeam });
//   const { workspaceID, teamID } = useParams();

//   const [height, setHeight] = useState(getHeight());

//   useEffect(() => {
//     const handleResize = () => {
//       setHeight(getHeight());
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup function to remove the event listener
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   function getHeight() {
//     const width = window.innerWidth;
//     if (width < 375) {
//       return "390vh";
//     } else if (width < 426) {
//       return "350vh";
//     } else if (width > 426) {
//       return "";
//     } else {
//       return "";
//     }
//   }
//   useEffect(() => {
//     // you;
//     getAPI("/api/user/get-user-from-token")
//       .then((response) => {
//         if (response.status === 200) {
//           setUser(response.data._doc);
//           getAPI("/api/workspace/list")
//             .then((response) => {
//               if (!workspaceID) {
//                 navigate(
//                   `/workspace/${response.data.workspaces[0]._id}/team/${response.data.workspaces[0].teams[0]._id}`
//                 );
//               }
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//       })
//       .catch((e) => {
//         if (e.response.status === 401) {
//           setUser(null);
//           return navigate("/login");
//         }
//         // toast.error(e.response.data.message);
//         console.log(e.response.data.message);
//       });
//   }, []);

//   useEffect(() => {
//     document.body.className = theme;
//     var pathname = window.location.pathname;
//     var body = document.body;

//     if (pathname.includes("/login") || pathname === "/signup") {
//       body.classList.add("white_body");
//     } else {
//       body.classList.add("green_body");
//     }
//   }, [theme]);

//   const toggleNavbar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     user && (
//       <div>
//         {/* <Alert message="Success Text" type="success" /> */}
//         <div className="Navbar  py-1 w-100 " style={{ zIndex: 999 }}>
//           <Navbar setTheme={setTheme} user={user} />
//         </div>

//         <div className="app-container flex">
//           <div
//             className={`sidebar ${isEmailVerified ? "" : "top88"}  ${
//               isSidebarVisible ? "" : "collapse_sidebar"
//             }`}
//           >
//             <Sidebar
//               toggleNavbar={toggleNavbar}
//               isSidebarVisible={isSidebarVisible}
//               workspaceID={workspaceID}
//               teamID={teamID}
//             />
//           </div>
//           <div
//             className={`main-content ${isEmailVerified ? "" : "top88"} ${
//               isSidebarVisible ? "" : "expanded"
//             } h-screen mb-8 overflow-auto`}
//           >
//             <div className="respon" style={{ height }}>
//               {/* <PasswordTable /> */}
//               <NewTeam />
//               {/* <DocEditor /> */}
//               {/* <EmailVerificationModal /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import { useStateContext } from "../../contexts/ContextProvider";
import SlateEditor from "../Pages/DocCreater/DocEditor";
import { getAPI } from "../../helpers/apis";
import { useNavigate, useParams } from "react-router-dom";
import { NewTeam } from "../Pages/NewTeam/NewTeam";
import Gallery from "../Pages/fileGallery/Gallery";
import DocEditor from "../Pages/DocCreater/DocEditor";
import PasswordTable from "../Pages/PasswordsTable/PasswordTable";
import PasswordTableWrapper from "../Pages/PasswordsTable/PasswordTable";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const {
    theme,
    setTheme,
    isSidebarVisible,
    setIsSidebarVisible,
    isEmailVerified,
    selectedTeam,
    selectedWorkspace,
  } = useStateContext();
  console.log({ selectedWorkspace, selectedTeam });
  const { workspaceID, teamID } = useParams();

  const [height, setHeight] = useState(getHeight());

  useEffect(() => {
    const handleResize = () => {
      setHeight(getHeight());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getHeight() {
    const width = window.innerWidth;
    if (width < 375) {
      return "390vh";
    } else if (width < 426) {
      return "350vh";
    } else if (width > 426) {
      return "";
    } else {
      return "";
    }
  }

  useEffect(() => {
    getAPI("/api/user/get-user-from-token")
      .then((response) => {
        console.log("Get User Toke Resp",response);
        if (response.status === 200) {
          setUser(response.data._id);
          getAPI("/api/workspace/list")
            .then((response) => {
              if (!workspaceID) {
                navigate(
                  `/workspace/${response.data.workspaces[0]._id}/team/${response.data.workspaces[0].teams[0]._id}`
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setUser(null);
          return navigate("/login");
        }
        console.log(e.response.data.message);
      });
  }, []);

  useEffect(() => {
    const body = document.body;
    body.className = theme;

    if (selectedTeam?.role === "employee") {
      body.classList.remove("green_body");
      body.classList.add("body-blue");
    } else if (selectedTeam?.role === "client") {
      body.classList.remove("green_body");
      body.classList.add("body-red");
    } else if (selectedTeam?.role === "admin") {
      body.classList.remove("green_body");
      body.classList.add("body-gray");
    } else {
      body.classList.remove("body-blue", "body-red", "body-gray");
      body.classList.add("green_body");
    }
  }, [theme, selectedTeam]);

  const toggleNavbar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const navbarClass =
    selectedTeam?.role === "employee"
      ? "navbar-blue"
      : selectedTeam?.role === "client"
      ? "navbar-red"
      : selectedTeam?.role === "admin"
      ? "navbar-gray"
      : "";

  return (
    <>
   
    user && (
      <div>
        <div className="app-container flex">
          <div
            className={`main-content ${isEmailVerified ? "" : "top88"} ${
              isSidebarVisible ? "" : "expanded"
            } h-screen mb-8 overflow-auto`}
          >
            <div className="respon" style={{ height }}>
              <NewTeam />
            </div>
          </div>
        </div>
      </div>
    )
 
    </>
  );
};

export default Home;
