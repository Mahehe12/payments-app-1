import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../Components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import { signin } from "../services/operations/authAPI";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../store/atoms";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenAtom);
  const [showError, setShowError] = useState(false);

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function hanldeClick() {
    const token = await signin(formData.username, formData.password);
    if (token) {
      setToken(token);
      setFormData({
        username: "",
        password: "",
      });
      setShowError(false);
      navigate("/dashboard");
    } else {
      setShowError(true);
    }
  }
  return (
    <div className="h-screen bg-slate-300 flex justify-center items-center">
      <div className="bg-white rounded-lg w-[80%] sm:w-[50%] lg:w-[23%] text-center p-3">
        <div className="flex flex-col">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            label={"Email"}
            placeholder={"johndoe@example.com"}
            onChange={changeHandler}
            name="username"
            value={formData.username}
            autocomplete="off"
          />
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            onChange={changeHandler}
            name="password"
            value={formData.password}
            autocomplete="off"
          />
          <Button label={"Sign in"} onClick={hanldeClick} />
          <BottomWarning
            label={"Don't have an account? "}
            to={"/signup"}
            buttonText={"Sign up"}
          />
          {showError && (
            <div className="font-light text-red-700 text-xs mt-2">
              Signin Failed!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;