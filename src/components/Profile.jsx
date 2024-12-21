import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
    const fetchUser = useSelector((store) => store.user);

    return (
        fetchUser ? (
            <div><EditProfile user={fetchUser} /></div>
        ) : null
    );
};

export default Profile;