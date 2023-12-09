import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { userData: user, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      navigate("/user");
    }
  }, [status, navigate]);

  const SignUp = async () => {
    window.open(
      `${import.meta.env.VITE_API_BASE_URL}users/auth/google`,
      "_self"
    );
  };
  return (
    <div className="flex">
      <img
        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-4/6"
        style={{ height: "91vh", filter: "blur(3px)" }}
      />
      <div className="bg-white w-2/6 flex justify-center pt-80 ">
        <div className="bg-body h-fit text-center p-5 rounded-2xl">
          <div className="flex justify-center pb-2 mb-2 border-b-2 border-gray-600">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/gender-neutral-user.png"
              alt="gender-neutral-user"
            />
          </div>
          <button
            onClick={SignUp}
            className="flex bg-white items-center mt-5 mb-5 px-3 rounded-xl"
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
            />
            <span className="text-xl p-2 rounded-lg">Sign In With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
