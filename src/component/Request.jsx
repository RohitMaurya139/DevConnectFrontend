import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
        const dispatch = useDispatch();

  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

        console.log(res.data.data);
        dispatch(addRequest(res.data.data))
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);
  return (
    <>
      <div className=" flex justify-center items-center ">
        <ul className="menu bg-base-200 rounded-box w-full mx-10 my-5">
          <li className="menu-title text-2xl text-white">My Request</li>
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Request;
