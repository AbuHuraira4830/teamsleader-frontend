import React, { useEffect, useState } from "react";
import "../../../assets/css/Login.css";
import IMAGES from "../../../assets/images/Images";
import { getAPI } from "../../../helpers/apis";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    getAPI(
      `/api/user/confirm/${window.location.href
        .split("/verify-email/")[1]
        .trim()}`
    )
      .then((response) => {
        if (response.status === 200) {
          setIsVerified(true);
          window.location.replace("/");
          toast.success(response.data.message);
        } else {
          window.location.replace("/");
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err });
        if (err.status === 401) {
          toast.error("Login to your account first");
          return window.location.replace("/login");
        }
        window.location.replace("/");
        toast.error(response.data.message);
      });
  }, [isVerified]);

  return (
    <div className="Login_Page">
      <div
        className="login_header flex align-items-center border-bottom px-3"
        style={{ height: "65px", backgroundColor: "#F7F7F7" }}
      >
        <img
          src={IMAGES.LEAF}
          className="align-self-center me-2"
          style={{ width: "30px" }}
          alt=""
        />
        <h2 style={{ fontWeight: "900", margin: "0", letterSpacing: "-2px" }}>
          Teams Leader
        </h2>
      </div>

      <div className="login_body text-center p-5 ">
        <h1>
          {isVerified
            ? "Email verified successfully"
            : "Email Verification in progress..."}
        </h1>

        {isVerified ? (
          <p style={{ marginTop: "24px" }}>
            If system will not redirect you, then <a href="/">click here</a> to
            redirect. Redirecting...
          </p>
        ) : (
          <p style={{ marginTop: "24px" }}>
            We will automatically redirect you to dashboard after verification.
            Thanks for your respected patience with us
          </p>
        )}
      </div>
    </div>
  );
    useEffect(() => {

        getAPI("/api/user/confirm").then((response) => {
            if(response.status===200){
                setIsVerified(true);
                window.location.replace("/");
                // toast.success(response.data.message);
            }else{
                window.location.replace("/");
                // toast.error(response.data.message);
            }
        }).catch((err) => {
            if(err.status===401){
                // toast.error("Login to your account first");
                return window.location.replace("/login");
            }
            window.location.replace("/");
            // toast.error(response.data.message);
        }); 

    }, [isVerified])


    return (
        <div className="Login_Page">
            <div
                className="login_header flex align-items-center border-bottom px-3"
                style={{ height: "65px", backgroundColor: "#F7F7F7" }}>
                <img
                    src={IMAGES.LEAF}
                    className="align-self-center me-2"
                    style={{ width: "30px" }}
                    alt="" />
                <h2 style={{ fontWeight: "900", margin: "0", letterSpacing: "-2px" }}>
                    Teams Leader
                </h2>
            </div>

            <div className="login_body text-center p-5 ">

                <h1>
                    {isVerified?
                        "Email verified successfully":
                        "Email Verification in progress..."
                    }
                </h1>

                {isVerified?
                    <p style={{ marginTop: "24px" }}>
                        If system will not redirect you, then <a href="/">click here</a> to redirect. Redirecting...
                    </p>:
                    <p style={{ marginTop: "24px" }}>
                        We will automatically redirect you to dashboard after verification. Thanks for your respected patience with us
                    </p>
                }

            </div>
        </div>
    );
};

export default EmailVerification;
