import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const UserCard = ({ user }) => {
  const [swiped, setSwiped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const { FirstName, LastName, age, gender, skills, profileImg,about } = user;

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      setSwiped(true);
      setSwipeDirection(eventData.dir);
      console.log("Swiped!", eventData.dir);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (swiped) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        You swiped {swipeDirection === "Left" ? "Nope ❌" : "Yes ✅"} on{" "}
        {FirstName}
      </div>
    );
  }

  return (
    <div
      {...handlers}
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
          <button className="btn btn-error btn-circle btn-lg">❌</button>
          <button className="btn btn-success btn-circle btn-lg">✅</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
