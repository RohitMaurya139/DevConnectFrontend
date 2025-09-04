import React, { useState } from 'react'
import logo from "../assets/logo4.PNG"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import BASE_URL from '../utils/constants';
import  {removeUser} from '../utils/userSlice'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const handleLogout = async () => {
    try {
      const res = await axios.post(BASE_URL + "/logout",{},{withCredentials:true})
      dispatch(removeUser())
      navigate("/login")
    } catch (err) {
      console.error(err)
  }
}

  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1 mx-3">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-auto h-10 rounded-lg" />
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-4">
            {user && (
              <div className="flex items-center gap-3 px-2 py-1 rounded-lg bg-base-100 ">
                <span className="text-base font-semibold text-accent">
                  Welcome, {user?.data?.FirstName || user?.FirstName || "User"}
                  {console.log("Redux user state:", user)}
                </span>
                <button
                  tabIndex={0}
                  aria-label="View profile"
                  className="btn btn-ghost btn-circle avatar focus:ring focus:ring-primary"
                  style={{ outline: "none" }}
                >
                  <span className="avatar avatar-online">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={
                        user?.data?.profileImg ||
                        user?.profileImg ||
                        "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
                      }
                      alt={`Profile of ${user?.data?.FirstName || "User"}`}
                    />
                  </span>
                </button>
              </div>
            )}

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between" >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar