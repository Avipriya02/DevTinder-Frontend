import React, { useEffect } from "react";
import Navbar from './Navbar';
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Body = () => {

    const navigator = useNavigate();

    const userData = useSelector((store)=>store.user);

    const fetchUser = async() => {
        try{
            if(userData){
                return;
            }
            const res = await axios.get(BASE_URL +  '/profile/view',{withCredentials:true});
        }
        catch(err){
            if(err.status===401){
                navigator('/login');
            }
            console.log(err.message);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[]);

    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Body