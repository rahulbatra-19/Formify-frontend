import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { NewForm, Loader, FormsBuilt, FormsFilled } from "../components";
import axios from "axios";

function IndexPage() {
  const { userData: user, status } = useSelector((state) => state.auth);
  const [createNewForm, setCreateNewForm] = useState(false);
  const [userForm, setUserForm] = useState([]);
  const [formsFilled, setFormsFilled] = useState([]);
  const [formsBuilt, setFormsBuilt] = useState([]);
  const [showAllForms, setShowAllForms] = useState(true);
  const [showFormsBuilt, setShowFormsBuilt] = useState(false);
  const [showFormsFilled, setShowFormsFilled] = useState(false);

  const [allForms, setAllForms] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllForms = async () => {
      setLoading(true);
      const { data } = await axios.get("/form/get/all");
      setAllForms(data);
      setLoading(false);
    };
    const getForms = async () => {
      const { data } = await axios.get("/users/forms");
      const { formsbuilt, result } = data;
      setUserForm(formsbuilt);
      setFormsBuilt(formsbuilt);
      const formfill = [];
      for (let i of result) {
        formfill.push(i.form);
      }
      setFormsFilled(result);
      setLoading(false);
    };
    getAllForms();
    getForms();
    if (!status) {
      navigate("/");
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex ">
      <div
        className="bg-header border-t border-r-2 p-4"
        style={{ width: "30vh", minHeight: "91vh" }}
      >
        <button
          className="block text-header font-bold bg-blue_light p-2 rounded-xl border-4 w-11/12 mt-6 cursor-pointer"
          onClick={() => {
            setShowFormsBuilt(false);
            setShowFormsFilled(false);
            setShowAllForms(true);
          }}
        >
          All Forms
        </button>
        <button
          className="block text-header font-bold bg-blue_light p-2 rounded-xl border-4 w-11/12 mt-6 cursor-pointer"
          onClick={() => {
            setShowFormsFilled(false);
            setShowAllForms(false);
            setShowFormsBuilt(true);
          }}
        >
          Your Forms
        </button>
        <button
          className="block text-header font-bold bg-blue_light p-2 rounded-xl w-11/12  border-4  mt-6 cursor-pointer"
          onClick={() => {
            setShowAllForms(false);
            setShowFormsBuilt(false);
            setShowFormsFilled(true);
          }}
        >
          Your Submissions
        </button>
      </div>
      <div className="w-10/12 p-10">
        <h1 className=" text-header font-bold text-xl">Hi,{user?.name}</h1>
        <p className="flex justify-end">
          <button
            onClick={() => setCreateNewForm(true)}
            className="bg-header p-3 rounded-2xl shadow-lg text-body text-lg font-bold"
          >
            New Form
          </button>
        </p>
        <div className="mt-10 w-4/5 m-auto text-center">
          {createNewForm && <NewForm setCreateNewForm={setCreateNewForm} />}
        </div>
        {allForms.length == 0 && (
          <div className="bg-gradient-to-b mt-10 from-blue-500 to-purple-700 p-8 rounded-md shadow-lg text-white">
            <h1 className="text-4xl font-bold mb-4">🌟 Welcome to Formify!</h1>
            <p className="text-lg mb-6">
              Build stunning forms effortlessly, with a user-friendly interface
              and a range of powerful features. At Formify, we believe in making
              the form-building experience not just functional but truly
              delightful.
            </p>
            <div className="bg-white bg-opacity-10 p-6 rounded-md">
              <h2 className="text-2xl font-bold mb-4">✨ Key Features:</h2>
              <ul className="list-disc ml-6">
                <li>
                  Beautiful UI: Craft forms with an intuitive and visually
                  appealing interface.
                </li>
                <li>
                  Versatility: Explore a variety of features for tailored and
                  dynamic forms.
                </li>
              </ul>
            </div>
            <p className="mt-6">
              🚀 <strong>What Sets Us Apart?</strong> Formify is not just a form
              builder; it's your creative playground for shaping data collection
              into an art. Explore the endless possibilities of form
              customization and user interaction.
            </p>
            <p className="mt-6">
              Ready to transform your forms into masterpieces? Let's get
              started!
            </p>
            <p className="mt-6">Happy Formifying! 🎉</p>
          </div>
        )}
        {showAllForms && allForms.length > 0 && (
          <div className="p-4 text-center bg-body mt-4 rounded-xl w-3/5 m-auto ">
            <p className=" text-header font-semibold text-2xl">All Forms</p>

            {allForms.map((form, index) => (
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
        )}
        {showFormsBuilt && <FormsBuilt formsBuilt={formsBuilt} />}
        {showFormsFilled && <FormsFilled formsFilled={formsFilled} />}
      </div>
    </div>
  );
}

export default IndexPage;
