import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ClozeQuestion({
  clozeOptions,
  clozeAnswer,
  setQuestions,
  questions,
  Questionindex,
  question,
}) {
  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (source.index === destination.index) return;

    if (type === "group") {
      const reorderedOptions = [...clozeOptions];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedOption] = reorderedOptions.splice(storeSourceIndex, 1);
      reorderedOptions.splice(storeDestinatonIndex, 0, removedOption);
      const newQues = [...questions];
      newQues[Questionindex].clozeOptions = reorderedOptions;
      setQuestions(newQues);
    }
  };

  const handleButtonClick = () => {
    const text = window.getSelection().toString();
    if (!clozeOptions.includes(text)) {
      const replace = "_".repeat(text.length);
      const newSentence = question.replace(text, replace);
      const newQues = [...questions];
      newQues[Questionindex].question = newSentence;
      newQues[Questionindex].clozeOptions.push(text);
      setQuestions(newQues);
    }
  };

  return (
    <div className={"mt-10 border-t-2 py-5"}>
      <div>
        <p>Sentence:</p>
        <input
          type="text"
          placeholder="Underline the words here to convert them into black"
          value={clozeAnswer}
          className=" shadow-sm border-2 p-2 w-4/5 "
          onChange={(e) => {
            const newQues = [...questions];
            newQues[Questionindex].clozeOptions = [];
            newQues[Questionindex].clozeAnswer = e.target.value;
            newQues[Questionindex].question = e.target.value;
            setQuestions(newQues);
          }}
        />
        <button onClick={handleButtonClick} className="border-2 ml-2 bg-white">
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-filled/50/underline.png"
            alt="underline"
          />
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="OptionForCloze" type="group">
          {(provided) => (
            <div
              className="p-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {clozeOptions.map((option, index) => (
                <Draggable
                  draggableId={option + index}
                  key={option + index}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="flex items-center"
                    >
                      <p className="border-2 shadow-sm w-30 mt-4 p-2 w-40">
                        {option}
                      </p>
                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-4"
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
    </div>
  );
}
