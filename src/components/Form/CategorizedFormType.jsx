import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const CategorizedFormType = ({ question, index, points, setPoints }) => {
  const {
    categorizeQuestionsitems,
    categorizeQuestionsAnswer,
    categorizeQuestionsCategories,
  } = question;
  const colors = [
    "#FF5733", // Orange
    "#33FF57", // Green
    "#5733FF", // Purple
    "#FF3366", // Pink
    "#33FFFF", // Cyan
    "#FFD700", // Gold
    "#8A2BE2", // Blue Violet
    "#FF6347", // Tomato
    "#00CED1", // Dark Turquoise
    "#FF8C00", // Dark Orange
  ];

  const [categories, setCategories] = useState([]);
  //   const [answerArray, setAnswerArray] = useState([]);
  const [items, setItems] = useState(categorizeQuestionsitems);
  const pointsforeachitem = question.points / categorizeQuestionsitems.length;

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId == "ITEMS") return;

    const { source, destination, draggableId, type } = result;
    if (source.droppableId === destination.droppableId) return;

    if (type === "CATEGORY") {
      return;
    }

    const updatedCategories = categories.map((category) => {
      if (category.name === source.droppableId) {
        return {
          ...category,
          items: category.items.filter((itemId) => itemId !== draggableId),
        };
      }
      if (category.name === destination.droppableId) {
        return {
          ...category,
          items: [...category.items, draggableId],
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    // Remove the dragged item from the global items array
    setItems((prevItems) => prevItems.filter((item) => item !== draggableId));
  };
  useEffect(() => {
    for (let category of categorizeQuestionsCategories) {
      setCategories((categories) => [
        ...categories,
        {
          name: category,
          items: [],
        },
      ]);
    }
  }, []);
  useEffect(() => {
    let point = 0;
    for (let item of categorizeQuestionsitems) {
      const indexofcategory = categorizeQuestionsCategories.indexOf(
        categorizeQuestionsAnswer[item]
      );
      if (indexofcategory >= 0) {
        const category = categories[indexofcategory];
        if (category?.items.length > 0 && category?.items.includes(item)) {
          point += pointsforeachitem;
        }
      }
    }
    const newPoints = [...points];
    newPoints[index] = point;
    setPoints(newPoints);
  }, [categories]);

  return (
    <div className="bg-white w-3/4 p-5 rounded-xl shadow-lg font-sans">
      <p className="text-xl text-gray-600 mb-3 border-b-2">
        Question {index + 1}
      </p>
      <p className="text-2xl font-medium">{question.question}</p>
      <div className="flex justify-end items-center">
        <div className="text-gray-500">
          Points
          <p className="border-2 py-2 px-6  rounded-lg mr-40 text-gray-500">
            {question.points}
          </p>
        </div>
      </div>
      {question.image !== "" && (
        <img src={question.image} className="w-80 h-80 mx-4 mb-4 shadow-md" />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ITEMS" type="ITEM">
          {(provided) => (
            <div
              className="flex gap-5 ml-10 mt-10"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item}
                  draggableId={item}
                  index={index}
                  type="ITEM"
                >
                  {(provided) => (
                    <div
                      className="text-white bg-red-500  font-semibold text-xl p-3 rounded-2xl"
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
        <div className="flex flex-wrap gap-5 justify-around">
          {categories.map((category, index) => (
            <Droppable
              key={category.name}
              droppableId={category.name}
              type="ITEM"
            >
              {(provided) => (
                <div
                  className="bg-pink-400 w-1/4  text-xl p-2 mt-10 rounded-xl"
                  style={{
                    backgroundColor: colors[index],
                    minHeight: 250,
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="text-center border-b-2 text-white font-semibold text-2xl">
                    {category.name}
                  </h3>
                  {category.items.map((itemId, index) => (
                    <Draggable
                      key={itemId}
                      draggableId={itemId}
                      index={index}
                      type="ITEM"
                    >
                      {(provided) => (
                        <div
                          className="text-white border-2 mt-3 rounded-xl text-center shadow-lg text-xl"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {itemId}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default CategorizedFormType;
