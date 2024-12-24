import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const Feed = () => {

    const navigate = useNavigate();

    const feedData = useSelector((store) => store.feed);

    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feedData) {
            return;
        }
        try {
            const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true });
            console.log(res);
            dispatch(addFeed(res?.data?.data));
        }
        catch (err) {
            if (err.status === 401) {
                navigate('/login');
            }
            console.log(err.message);
        }
    }

    useEffect(() => {
        getFeed();
    }, []);

    if(!feedData){
        return (<h1 className="text-bold text-center text-2xl my-10">Please Wait....</h1>);
    }
    else if(feedData.length===0){
        return (<h1 className="text-bold text-center text-2xl my-10">Nothing to show to your feed currently!</h1>);
    }
    return (
        feedData && (
            <UserCard user={feedData[0]} />
        )
    );
    
}

export default Feed