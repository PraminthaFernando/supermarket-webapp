import React, { useState } from "react";
import ErrorModal from "./ErrorModel";
import EditUser from "./EditUser";

const REusers: React.FC = () => {
  const [Users, setUsers] = useState(["Sunil", "Ashen", "Yapa"]);
  const [User, setUser] = useState("");
  const [error, setError] = useState("");
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleCloseEditUser = () => {
    setIsEditUserOpen(false);
    window.location.reload();
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleEditClick = () => {
    if (User != "") {
      setIsEditUserOpen(true);
    } else {
      setError("Please select user");
      setIsErrorModalOpen(true);
    }
  };

  return (
    <section className="bg-white rounded-2xl">
      <div className="lg:grid">
        <main className="flex items-center justify-center px-8 py-10 sm:px-10 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-2xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Edit or Remove
            </h1>
            <h2 className="mt-6 text-xl text-gray-900 sm:text-2xl md:text-3xl">
              User
            </h2>

            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6 shadow-xl p-3 rounded-xl"
            >
              <div className="col-span-6">
                <label
                  htmlFor="HeadlineAct"
                  className="block text-left text-sm font-medium text-gray-900"
                >
                  {" "}
                  User{" "}
                </label>

                <select
                  name="HeadlineAct"
                  id="HeadlineAct"
                  required
                  className="mt-1.5 w-full rounded-lg bg-gray-200 border-2 h-8 border-gray-300 text-gray-700 sm:text-sm"
                  onChange={(e) => setUser(e.target.value)}
                  autoFocus
                >
                  <option value="">select user</option>
                  {Users.map((User) => (
                    <option value={User}>{User}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-row col-span-6 items-center justify-end gap-2 bg-white p-3">
                <button
                  type="button"
                  className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                >
                  Remove
                </button>

                <button
                  type="button"
                  className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
            </form>
            <button
              type="button"
              className="block w-fit my-3 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
            >
              cancel
            </button>
          </div>
        </main>
      </div>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={error}
      />
      <EditUser
        isOpen={isEditUserOpen}
        onClose={handleCloseEditUser}
        User_ID={User}
      />
    </section>
  );
};

export default REusers;
