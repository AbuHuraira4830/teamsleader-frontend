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
import WelcomePage from "../Pages/welcomPage/WelcomePage";
import ExtraNote from "../navbar/profileModal/ExtraNote";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const {
    theme,
    setTheme,
    isSidebarVisible,
    setIsSidebarVisible,
    isEmailVerified,
    componentToShow,
    selectedDocument,
    allDocuments,
    selectedTeam,
    selectedWorkspace,
    setSelectedDocument,
    setSelectedTeam,
    setComponentToShow,
    isDocumentChange,
    setShowDocSidebar,
    thisUser,
  } = useStateContext();
  // console.log({ selectedWorkspace, selectedTeam });
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
        if (response.status === 200) {
          console.log(response.data);
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
    getAPI("/api/theme/fetch")
      .then((response) => {
        setTheme(response.data.theme.theme);
        console.log("aaaaaaaaaa", response.data.theme.theme);
      })
      .catch((err) => {
        console.log(err);
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
  const { docId } = useParams();
  const handleGetDocumentDetials = () => {
    getAPI(`/api/doc/${docId}`)
      .then((response) => {
        if (response.status === 200) {
          setSelectedTeam(null);
          setComponentToShow("docCreator");
          setSelectedDocument(response?.data?.doc);
          setShowDocSidebar(false);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    docId && handleGetDocumentDetials();
  }, [docId, isDocumentChange]);

  return (
    <>
      {user && (
        <div>
          <div className="">
            <NewTeam />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
