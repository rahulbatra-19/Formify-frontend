import React, { useState, useEffect, useRef } from "react";
import { Imagesvg } from "../assets";
import axios from "axios";
import {
  ClozeQuestion,
  ComprehensionQuestion,
  CategoryQuestion,
} from "./index";

export default function Questions({ ques, setQuestions, questions, index }) {
  const textAreaRef = useRef(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [ques.question]);

  function uploadPhoto(e) {
    const file = e.target.files[0];
    // Get the first selected file
    const data = new FormData();
    data.append("photo", file);
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data: filename } = response;
        const newQuestions = [...questions];
        newQuestions[index].image = filename;
        setQuestions(newQuestions);
      });
  }
  return (
    <div className={"p-10 mt-10"}>
      <div className="flex">
        <div className="bg-white border-1 shadow-md border-header w-4/5 p-4">
          <div className="flex  justify-between w-full ">
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
              <p className="text-header">Question {index + 1}</p>
            </div>
            <div className="">
              <select
                value={ques.type}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].type = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="border-2"
              >
                <option value="">Question type</option>
                <option value="Categorize">Categorize</option>
                <option value="Cloze">Cloze</option>
                <option value="Comprehension">Comprehension</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
            {ques.type === "Comprehension" ? (
              <textarea
                className="p-1 w-3/5 border-2  active:outline-none focus:outline-none rounded"
                placeholder="Enter Question"
                value={ques.question}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].question = e.target.value;
                  setQuestions(newQuestions);
                }}
                rows="2"
                ref={textAreaRef}
              ></textarea>
            ) : (
              <input
                type="text"
                placeholder="Enter your Question text"
                className="mt-5 p-2 shadow-sm border-2 w-3/5"
                value={ques.question}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].question = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
            )}
            <label htmlFor="image" className="ml-4 mt-5">
              <Imagesvg />
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={uploadPhoto}
            />
            <input
              type="Number"
              placeholder="Points"
              className="mt-5 p-2 shadow-sm border-2 ml-4 w-24"
              value={ques.points}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].points = parseInt(e.target.value, 10);
                setQuestions(newQuestions);
              }}
            />
          </div>
          <div>
            {ques.image.length > 0 && <img src={ques.image} className=" mt-10 w-80 h-80 m-5 shadow-xl" />}
          </div>
          {ques.type !== "" && (
            <div>
              {ques.type === "Categorize" && (
                <CategoryQuestion
                  categorizeQuestionsCategories={
                    ques.categorizeQuestionsCategories
                  }
                  categorizeQuestionsitems={ques.categorizeQuestionsitems}
                  categorizeQuestionsAnswer={ques.categorizeQuestionsAnswer}
                  setQuestions={setQuestions}
                  Questionindex={index}
                  questions={questions}
                />
              )}
              {ques.type === "Comprehension" && (
                <ComprehensionQuestion
                  ComprehensionSubQuestions={ques.ComprehensionSubQuestions}
                  setQuestions={setQuestions}
                  questions={questions}
                  Questionindex={index}
                />
              )}
              {ques.type === "Cloze" && (
                <ClozeQuestion
                  clozeOptions={ques.clozeOptions}
                  clozeAnswer={ques.clozeAnswer}
                  setQuestions={setQuestions}
                  questions={questions}
                  Questionindex={index}
                  question={ques.question}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
