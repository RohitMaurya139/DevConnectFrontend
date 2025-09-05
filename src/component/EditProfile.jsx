import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice';
import ProfileCard from "./ProfileCard";
const EditProfile = ({ user }) => {
const [firstName, setFirstName] = useState(
  user?.data?.FirstName || user?.FirstName || ""
);
const [lastName, setLastName] = useState(
  user?.data?.LastName || user?.LastName || ""
);
const [age, setAge] = useState(user?.data?.age || user?.age || "");
const [gender, setGender] = useState(user?.data?.gender ||user?.gender|| "");
const [about, setAbout] = useState(
  user?.data?.about || user?.about || ""
  );
  const [skills, setSkills] = useState(
    user?.data?.skills || user?.skills || ""
  );
const [profile, setProfile] = useState(
  user?.data?.profileImg || user?.profileImg || ""
);
  const [error, setError] = useState("")
  const [success,setSuccess]=useState("")
  const dispatch = useDispatch() 
  const [showToast,setShowToast]=useState(false)
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          FirstName: firstName,
          LastName: lastName,
          age,
          gender,
          skills: user?.skills || [],
          profileImg: profile,
          about,
        },
        { withCredentials: true }
      );
      
      dispatch(addUser((res?.data?.data)))
      setSuccess("Profile Updated SuccessFully!!")
      setShowToast(true)
      setInterval(() => {
        setShowToast(false)
      }, 3000)
      
    } catch (err) {
      setError(err.response.data)
       setShowToast(true);
       setInterval(() => {
         setShowToast(false);
       }, 3000);
    }
  }
  

  return (
    <>
      {/* Flex container with gap for spacing */}
      <div className="flex gap-6 justify-center mt-5 px-4">
        {/* Form container with fixed width */}
        <div className="card card-border bg-base-200 w-[400px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile();
            }}
            className="card-body"
          >
            <h2 className="card-title mb-2">Edit Profile</h2>

            {/* First Name */}
            <label htmlFor="firstName" className="input validator mb-2 block">
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength={3}
                maxLength={30}
                title="Only letters, numbers or dash"
                className="mt-1"
              />
            </label>

            {/* Last Name */}
            <label htmlFor="lastName" className="input validator mb-2 block">
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength={3}
                maxLength={30}
                title="Only letters, numbers or dash"
                className="mt-1"
              />
            </label>

            {/* Age */}
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Your Age"
              className="input mt-2 w-full"
              min={18}
              max={90}
            />

            {/* Gender */}
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-success mt-2 w-full"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            {/* Profile URL */}
            <label className="input validator mt-4 mb-2 block">
              <input
                type="url"
                required
                placeholder="Profile URL"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                className="mt-1"
              />
            </label>
         

            {/* About */}
            <fieldset className="fieldset mt-2 mb-6">
              <legend className="fieldset-legend">About</legend>
              <textarea
                className="textarea h-24"
                placeholder="Bio"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <div className="label">Optional</div>
            </fieldset>
            {success
              ? showToast && (
                  <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                      <span>{success}</span>
                    </div>
                  </div>
                )
              : showToast && (
                  <div className="toast toast-top toast-center">
                    <div className="alert alert-info">
                      <span>{error}</span>
                    </div>
                  </div>
                )}
            {/* Submit Button */}
            <div className="card-actions justify-end mt-6">
              <button type="submit" className="btn btn-soft btn-accent">
                Save
              </button>
            </div>
          </form>
        </div>

        {/* UserCard container with fixed width to align side by side */}
        <div className="w-[400px]">
          <ProfileCard
            user={{
              FirstName: firstName,
              LastName: lastName,
              age,
              gender,
              skills: skills,
              profileImg: profile,
              about,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
