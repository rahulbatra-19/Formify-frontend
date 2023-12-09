import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import logo from "/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
  const [redirect, setredirect] = useState(false);
  const { userData: user } = useSelector((state) => state.auth);
  // console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const SignUp = async () => {
    window.open("http://localhost:3030/users/auth/google", "_self");
  };
  const logOut = async () => {
    try {
      await axios.get("users/auth/logout");
      dispatch(logout());
      alert("Sucessfully Loged Out!");
      setredirect(true);
    } catch (err) {
      alert("Some Error Occured while logging out!");
      console.error(err);
    }
  };
  if (redirect) {
    navigate("/");
  }
  return (
    <header className="flex px-4 justify-between py-3 bg-header">
      <Link to={"/user"} className="flex items-center gap-1 text-primary">
        <img src={logo} className="w-26 h-16" />
      </Link>
      {user && (
        <div className="flex items-center">
          <button
            onClick={logOut}
            className="rounded-full p-3 h-11 items-center mr-3 bg-blue_light"
          >
            <img
              width="18"
              height="18"
              src="https://img.icons8.com/ios-filled/50/exit.png"
              alt="exit"
            />
          </button>
          <Link
            to={user ? "/account" : "/login"}
            className="flex items-center "
          >
            <div className="bg-gray-300 text-white rounded-full border border-gray-500 overflow-hidden ml-2">
              <img src={user.avatar} alt="" className="h-12 w-12" />
            </div>
          </Link>
        </div>
      )}
    </header>
  );
}
