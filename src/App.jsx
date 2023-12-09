import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import axios from "axios";
import { login, logout } from "./store/authSlice";
import { IndexPage, FormCreate, Form, LandingPage } from "./pages";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("/profile")
      .then(({ data }) => {
        if (data) {
          dispatch(login({ data }));
        } else {
          dispatch(logout());
          navigate("/");
        }
      })
      .catch((err) => {
        dispatch(logout());
        navigate("/");
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/user" element={<IndexPage />} />
        <Route path="/newform/:id" element={<FormCreate />} />
        <Route path="/form/:id" element={<Form />} />
        {/* <Route path="/landingPage" element={<LandingPage />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
