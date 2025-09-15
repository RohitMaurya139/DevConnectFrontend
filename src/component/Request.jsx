import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import Loading from "./Loading";
import { Button } from "@mui/material";
const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(true)
  const[showStatus,setShowStatus]=useState("")
  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true })
      setShowButton(!showButton)
      setShowStatus(status)

    } catch (err) {
      console.error(err.response.data)
    }
}
  const getRequest = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log(res)
      dispatch(addRequest(res.data.data || []));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load requests.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequest();
    reviewRequest
  }, []);

  if (loading)
    return (
      <h2 className="text-white text-center mt-10">
        <Loading />
      </h2>
    );
  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;
  if (!requests.length)
    return (
      <h2 className="text-white text-center mt-10">No Request found!!!</h2>
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Connection Requests
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-base-200 rounded-lg shadow-md p-4 text-white border border-gray-600 flex gap-4"
          >
            <div className="avatar">
              <div className="w-24 rounded">
                <img src={request.fromUserId.profileImg} />
              </div>
            </div>
            <div className="flex flex-col">
              {" "}
              <h2 className="text-xl font-semibold mb-2">
                {request.fromUserId.FirstName} {request.fromUserId.LastName},{" "}
                {request.fromUserId.age}
              </h2>
              <p className="mb-1">Gender: {request.fromUserId.gender}</p>
              {showButton ? (
                <div className="flex gap-3 mt-3">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </Button>
                </div>
              ) : showStatus === "rejected" ? (
                <p className="bg-red-300 text-red-600 font-bold p-2 w-20 rounded-lg">
                  {"Rejected"}
                </p>
              ) : (
                <p className="bg-green-300 text-green-600 font-bold p-2 w-20 rounded-lg">
                  {"Friends"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
