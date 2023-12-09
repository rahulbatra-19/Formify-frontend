import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ClozeFromType,
  ComprehensionFromType,
  CategorizedFormType,
} from "../components/Form";
import { useSelector } from "react-redux";
import { Loader } from "../components";
export default function Form() {
  const { userData: user, status } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`form/${id}`)
      .then(({ data }) => {
        setQuestions(data.questions);
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);
  if (loading) return <Loader />;

  const submitForm = async () => {
    let TotalPoints = 0;
    let ObtaintedPoints = 0;
    for (let ques of questions) {
      TotalPoints += ques.points;
    }
    for (let point of points) {
      ObtaintedPoints += point;
    }
    await axios.post(`/form/submit/${id}`, {
      ObtaintedPoints,
      TotalPoints,
      form: id,
    });
    navigate("/user");
  };
  return (
    <div className="px-20 py-10">
      <p className="text-header font-semibold text-2xl border-b-2 border-header flex justify-between">
        {formData.title}
        <button
          onClick={submitForm}
          className=" mb-3 py-1 px-5 text-lg text-blue_light  bg-header rounded-xl shadow-lg"
        >
          Submit Form
        </button>
      </p>
      <div className="px-10 py-5 flex flex-col gap-10">
        {questions.map((question, index) => {
          if (question?.type === "Cloze") {
            return (
              <ClozeFromType
                question={question}
                index={index}
                key={index}
                setPoints={setPoints}
                points={points}
              />
            );
          } else if (question?.type === "Comprehension") {
            return (
              <ComprehensionFromType
                question={question}
                index={index}
                key={index}
                setPoints={setPoints}
                points={points}
              />
            );
          } else {
            return (
              <CategorizedFormType
                question={question}
                index={index}
                key={index}
                setPoints={setPoints}
                points={points}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
