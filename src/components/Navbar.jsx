import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";
import { removeAllRequests } from "../utils/requestSLice";



const Navbar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true })
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeAllRequests());
      return navigate('/login');
    }
    catch (err) {
      console.log(err.message);
    }
  }
  const [disable, setDisable] = useState(false);

  const toggleDownTheDisable = (e) =>{
    setDisable(!disable);
  }
  return (
    <div className="navbar bg-base-300 px-4 md:px-8">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      {
        user && (
          <div className="flex">
            <div className="form-control">Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end mx-5 flex">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={toggleDownTheDisable}>
                <div className="w-10 rounded-full">
                  <img
                    alt="Not Available"
                    src={user.imageUrl} />
                </div>
              </div>
              {
                disable && (
                  <>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                      <li>
                        <Link to='/profile' className="justify-between" onClick={toggleDownTheDisable}>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to='/connections' onClick={toggleDownTheDisable}>Connections</Link>
                      </li>
                      <li>
                        <Link to='/requests' onClick={toggleDownTheDisable}>Requests</Link>
                      </li>
                      <li><a onClick={handleLogOut}>Logout</a></li>
                    </ul>
                  </>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Navbar;