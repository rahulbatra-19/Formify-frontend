import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ClozeFromType({
  question,
  index,
  setClozeAnswer,
  points,
  setPoints,
}) {
  const { clozeAnswer } = question;
  const [clozeOptions, setClozeOptions] = useState([]);
  const [sentence, setSentence] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const ques = question.question.split("_");
    let past = "a";
    let newQues = [];
    for (let i of ques) {
      if (i === "") {
        if (past !== "") {
          newQues.push(i);
          past = "";
        }
      } else {
        past = i;
        newQues.push(i);
      }
    }
    setClozeOptions(question.clozeOptions);
    setSentence(newQues);
  }, [refresh]);
  useEffect(() => {
    const ans = sentence.join("");
    const newPoints = [...points];
    if (ans === clozeAnswer) {
      newPoints[index] = question.points;
    } else {
      newPoints[index] = 0;
    }
    setPoints(newPoints);
  }, [sentence]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId == "OPTIONS") return;
    const { source, destination, draggableId, type } = result;
    if (source.droppableId === destination.droppableId) return;
    if (destination.droppableId !== "OPTIONS") {
      const newSentence = [...sentence];
      newSentence[destination.droppableId] = draggableId;
      const newOptions = [...clozeOptions];
      setClozeOptions(newOptions.filter((ele) => ele !== draggableId));
      setSentence(newSentence);
    }
  };
  return (
    <div className="bg-white w-3/4 p-5 rounded-xl shadow-lg font-sans">
      <p className="text-xl text-gray-600 mb-3 border-b-2 p-1">
        Question {index + 1}
      </p>
      <div className="flex justify-around">
        {question.image !== "" && (
          <img src={question.image} className="w-80 h-80 mx-4 mb-4 shadow-md" />
        )}
        <div className="text-gray-500">
          Points
          <p className="border-2 py-2 px-6  rounded-lg mr-40 text-gray-500">
            {question.points}
          </p>
        </div>
        <button
          className="h-20"
          onClick={() => {
            setRefresh(!refresh);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="OPTIONS" type="OPTION">
          {(provided) => (
            <div
              className="flex gap-5 ml-10 mt-10 mb-10"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {clozeOptions.map((item, index) => (
                <Draggable
                  key={item}
                  draggableId={item}
                  index={index}
                  type="OPTION"
                >
                  {(provided) => (
                    <div
                      className="text-white bg-pink-500 font-semibold text-xl p-3 rounded-2xl"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="flex text-2xl font-sans font-bold">
          {sentence.map((letter, index) => (
            <React.Fragment key={"index" + index}>
              {letter !== "" ? (
                <>{letter}</>
              ) : (
                <Droppable
                  key={index + "letter"}
                  droppableId={letter + index}
                  type="OPTION"
                >
                  {(provided) => (
                    <div
                      className="bg-blue-400 mx-3 text-xl p-2 rounded-xl w-32 h-16"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Draggable
                        key={"letter" + index}
                        draggableId={"word" + index}
                        index={index}
                        type="ITEM"
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {letter}
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </React.Fragment>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
