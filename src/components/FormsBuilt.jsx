import React from "react";
import { useNavigate } from "react-router-dom";

export default function FormsBuilt({ formsBuilt }) {
  const navigate = useNavigate();
  return (
    <div>
      {formsBuilt.length > 0 ? (
        <div className="p-4 text-center bg-body mt-4 rounded-xl w-3/5 m-auto ">
          <p className=" text-header font-semibold text-2xl">Your Forms</p>

          {formsBuilt.map((form, index) => (
            <div
              key={index + "form"}
              className=" flex rounded-2xl justify-between bg-white mt-3 p-4 text-2xl text-header text-serif shadow-xl"
            >
              <div className="flex">
                {form.image !== "" && (
                  <img src={form.image} className="h-12 w-12 mr-2" />
                )}
                {form.title}
              </div>
              <div className="flex justify-between gap-5">
                <button
                  onClick={() => {
                    navigate(`/newform/${form._id}?name=${form.title}`);
                  }}
                  className="flex justify-center items-center bg-header p-1 rounded-lg text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span className="text-xl">edit</span>
                </button>
                <button
                  className="flex justify-center items-center bg-header p-1 rounded-xl text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${import.meta.env.VITE_FRONTEND_BASE_URL}form/${
                        form._id
                      }?name=${form.title}`
                    );
                  }}
                  title="Copy url"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </button>
                <button
                  className="bg-header p-1 text-white rounded-xl"
                  onClick={() => {
                    navigate(`/form/${form._id}?name=${form.title}`);
                  }}
                  title="Open Form"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-header mt-3 text-2xl text-center font-bold">
          You have not made any form, Tap on New Form and start making.
        </div>
      )}
    </div>
  );
}
