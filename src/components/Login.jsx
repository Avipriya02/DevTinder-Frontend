import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginForm, setLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async () => {
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId: email, password: password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  const handleSignUp = async () => {
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId: email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Signup failed!");
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl my-5 mx-auto p-6">
      <div className="card-body items-center text-center">
        <h2 className="card-title mb-6 text-xl font-semibold">
          {loginForm ? "Login" : "Sign Up"}
        </h2>

        {/* Email Input */}
        <label className="input input-bordered flex items-center gap-3 mb-4 w-full">
          <span className="icon-placeholder">📧</span>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {/* Password Input */}
        <label className="input input-bordered flex items-center gap-3 mb-4 w-full">
          <span className="icon-placeholder">🔒</span>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {/* Additional Inputs for Signup */}
        {!loginForm && (
          <>
            <label className="input input-bordered flex items-center gap-3 mb-4 w-full">
              <span className="icon-placeholder">👤</span>
              <input
                type="text"
                className="grow"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-3 mb-4 w-full">
              <span className="icon-placeholder">👤</span>
              <input
                type="text"
                className="grow"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-5">{error}</p>}

        {/* Action Button */}
        <div className="card-actions mt-5 w-full">
          <button
            className="btn btn-outline btn-primary w-full"
            onClick={loginForm ? handleLogIn : handleSignUp}
          >
            {loginForm ? "Login" : "Sign Up"}
          </button>
        </div>

        {/* Toggle Form Link */}
        <p className="text mt-5">
          {loginForm
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a
            className="link link-primary"
            onClick={() => {
              setLoginForm(!loginForm);
              setError("");
            }}
          >
            {loginForm ? "Sign Up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
