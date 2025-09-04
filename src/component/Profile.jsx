import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <div>Loading user profile...</div>; // Or redirect/login prompt
  }

  const { FirstName, LastName, age, skills, gender, profileImg } = user;

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={
              profileImg ||
              "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            }
            alt={`${FirstName}'s profile`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            <p>
              {FirstName} <span>{LastName}</span>
            </p>
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>User profile overview here</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Age: {age}</div>
            <div className="badge badge-outline">Gender: {gender}</div>
            <div className="badge badge-outline">
              Skills: {skills.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
