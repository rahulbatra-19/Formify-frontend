import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Questions, Loader } from "../components";
import { useLocation } from "react-router-dom";
import { Dustinsvg, Addsvg } from "../assets";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
export default function FormCreate() {
  const { userData: user, status } = useSelector((state) => state.auth);
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [editQuestions, setEditQuestions] = useState(false);
  const [formdata, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const name = queryParams.get("name");
  const [questions, setQuestions] = useState([
    {
      form: id,
      image: "",
      question: "",
      type: "",
      clozeOptions: [],
      clozeAnswer: "",
      categorizeQuestionsCategories: [""],
      categorizeQuestionsitems: [""],
      categorizeQuestionsAnswer: {},
      ComprehensionSubQuestions: [
        {
          question: "",
          options: [""],
          answer: "",
        },
      ],
      points: null,
    },
  ]);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`form/${id}`)
      .then(({ data }) => {
        setFormData(data);
        if (data.questions.length > 0) {
          setEditQuestions(true);
          setQuestions(data.questions);
        }
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);
  if (loading) return <Loader />;

  if (!status) {
    navigate("/user");
  }

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (source.index === destination.index) return;

    if (type === "group") {
      const reorderedQuestions = [...questions];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedQuestion] = reorderedQuestions.splice(storeSourceIndex, 1);
      reorderedQuestions.splice(storeDestinatonIndex, 0, removedQuestion);
      setQuestions(reorderedQuestions);
    }
  };

  const saveForm = async () => {
    try {
      await axios.post("/questions/edit", questions);
      navigate("/user");
    } catch (error) {
      console.error("Error in saving the data", error);
    }
  };
  return (
    <div className="px-20 py-10">
      <p className="text-header font-semibold text-2xl border-b-2 border-header flex justify-between">
        {name}
        {editQuestions ? (
          <button
            onClick={saveForm}
            className=" mb-3 py-1 px-5 text-lg text-blue_light  bg-header rounded-xl shadow-lg"
          >
            Save Edit
          </button>
        ) : (
          <button
            onClick={saveForm}
            className=" mb-3 py-1 px-5 text-lg text-blue_light  bg-header rounded-xl shadow-lg"
          >
            Save
          </button>
        )}
      </p>
      {formdata?.image !== "" && (
        <img
          src={formdata.image}
          className="shadow-md w-3/5 mt-6 mx-auto"
          style={{ height: "40vh" }}
        />
      )}
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="QuestionsMain" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <Draggable
                  draggableId={"MainQuestion" + index}
                  key={"MainQuestion" + index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <Questions
                        formId={id}
                        formdata={formdata}
                        key={"question" + index}
                        index={index}
                        ques={question}
                        questions={questions}
                        setQuestions={setQuestions}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className=" flex gap-5 justify-center mt-5 mb-10">
        <button
          className="flex bg-header px-2 py-2 text-white rounded-xl items-center"
          onClick={() => {
            setQuestions([
              ...questions,
              {
                form: id,
                image: "",
                question: "",
                type: "",
                clozeOptions: [],
                clozeAnswer: "",
                categorizeQuestionsCategories: [""],
                categorizeQuestionsitems: [""],
                categorizeQuestionsAnswer: {},
                ComprehensionSubQuestions: [
                  {
                    question: "",
                    options: [""],
                    answer: "",
                  },
                ],
                points: null,
              },
            ]);
          }}
        >
          Add Question &nbsp; <Addsvg />
        </button>
      </div>
    </div>
  );
}
