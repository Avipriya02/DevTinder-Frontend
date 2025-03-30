import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.imageUrl);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();

    const updateProfile = async () => {
        try {
            setError('');
            const res = await axios.patch(BASE_URL + '/profile/edit', { firstName, lastName, age, gender, "imageUrl": photoUrl, about }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);

        }
        catch (err) {
            setError(err?.response?.data || "Something Went Wrong!");
        }

    }
    return (
        <>
            <div className="flex flex-wrap justify-center my-5 pb-16 gap-5">
                {
                    showToast && <div className="toast toast-top toast-center z-10">
                        <div className="alert alert-success">
                            <span>Profile Saved successfully.</span>
                        </div>
                    </div>
                }
                <div className="card bg-base-300 w-[400px] shadow-md">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl font-semibold">Update Profile</h2>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <input type="text" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <input type="text" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Age</span>
                            </div>
                            <input type="number" className="input input-bordered w-full max-w-xs" value={age} onChange={(e) => setAge(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <select className="select w-full max-w-xs" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="others">others</option>
                            </select>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Photo URL</span>
                            </div>
                            <input type="text" className="input input-bordered w-full max-w-xs" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">About</span>
                            </div>
                            <textarea className="textarea textarea-bordered textarea-lg w-full max-w-xs" onChange={(e) => setAbout(e.target.value)}>{about}</textarea>
                        </label>
                        <p className="text-red-500 mt-5">{error}</p>
                        <div className="card-actions mt-2">
                            <button className="btn btn-outline btn-primary w-full" onClick={updateProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="card bg-base-300 w-80 h-fit shadow-xl">
                        <figure className="h-50 w-50">
                            <img
                                src={user.imageUrl}
                                className="object-cover"
                                alt="User" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{firstName} {lastName? lastName : ""}</h2>
                            <div className="mb-3">
                                {age != null ? `${age}, ` : ""}
                                {gender}
                            </div>
                            <div className="mb-3">{about}</div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled>Interested</button>
                                <button className="btn btn-secondary" disabled>Ignore</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default EditProfile
