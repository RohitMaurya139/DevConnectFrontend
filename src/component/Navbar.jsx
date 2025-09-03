import React from 'react'
import logo from "../assets/logo4.PNG"
const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <a><img src={logo} alt="logo" className='w-auto h-10 rounded-lg' /></a>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="avatar avatar-online">
                <div className="w-10 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default Navbar