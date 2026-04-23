import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import firebase_app from "../services/firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetch_users, login_user } from "../redux/auth/authActions";

const auth = getAuth(firebase_app);
const initialState = {
  number: "",
  otp: "",
  verify: false,
};

export const Login = () => {
  const [check, setCheck] = useState(initialState);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, activeUser, user } = useSelector((store) => {
    return {
      isAuth: store.LoginReducer.isAuth,
      activeUser: store.LoginReducer.activeUser,
      user: store.LoginReducer.user,
    };
  });

  const { number, otp, verify } = check;

  let exist = false;
  let data = {};

  for (let i = 0; i <= user.length - 1; i++) {
    if (user[i].number === number) {
      exist = true;
      data = user[i];
      break;
    }
  }

  function onCapture() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          handleVerifyNumber();
        },
      },
      auth
    );
  }

  function handleVerifyNumber() {
    onCapture();
    const phoneNumber = `+91${number}`;
    const appVerifier = window.recaptchaVerifier;
    
    if (number.length === 10) {
      if (exist) {
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setCheck({ ...check, verify: true });
            setSuccessMsg(`OTP sent to ${number}!`);
            setErrorMsg("");
          })
          .catch((error) => {
            setErrorMsg("Failed to send OTP. Please try again.");
          });
      } else {
        setSuccessMsg("");
        setErrorMsg("User does not exist. Please create your account!");
        setTimeout(() => {
          navigate("/register");
        }, 1500);
      }
    } else {
      setSuccessMsg("");
      setErrorMsg("Mobile number is invalid!");
    }
  }

  function verifyCode() {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        setSuccessMsg("Verified successfully!");
        setErrorMsg("");
        dispatch(login_user(data));
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        setSuccessMsg("");
        setErrorMsg("Invalid OTP. Please try again.");
      });
  }

  const handleChangeMobile = (e) => {
    let val = e.target.value;
    setCheck({ ...check, [e.target.name]: val });
  };

  useEffect(() => {
    dispatch(fetch_users());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <>
      <div className="mainLogin">
        <div id="recaptcha-container"></div>
        <div className="loginBx">
        <div className="logoImgdiv"><img className="imglogo" src="https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg" alt="Logo" /></div>
           
          <div className="loginHead">
          <hr /><hr /><hr />
            <h1>SignIn</h1>
          </div>
          <div className="loginInputB">
            <label htmlFor="phoneInput">Enter Your Number</label>
            <span>
              <input
                id="phoneInput"
                type="number"
                readOnly={verify}
                name="number"
                value={number}
                onChange={(e) => handleChangeMobile(e)}
                placeholder="Number"
              />
              <button
                disabled={verify}
                onClick={handleVerifyNumber}
              >
                SignIn
              </button>
            </span>
          </div>
          {verify ? (
            <div className="loginInputB">
              <label htmlFor="otpInput">Enter Your OTP</label>
              <span>
                <input
                  id="otpInput"
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => handleChangeMobile(e)}
                />
                <button onClick={verifyCode}>Continue</button>
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="loginTerms">
            <Link to="/register">Don't have an Account</Link>
            <Link to="/admin">Admin Login</Link>
            <div className="inpChecbx"><input className="inp" type="checkbox" /> <h2>Keep me signed in</h2></div>
            <p>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</p>
            <h6>By signing in, I agree to the Chalo Ghume <span> Terms and Conditions</span>, <span>Privacy Statement</span> and <span>Expedia Rewards Terms and Conditions</span>.</h6>
          </div>
          <h3 id="loginMesageError" style={{ color: 'red' }}>{errorMsg}</h3>
          <h3 id="loginMesageSuccess" style={{ color: 'green' }}>{successMsg}</h3>
        </div>
      </div>
    </>
  );
};
