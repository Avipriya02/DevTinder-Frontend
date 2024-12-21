import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const connectionList = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnection = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            console.log(response?.data?.data);
            dispatch(addConnections(response?.data?.data));
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchConnection();
    }, []);


    if (!connectionList || connectionList.length === 0) {
        return <h1 className="text-bold text-center text-2xl my-10">No Connections Found!</h1>;
    }

    return (
        <div className="text-center my-10 p-10">
            <h1 className="text-bold text-2xl">Connections</h1>
            <div className="flex flex-wrap justify-center gap-5 mt-5">
                {connectionList.map((connection) => (
                    <div 
                        key={connection._id} 
                        className="card bg-base-300 w-96 shadow-md flex flex-col items-center">
                        <figure className="px-5 pt-5 h-[200px] w-[200px] flex justify-center items-center">
                            <img
                                src={connection.imageUrl}
                                alt="Not Available"
                                className="rounded-xl h-full w-full object-cover" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">
                                {connection.firstName}
                            </h2>
                            <p>{connection.gender}</p>
                            <p>{connection.about}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connections;
