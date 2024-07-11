// import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import SelectEmp from "./SelectEmp";
import { useLocation, useNavigate } from "react-router-dom";

const CreateRecord: React.FC = () => {
  const [Payments, setPayments] = useState(["Salary", "Stock", "Other"]);
  const [Pay, setPay] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isSelectEmpOpen, setIsSelectEmpOpen] = useState(false);
  const [State, setState] = useState(false);

  const handleCloseSelectEmp = () => {
    setIsSelectEmpOpen(false);
    window.location.reload();
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Pay === "Salary") {
      setIsSelectEmpOpen(true);
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (Pay === "Salary") {
      setState(false);
    } else if (Pay === "Stock" || Pay === "Other") {
      setState(true);
    } else {
      setState(false);
    }
  });

  return (
    <section className="bg-white rounded-2xl">
      <div className="lg:grid">
        <main className="flex items-center justify-center px-8 py-10 sm:px-10 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Add Payments
            </h1>

            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6 shadow-xl p-3 rounded-xl"
              onSubmit={handleChange}
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="HeadlineAct"
                  className="block text-left text-sm font-medium text-gray-900"
                >
                  {" "}
                  Payment{" "}
                </label>

                <select
                  name="HeadlineAct"
                  id="HeadlineAct"
                  required
                  className="mt-1.5 w-full rounded-lg bg-gray-200 border-2 h-8 border-gray-300 text-gray-700 sm:text-sm"
                  onChange={(e) => setPay(e.target.value)}
                  autoFocus
                >
                  <option value="">select payment</option>
                  {Payments.map((Payment) => (
                    <option value={Payment}>{Payment}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Price"
                  className="block mx-1 text-left text-sm font-medium text-gray-700"
                >
                  Price
                </label>

                <input
                  type="number"
                  id="FirstName"
                  name="price"
                  className="mt-1.5 h-8 border-2 p-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-left mx-1 text-sm font-medium text-gray-700"
                >
                  Date
                </label>

                <div className="relative">
                  <input
                    type="date"
                    id="LastName"
                    value={date}
                    defaultValue={new Date().toISOString().slice(0, 10)} //new Date().toISOString().slice(0, 10)
                    name="last_name"
                    // onChange={(e) => setDate(e.)}
                    className="mt-1 p-1 w-full h-8 border-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm pr-10 cursor-pointer"
                  />
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className={`col-span-6 ${State ? "block" : "hidden"}`}>
                <label
                  htmlFor="OrderNotes"
                  className="block text-left mx-1 text-sm font-medium text-gray-700"
                >
                  Payment notes
                </label>

                <div className="overflow-hidden rounded-lg mt-1.5 border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <textarea
                    id="OrderNotes"
                    className="w-full resize-none bg-white text-black p-1 border-none align-top focus:ring-0 sm:text-sm"
                    rows={4}
                    placeholder="Enter any additional payment notes..."
                  ></textarea>

                  <div className="flex items-center justify-end gap-2 bg-white p-3">
                    <button
                      type="button"
                      className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Confirm
                </button>
              </div>
            </form>
            {/* <button
              type="submit"
              className="block w-full my-3 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
              onClick={handleChange}
            >
              Sign in
            </button> */}
          </div>
        </main>
      </div>
      <SelectEmp
        isOpen={isSelectEmpOpen}
        onClose={handleCloseSelectEmp}
        Date={date}
      />
    </section>
  );
};

export default CreateRecord;
