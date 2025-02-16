import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../Components/Button";
import BottomWarning from "../components/BottomWarning";
import { signup } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../store/atoms";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const token = useRecoilValue(tokenAtom); // Retrieve token or user info
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to signin if already authenticated
    if (token) {
      navigate("/signin");
    }
  }, [token], navigate);

  const [showError, setShowError] = useState(false);

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function hanldeClick(event) {
    event.preventDefault();
    const response = await signup(
      formData.firstName,
      formData.lastName,
      formData.username,
      formData.password
    );
  
    // If signup is successful, redirect to sign-in page
    if (response === "User created successfully.") {
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      });
      setShowError(false);
      navigate("/signin");  // Redirect to sign-in page
    } else {
      console.log("Signup failed with message: ", response);
      setShowError(true);
    }
  }
  
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-3">
        <div className="flex flex-col">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            name={"firstName"}
            value={formData.firstName}
            onChange={changeHandler}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            name={"lastName"}
            value={formData.lastName}
            onChange={changeHandler}
          />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@example.com"}
            name={"username"}
            value={formData.username}
            onChange={changeHandler}
            autocomplete="off"
          />
          <InputBox
            label={"Password"}
            placeholder={"******"}
            name={"password"}
            value={formData.password}
            onChange={changeHandler}
            autocomplete="new-password"
          />
          <Button label={"Sign up"} onClick={hanldeClick} />
          <BottomWarning
            label={"Already have an account? "}
            to={"/signin"}
            buttonText={"Sign in"}
          />
          {showError == true && (
            <div className="font-light text-red-700 text-xs mt-2">
              Signup Failed!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;