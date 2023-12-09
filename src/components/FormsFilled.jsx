import React from "react";

export default function FormsFilled({ formsFilled }) {
  return (
    <div>
      {formsFilled.length > 0 ? (
        <div className="p-4 text-center bg-body mt-4 w-3/5 m-auto rounded-xl">
          <p className=" text-header font-semibold text-2xl">
            Your Submissions
          </p>
          <div>
            {formsFilled.map((form, index) => (
              <div
                key={index + "form"}
                className=" flex rounded-2xl justify-between bg-white mt-3 p-4 text-2xl text-header text-serif shadow-xl"
              >
                <span>{form.form.title}</span>
                <span>
                  {form.ObtaintedPoints} / {form.TotalPoints}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-header mt-3 text-2xl text-center font-bold">
          You have not submitted any form, got to my form and submit.
        </div>
      )}
    </div>
  );
}
