import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import firebase_app from "../services/firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetch_users, userRegister } from "../redux/auth/authActions";

const auth = getAuth(firebase_app);
const initialState = {
  number: "",
  otp: "",
  user_name: "",
  password: "",
  verify: false,
  otpVerify: false,
};

export const Signup = () => {
  const [check, setCheck] = useState(initialState);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let exist = false;
  const { number, otp, verify, otpVerify, user_name, password } = check;

  // store value and getting user to check if the number is exist or not
  const { user, isLoading } = useSelector((store) => {
    return {
      user: store.LoginReducer.user,
      isLoading: store.LoginReducer.isLoading,
    };
  });

  //  check if the user is exist of not
  for (let i = 0; i < (user?.length || 0); i++) {
    if (user[i].number === number) {
      exist = true;
      break;
    }
  }

  //  capture
  const handleRegisterUser = () => {
    let newObj = {
      number,
      user_name,
      password,
      email: "",
      dob: "",
      gender: "",
      marital_status: null,
    };
    dispatch(userRegister(newObj));
    setCheck(initialState);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  // onCapture
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

  //   Verify button
  function handleVerifyNumber() {
    onCapture();
    const phoneNumber = `+91${number}`;
    const appVerifier = window.recaptchaVerifier;
    if (number.length === 10) {
      if (exist) {
        setErrorMsg("User already exists");
        setSuccessMsg("");
      } else {
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
      }
    } else {
      setSuccessMsg("");
      setErrorMsg("Mobile number is invalid!");
    }
  }

  // if the code is verified
  function verifyCode() {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        setCheck({ ...check, otpVerify: true });
        setSuccessMsg("Verified successfully!");
        setErrorMsg("");
      })
      .catch((error) => {
        setSuccessMsg("");
        setErrorMsg("Invalid OTP. Please try again.");
      });
  }

  // setting the typed value to the input state
  const handleChangeMobile = (e) => {
    let val = e.target.value;
    setCheck({ ...check, [e.target.name]: val });
  };

  useEffect(() => {
    dispatch(fetch_users());
  }, [dispatch]);

  return (
    <>
      <div className="mainLogin">
        <div id="recaptcha-container"></div>
        <div className="loginBx">
        <div className="logoImgdivReg"><img className="imglogoReg" src="https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg" alt="Logo" /></div>

          <div className="loginHead">
          <hr /><hr /><hr />

            <h1>Sign Up</h1>
          </div>
          
          <div className="loginInputB" id="loginNumber">
            <label htmlFor="">Enter Your Number</label>
            <span>
              <input
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
                Next
              </button>
            </span>
          </div>
          {verify ? (
            <div className="loginInputB" id="loginOtp">
              <label htmlFor="">Enter OTP</label>
              <span>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => handleChangeMobile(e)}
                />
                <button onClick={verifyCode}>Next</button>
              </span>
            </div>
          ) : (
            ""
          )}

          {otpVerify ? (
            <>
              <div className="loginInputB">
                <label htmlFor="">Enter Your Full name</label>
                <span>
                  <input
                    type="text"
                    name="user_name"
                    value={user_name}
                    onChange={(e) => handleChangeMobile(e)}
                  />
                </span>
              </div>
              <div className="loginInputB">
                <label htmlFor="">Your Password</label>
                <span>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleChangeMobile(e)}
                  />
                </span>
              </div>
              <div className="loginInputB">
                <button onClick={handleRegisterUser}>Continue</button>
              </div>
            </>
          ) : (
            ""
          )}

          {isLoading ? <h1>Please wait...</h1> : ""}

          <div className="loginTerms">
          <div className="inpChecbx"><input className="inp" type="checkbox" /> <h2>Keep me signed in</h2></div>
            <p>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</p>
            <h6>By signing in, I agree to the Chalo Ghume <span> Terms and Conditions</span>, <span>Privacy Statement</span> and <span>Expedia Rewards Terms and Conditions</span>.</h6>
          </div>
          <br />
          <h3 id="loginMesageError"></h3>
          <h3 id="loginMesageSuccess"></h3>
        </div>
      </div>
    </>
  );
};
