import React, { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { addRequests, removeRequests } from "../utils/requestSLice";
import { useSelector, useDispatch } from "react-redux";

const Requests = () => {
    const dispatch = useDispatch();
    const connectionRequestsFetch = useSelector((store) => store.requests);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/request/received`, { withCredentials: true });
            dispatch(addRequests(response?.data?.data || []));
        } catch (error) {
            console.error("Error fetching requests:", error.message);
        }
    };

    const reviewTheConnection = async (status, _id) => {
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
            dispatch(removeRequests(_id));
        } catch (error) {
            console.error("Error reviewing the connection:", error.message);
        }
    };

    // Initial fetch
    useEffect(() => {
        
            fetchRequests();
        
    }, [dispatch]);

    if (!connectionRequestsFetch || connectionRequestsFetch.length === 0) {
        return <h1 className="text-bold text-center text-2xl my-10">No Requests Found!</h1>;
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-2xl">Requests</h1>
            <div className="flex flex-wrap justify-center gap-5 mt-5">
                {connectionRequestsFetch.map((connectionRequest) => (
                    <div
                        key={connectionRequest._id}
                        className="card bg-base-300 w-96 shadow-md flex flex-col items-center"
                    >
                        <figure className="px-5 pt-5 h-48 w-48 flex items-center justify-center">
                            <img
                                src={connectionRequest.fromUserId.imageUrl}
                                alt="Not Available"
                                className="rounded-xl object-cover h-full w-full"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">
                                {connectionRequest.fromUserId.firstName}
                            </h2>
                            <p>{connectionRequest.fromUserId.about}</p>
                            <div className="flex justify-center gap-2">
                                <button
                                    className="btn btn-soft btn-success"
                                    onClick={() => reviewTheConnection("accepted", connectionRequest._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-soft btn-error"
                                    onClick={() => reviewTheConnection("rejected", connectionRequest._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Requests;
