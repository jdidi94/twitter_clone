import React from "react";
import "./login.css";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from "sweetalert";

function Login(props) {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [registerInput, setRegisterInput] = useState({
    name: "",
    password: "",
    repeatPassword: "",
    email: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterInput((registerInput) => ({ ...registerInput, [name]: value }));
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((loginInput) => ({ ...loginInput, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginInput.email === "" || loginInput.password === "") {
      swal("Oops!", "You need to fill in all the empty fields!", "error");
    } else {
      axios
        .post("http://localhost:4000/api/user/login", loginInput)
        .then((res) => {
          if (res.data.message === "wrong password") {
            swal("Oops!", "Wrong Password!", "error");
          } else if (res.data.message === "user not found") {
            swal("Oops!", "Wrong e-mail!", "error");
          } else {
            const token = res.data.token;
            localStorage.setItem("token", token);
            props.history.push("/edit");
            window.location.reload('/edit');
            swal("Welcome!", " You are log in !");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const has_special = /[!@#%*+=._-]/.test(registerInput.password);
    const has_number = /\d/.test(registerInput.password);
    if (
      registerInput.name === "" ||
      registerInput.password === "" ||
      registerInput.repeatPassword === "" ||
      registerInput.email === ""
    ) {
      swal("Oops!", "Empty fields", "error");
    } else if (!registerInput.email.includes("@")) {
      swal("Oops!", "Invalid mail", "error");
    } else if (!has_special && has_number) {
      swal(
        "Oops!",
        "Password needs to have at least one special character and one number",
        "error"
      );
    } else if (registerInput.password !== registerInput.repeatPassword) {
      swal("Oops!", "Password does not match!", "error");
    } else {
      axios
        .post("http://localhost:4000/api/user/signup", registerInput)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          props.history.push(`/edit`)
          window.location.reload('/edit');
  
          swal("Welcome!", " You are log in !");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    // eslint-disable-next-line
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label htmlFor="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                Email
              </label>

              <input
                name="email"
                id="user"
                type="text"
                value={loginInput.email}
                className="input"
                onChange={handleLoginChange}
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                value={loginInput.password}
                id="pass"
                type="password"
                className="input"
                data-type="password"
                name="password"
                onChange={handleLoginChange}
              />
            </div>
            <div className="group">
              <input id="check" type="checkbox" className="check" />
              <label htmlFor="check">
                <span className="icon"></span> Keep me Signed in
              </label>
            </div>
            <div className="group">
              <input
                onClick={handleLoginSubmit}
                type="submit"
                className="button"
                value="Sign In"
              />
            </div>
            <div className="hr"></div>
            <div className="foot-lnk">
              <a href="#forgot">Forgot Password?</a>
            </div>
          </div>
          <div className="sign-up-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                Username
              </label>
              <input
                onChange={handleRegisterChange}
                value={registerInput.name}
                name="name"
                id="user"
                type="text"
                className="input"
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                onChange={handleRegisterChange}
                value={registerInput.password}
                name="password"
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Repeat Password
              </label>
              <input
                onChange={handleRegisterChange}
                value={registerInput.repeatPassword}
                name="repeatPassword"
                id="pass"
                type="password"
                className="input"
                data-type="password"
              />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Email Address
              </label>
              <input
                onChange={handleRegisterChange}
                value={registerInput.email}
                name="email"
                id="pass"
                type="text"
                className="input"
              />
            </div>
            <div className="group">
              <input
                onClick={handleRegisterSubmit}
                type="submit"
                className="button"
                value="Sign Up"
              />
            </div>
            <div className="hr"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
