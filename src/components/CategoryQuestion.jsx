import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Dustinsvg } from "../assets";
export default function CategoryQuestion({
  categorizeQuestionsCategories,
  categorizeQuestionsitems,
  categorizeQuestionsAnswer,
  setQuestions,
  questions,
  Questionindex,
}) {
  const handleDragDropCategory = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (source.index === destination.index) return;

    if (type === "group") {
      const reorderedCategories = [...categorizeQuestionsCategories];
      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;
      const [removedCategory] = reorderedCategories.splice(storeSourceIndex, 1);
      reorderedCategories.splice(storeDestinatonIndex, 0, removedCategory);
      const newQuestions = [...questions];
      newQuestions[Questionindex].categorizeQuestionsCategories =
        reorderedCategories;
      setQuestions(newQuestions);
    }
  };
  const handleDragDropItems = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (source.index === destination.index) return;

    if (type === "group") {
      const reorderedItems = [...categorizeQuestionsitems];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedItem] = reorderedItems.splice(storeSourceIndex, 1);
      reorderedItems.splice(storeDestinatonIndex, 0, removedItem);
      const newQuestions = [...questions];
      newQuestions[Questionindex].categorizeQuestionsitems = reorderedItems;
      setQuestions(newQuestions);
    }
  };
  return (
    <div className={"mt-10 border-t-2 py-5"}>
      <div>
        <p>Categories:</p>
        <DragDropContext onDragEnd={handleDragDropCategory}>
          <Droppable droppableId="OptionForCategorizeCategory" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {categorizeQuestionsCategories.map((categoryText, index) => (
                  <Draggable
                    draggableId={"category" + index}
                    key={"category" + index}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="mb-4 flex items-center"
                      >
                        <input
                          type="text"
                          placeholder="Enter Categories"
                          value={categoryText}
                          className=" shadow-sm border-2 p-2 w-50 "
                          onChange={(e) => {
                            const newQues = [...questions];
                            newQues[
                              Questionindex
                            ].categorizeQuestionsCategories[index] =
                              e.target.value;
                            setQuestions(newQues);
                          }}
                        />
                        <svg
                          width="30px"
                          height="30px"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
                            fill="#121923"
                          />
                        </svg>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const newQues = [...questions];
                            newQues[
                              Questionindex
                            ].categorizeQuestionsCategories.splice(index, 1);
                            setQuestions(newQues);
                          }}
                        >
                          <Dustinsvg />
                        </button>
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
          className="text-white bg-header h-6 w-6 flex justify-center items-center  rounded-xl"
          onClick={() => {
            const newQues = [...questions];
            newQues[Questionindex].categorizeQuestionsCategories.push("");
            setQuestions(newQues);
          }}
        >
          +
        </button>
      </div>
      <div className="border-t-2 mt-10 pt-5">
        <p>Items:</p>
        <DragDropContext onDragEnd={handleDragDropItems}>
          <Droppable droppableId="OptionForCategorizeItems" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {categorizeQuestionsitems.map((ItemText, index) => (
                  <Draggable
                    draggableId={"item" + index}
                    key={"item" + index}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="mb-4 flex items-center"
                      >
                        <input
                          type="text"
                          placeholder="Enter Items"
                          value={ItemText}
                          className=" shadow-sm border-2 p-2 w-50 "
                          onChange={(e) => {
                            const newQues = [...questions];
                            newQues[Questionindex].categorizeQuestionsitems[
                              index
                            ] = e.target.value;
                            setQuestions(newQues);
                          }}
                        />
                        <select
                          value={categorizeQuestionsAnswer[ItemText]}
                          onChange={(e) => {
                            const newQues = [...questions];
                            newQues[Questionindex].categorizeQuestionsAnswer[
                              ItemText
                            ] = e.target.value;
                            setQuestions(newQues);
                          }}
                          className="border-2 ml-10 shadow-sm p-2 w-50"
                        >
                          <option value="SelectaCategory">
                            Select a Category
                          </option>
                          {categorizeQuestionsCategories.map(
                            (option, index) => (
                              <option key={option + index} value={option}>
                                {option}
                              </option>
                            )
                          )}
                        </select>
                        <xml version="1.0" encoding="utf-8" />
                        <svg
                          width="30px"
                          height="30px"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
                            fill="#121923"
                          />
                        </svg>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const newQues = [...questions];
                            newQues[
                              Questionindex
                            ].categorizeQuestionsitems.splice(index, 1);
                            const {
                              [categorizeQuestionsitems[index]]: _,
                              ...newAnswer
                            } =
                              newQues[Questionindex].categorizeQuestionsAnswer;

                            newQues[Questionindex].categorizeQuestionsAnswer =
                              newAnswer;
                            setQuestions(newQues);
                          }}
                        >
                          <Dustinsvg />
                        </button>
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
          className="text-white bg-header h-6 w-6 flex justify-center items-center  rounded-xl"
          onClick={() => {
            const newQues = [...questions];
            newQues[Questionindex].categorizeQuestionsitems.push("");
            setQuestions(newQues);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
