import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState("");

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && skills.length < 15 && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handelSignUp = async () => {
    if (skills.length < 1) {
      setError("Please add at least one skill");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          FirstName: firstName,
          LastName: lastName,
          age,
          gender,
          email,
          password,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setSuccess("Account Created Successfully!!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      <div className="flex gap-6 justify-center mt-5 px-4">
        {/* Form container with fixed width */}
        <div className="card card-border bg-base-200 w-[400px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handelSignUp();
            }}
            className="card-body"
          >
            <h2 className="card-title mb-2">Sign Up</h2>

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
              className="input mt-2"
              min={18}
              max={90}
            />

            {/* Gender */}
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-success mt-2"
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

            {/* Skills Input */}
            <div className="mt-4">
              <label htmlFor="skillInput" className="block mb-1 font-semibold">
                Skills
              </label>
              <div className="flex gap-2">
                <input
                  id="skillInput"
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Enter a skill"
                  className="input flex-grow"
                  disabled={skills.length >= 15}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="btn btn-soft btn-accent"
                  disabled={!skillInput.trim() || skills.length >= 15}
                >
                  Add
                </button>
              </div>
              <small className="text-gray-500">
                {skills.length} skill{skills.length !== 1 ? "s" : ""} added
              </small>

              {/* Skill tags list */}
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="badge badge-outline badge-accent cursor-pointer"
                    onClick={() => removeSkill(idx)}
                    title="Click to remove skill"
                  >
                    {skill} &times;
                  </div>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="input validator mt-3">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  value={email}
                  placeholder="mail@gmail.com"
                  onChange={(e) => setEmailId(e.target.value)}
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>

              {/* Password */}
              <label className="input validator mt-3">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </div>

            {/* Toast messages */}
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
                Sign Up
              </button>
            </div>

            {/* Log in link */}
            <p className="text-sm text-gray-100 mt-4">
              Already a user on DevConnect?{" "}
              <Link
                to="/login"
                className="text-[#00d3bb] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                aria-label="Log in to your DevConnect account"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
