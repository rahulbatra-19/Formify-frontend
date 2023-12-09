import React, { useEffect, useState } from "react";
import McqQuestion from "./McqQuestion";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Dustinsvg } from "../assets";

export default function ComprehensionQuestion({
  ComprehensionSubQuestions,
  setQuestions,
  Questionindex,
}) {
  const [mcqs, setMcqs] = useState(ComprehensionSubQuestions);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (source.index === destination.index) return;

    if (type === "group") {
      const reorderedMcqs = [...mcqs];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedMcq] = reorderedMcqs.splice(storeSourceIndex, 1);
      reorderedMcqs.splice(storeDestinatonIndex, 0, removedMcq);
      setMcqs(reorderedMcqs);
      setQuestions((prevQues) => {
        const newQues = [...prevQues];
        newQues[Questionindex].ComprehensionSubQuestions = reorderedMcqs;
        return newQues;
      });
    }
  };
  useEffect(() => {
    setQuestions((prevQues) => {
      const newQues = [...prevQues];
      newQues[Questionindex].ComprehensionSubQuestions = mcqs;
      return newQues;
    });
  }, [mcqs]);

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <Droppable droppableId="OptionForComprehension" type="group">
        {(provided) => (
          <div
            className="p-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {mcqs.map((mcq, index) => (
              <Draggable
                draggableId={"mcqforComprehension" + index}
                key={"mcqforComprehension" + index}
                index={index}
              >
                {(provided) => (
                  <>
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="flex"
                    >
                      <McqQuestion
                        mcqs={mcqs}
                        index={index}
                        setMcqs={setMcqs}
                        Questionindex={Questionindex}
                      />
                      <button
                        className="h-24 mt-10 ml-2"
                        onClick={() => {
                          const newMcqs = [...mcqs];
                          newMcqs.splice(index, 1);
                          setMcqs(newMcqs);
                        }}
                      >
                        <Dustinsvg />
                      </button>
                    </div>
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        className="text-white bg-header p-2 flex justify-center items-center  rounded-xl"
        onClick={() => {
          setMcqs([...mcqs, { question: "", options: [], answer: "" }]);
        }}
      >
        + Add Question
      </button>
    </DragDropContext>
  );
}
