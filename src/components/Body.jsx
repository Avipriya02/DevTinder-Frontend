import React, { useEffect } from "react";
import Navbar from './Navbar';
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Cookies from "js-cookie";



const Body = () => {

    const navigate = useNavigate();

    const userData = useSelector((store)=>store.user);

    const dispatch = useDispatch();

    const fetchUser = async() => {
        try{
            if(userData){
                const token = Cookies.get('token');
                if(token){
                    return
                }
            }
            const res = await axios.get(BASE_URL +  '/profile/view', {withCredentials:true});
            dispatch(addUser(res.data.data));
        }
        catch(err){
            if(err.status===401){
                navigate('/login');
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