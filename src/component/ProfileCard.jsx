import React, { useState } from "react";


const ProfileCard = ({ user }) => {
 

  const { FirstName, LastName, age, gender,skills, profileImg, about } = user ;
           
  return (
    <div
      className="max-w-sm mx-auto rounded-lg shadow-lg bg-base-300 p-4 cursor-grab select-none"
      style={{ touchAction: "pan-y" }}
    >
      <img
        src={
          profileImg ||
          "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
        }
        alt={`${FirstName}'s profile`}
        className="rounded-lg w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-1">
          {FirstName} {LastName}, {age}
        </h2>
        <p className="text-gray-200 mb-2">{gender}</p>
        <p className="text-gray-200 mb-2">{about}</p>
        <p className="mb-4">Skills: {skills?.join(", ")}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
