import React, { useState } from "react";
import RootNbodyStyle from "./RootNbodyStyle";

const ViewUsers: React.FC = () => {
  const [State, setState] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    if (selectedRows.includes(id)) {
      selectedRows.splice(selectedRows.indexOf(id), 1);
      handleCkeck();
    } else {
      selectedRows.push(id);
      handleCkeck();
    }
  };
  const handleCancel = () => {
    window.location.reload();
  };
  const handleCkeck = () => {
    if (selectedRows.length === 0) {
      setState(false);
    } else {
      setState(true);
    }
  };
  return (
    <RootNbodyStyle>
      <div className="overflow-x-auto flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-full">
          <h1 className="mt-6 text-xl font-bold text-gray-900 text-center my-10 sm:text-3xl md:text-4xl">
            Users
          </h1>
          <table className="min-w-fit min-h-full p-5 m-8 rounded-lg divide-y-2 overflow-hidden shadow-xl transform transition-all divide-gray-300 bg-white text-sm items-start">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="inset-y-0 start-0 bg-white px-4 py-2">
                  <label htmlFor="SelectAll" className="sr-only">
                    Select All
                  </label>

                  {/* <input
                    type="checkbox"
                    id="SelectAll"
                    // checked={selectedRows.includes("SelectAll")}
                    onChange={() => handleCheckboxChange("SelectAll")}
                    className="size-4 rounded border-gray-300"
                  /> */}
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Contact number
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Join date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Address
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2">
                  <label className="sr-only" htmlFor="Row1">
                    Row 1
                  </label>

                  <input
                    className="size-4 rounded border-gray-300 bg-white"
                    type="checkbox"
                    id="Row1"
                    // checked={selectedRows.includes("Row1")}
                    onChange={() => handleCheckboxChange("Row1")}
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  John Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  0771392174
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  83/23, siyabalapaitiya, makewita
                </td>
              </tr>

              <tr>
                <td className="px-4 py-2">
                  <label className="sr-only" htmlFor="Row3">
                    Row 2
                  </label>

                  <input
                    className="size-4 rounded border-gray-300 bg-white checked:bg-blue-500"
                    type="checkbox"
                    id="Row2"
                    onChange={() => handleCheckboxChange("Row2")}
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Gary Barlow
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  0769764966
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  5/B, Yakkala, Gampaha
                </td>
              </tr>
            </tbody>
          </table>
          <div
            className={`flex flex-row col-span-6 items-center justify-end gap-2 bg-white p-3 ${
              State ? "block" : "hidden"
            }`}
          >
            <button
              type="button"
              className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
            >
              Remove
            </button>

            <button
              type="button"
              className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </RootNbodyStyle>
  );
};

export default ViewUsers;
