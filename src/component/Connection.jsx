import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import Loading from './Loading'
import ProfileCard from "./ProfileCard";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getConnection = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/request/connection`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data || []));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load connections.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);

  if (loading)
    return (
      <h2 className="text-white text-center mt-10"><Loading/></h2>
    );
  if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;
  if (!connections.length)
    return (
      <h2 className="text-white text-center mt-10">No connections found!!!</h2>
    );

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="menu-title text-2xl text-white mb-6 text-center">
        My Connections
      </h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
        {connections.map((connection) => (
          <ProfileCard
            key={connection._id}
            user={{
              FirstName: connection.FirstName,
              LastName: connection.LastName,
              age: connection.age,
              gender: connection.gender,
              skills: connection.skills,
              profileImg: connection.profileImg,
              about: connection.about,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Connection;
