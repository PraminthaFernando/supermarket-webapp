import React from "react";

interface recordBoardprops {
  isOpen: boolean;
}

const RecordBoard: React.FC<recordBoardprops> = ({ isOpen }) => {
  return (
    <div
      className={`my-4 flex flex-col mx-auto lg:max-w-4xl md:max-w-2xl sm:max-w-sm flex-wrap justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <a
        href="/ViewRecords"
        className="group relative block overflow-hidden bg-black rounded-2xl my-2 mx-2 w-full"
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
          className="h-full absolute inset-0 w-full object-cover opacity-75 transition-opacity duration-500 group-hover:opacity-50 sm:h-full"
        />

        <div className="relative p-4 sm:p-6 lg:p-8 w-full">
          <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
            Edit
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">
            View Records
          </p>
        </div>
      </a>

      <a
        href="/CreateRecord"
        className="group relative block overflow-hidden bg-black rounded-2xl my-2 mx-2 w-full"
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
          className="h-full absolute inset-0 w-full object-cover opacity-75 transition-opacity duration-500 group-hover:opacity-50 sm:h-full"
        />

        <div className="relative p-4 sm:p-6 lg:p-8 w-full">
          <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
            Create
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">New Record</p>
        </div>
      </a>
    </div>
  );
};

export default RecordBoard;
