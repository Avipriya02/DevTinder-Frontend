import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogIn = async(e) => {
        if (!email && !password) {
            setAlert(true);
            return;
        }
        else{
            // console.log(email);
            // console.log(password);
            const res = await axios.post(BASE_URL +'/login',{"emailId":email,"password":password},{withCredentials:true});
            dispatch(addUser(res.data));
            return navigate('/feed');
        }
    }
    return (
        <>
            {
                alert && (
                    <div className="error-mg-box flex justify-end">
                        <div
                            role="alert"
                            aria-live="assertive"
                            className="alert alert-warning mx-2 w-96 my-3 flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <span>Warning: Email address and password both are required to login!</span>
                        </div>
                    </div>
                )}
            <div className="card bg-base-300 w-96 shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6">
                <div className="card-body items-center text-center">
                    <h2 className="card-title mb-6 text-xl font-semibold">Login</h2>

                    {/* Email Input */}
                    <label className="input input-bordered flex items-center gap-3 mb-4 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-5 w-5 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type="text" className="grow" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}required />
                    </label>

                    {/* Password Input */}
                    <label className="input input-bordered flex items-center gap-3 mt-6 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-5 w-5 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input type="password" className="grow" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}required />
                    </label>

                    {/* Login Button */}
                    <div className="card-actions mt-6">
                        <button className="btn btn-outline btn-primary w-full" onClick={handleLogIn}>Login</button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Login;
