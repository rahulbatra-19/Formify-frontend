import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { Dustinsvg } from "../assets";


export default function McqQuestion({ index, setMcqs, mcqs, Questionindex }) {
  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (source.index === destination.index) return;

    if (type === "group") {
      const newMcqs = [...mcqs];
      const reorderedOptions = [...mcqs[index].options];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedOption] = reorderedOptions.splice(storeSourceIndex, 1);
      reorderedOptions.splice(storeDestinatonIndex, 0, removedOption);
      newMcqs[index].options = reorderedOptions;
      setMcqs(newMcqs);
    }
  };
  return (
    <div className="mb-4 border-2 p-2 mt-10 w-full">
      <div className="flex items-center">
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
            fill="#121923"
          />
        </svg>
        Question {Questionindex + 1}.{index + 1}
      </div>
      <input
        type="text"
        placeholder="Enter question"
        value={mcqs[index].question}
        className=" shadow-sm border-2 p-2 w-4/5 mb-5 "
        onChange={(e) => {
          const newMcqs = [...mcqs];
          newMcqs[index].question = e.target.value;
          setMcqs(newMcqs);
        }}
      />
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="OptionForMCQs" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {mcqs[index].options.map((option, optionIndex) => (
                <Draggable
                  draggableId={"optionformcq" + optionIndex}
                  key={"optionformcq" + optionIndex}
                  index={optionIndex}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="flex items-center mb-4"
                    >
                      <input
                        type="radio"
                        id={option}
                        onChange={(e) => {
                          const newMcqs = [...mcqs];
                          newMcqs[index].answer = e.target.value;
                          setMcqs(newMcqs);
                        }}
                        className="mx-5"
                        name={"ques" + index}
                        value={option}
                        checked={option === mcqs[index].answer}
                      />
                      <label>
                        <input
                          htmlFor={option}
                          type="text"
                          placeholder="Enter Option"
                          value={option}
                          className=" shadow-sm border-2 p-2 w-50 "
                          onChange={(e) => {
                            const newMcqs = [...mcqs];
                            const newOptions = newMcqs[index].options.map(
                              (prevOption, i) =>
                                i === optionIndex ? e.target.value : prevOption
                            );
                            newMcqs[index].options = newOptions;
                            setMcqs(newMcqs);
                          }}
                        />
                      </label>
                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className=""
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
                          fill="#121923"
                        />
                      </svg>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        className="text-white bg-header h-6 w-6 ml-5 flex justify-center   rounded-xl"
        onClick={() => {
          const newMcqs = [...mcqs];
          newMcqs[index].options.push("");
          setMcqs(newMcqs);
        }}
      >
        +
      </button>
    </div>
  );
}
