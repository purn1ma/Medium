import React from "react";

const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg">
        <div className=" text-3xl font-bold ">
          "The customer service I recieved was exceptional. The support team
          went above and beyond to address my concerns"
        </div>
      
      <div className="max-w-md mt-6 text-xl font-semibold">Jason Statham</div>
      <div className="max-w-md text-left text-sm font-light text-slate-500">
        CEO | Acme corp
      </div>
      </div>
      </div>
    </div>
  );
};

export default Quote;
