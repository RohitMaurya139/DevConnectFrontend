
import { Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";

import BASE_URL from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch =useDispatch()

  const { _id,FirstName, LastName, age, gender, skills, profileImg, about } = user;
  const handleRequest = async (status,toUserId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/request/send/${status}/${toUserId}`, {}, { withCredentials: true });
     dispatch(removeFeed(toUserId))
    } catch (err) {
      console.err(err)
    }
  }

  return (
    <div
      className="max-w-sm mx-auto h-fit my-3 rounded-lg shadow-lg bg-base-200 p-4 cursor-grab select-none"
      style={{ touchAction: "pan-y" }}
    >
      <img
        src={
          profileImg ||
          "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
        }
        alt={`${FirstName}'s profile`}
        className="rounded-lg w-full h-60 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-1">
          {FirstName} {LastName}, {age}
        </h2>
        <p className="text-gray-200 mb-2">{gender}</p>
        <p className="text-gray-200 mb-2">{about}</p>
        <p className="mb-4">Skills: {skills?.join(", ")}</p>
        <div className="flex justify-around">
          <Button
            variant="outlined"
            color="error"
            onClick={()=>handleRequest("ignored", _id)}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={()=>handleRequest("interested", _id)}
          >
            Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
       
