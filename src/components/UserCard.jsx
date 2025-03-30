import React from "react";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();

    const  handleRequest = async(status,user_id) => {
        try{
            const res = await axios.post(BASE_URL + '/request/send/' + status+ '/' + user_id,{},{withCredentials:true});
            dispatch(removeUserFromFeed(user_id));
        }
        catch(err){
            console.log(err.message);
        }
    }
    return (
        <div className="flex justify-center mt-5">
            <div className="card bg-base-300 w-80 h-fit shadow-xl">
                <figure className="h-50 w-50">
                    <img
                        src={user.imageUrl}
                        className="object-cover"
                        alt="User" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.firstName} {user?.lastName || ""}</h2>
                    <div className="mb-3">
                        {user.age != null ? `${user.age}, ` : ""}
                        {user.gender}
                    </div>
                    <div className="mb-3">{user.about}</div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={()=> handleRequest('interested',user._id)}>Interested</button>
                        <button className="btn btn-secondary" onClick={()=>handleRequest('ignored',user._id)}>Ignore</button>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default UserCard
