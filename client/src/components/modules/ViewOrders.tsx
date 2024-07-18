import React, { useState } from "react";
import OrderItems from "./OrderItems";

const ViewOrders: React.FC = () => {
  const [BillID, setBillID] = useState("");
  const [isOrderItemsOpen, setIsOrderItemsOpen] = useState(false);
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

  const handleCloseOrderItems = () => {
    setIsOrderItemsOpen(false);
    // window.location.reload();
  };

  const handleViewClick = () => {
    setIsOrderItemsOpen(true);
  };
  return (
    <div className="overflow-x-auto flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-full">
        <h1 className="mt-6 text-xl font-bold text-gray-900 text-center my-10 sm:text-3xl md:text-4xl">
          Order list
        </h1>
        <table className="min-w-fit min-h-full p-5 m-8 rounded-lg divide-y-2 overflow-hidden shadow-xl transform transition-all divide-gray-300 bg-white text-sm items-start">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="inset-y-0 start-0 bg-white px-4 py-2">
                <label htmlFor="SelectAll" className="sr-only">
                  Select All
                </label>
              </th>
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900"></th>
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900">
                Open Date
              </th>
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900">
                Close Date
              </th>
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900">
                Status
              </th>
              <th className="px-8 py-4"></th>
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
              <td className="whitespace-nowrap px-8 py-3 font-medium text-gray-900">
                1
              </td>
              <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                24/05/1996
              </td>
              <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                complete
              </td>
              <td className="whitespace-nowrap px-8 py-3">
                <button
                  className="inline-block rounded bg-indigo-600 px-8 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                  onClick={handleViewClick}
                >
                  View
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2">
                <label className="sr-only" htmlFor="Row1">
                  Row 2
                </label>

                <input
                  className="size-4 rounded border-gray-300 bg-white"
                  type="checkbox"
                  id="Row2"
                  // checked={selectedRows.includes("Row1")}
                  onChange={() => handleCheckboxChange("Row2")}
                />
              </td>
              <td className="whitespace-nowrap px-8 py-3 font-medium text-gray-900">
                2
              </td>
              <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                04/11/1980
              </td>
              <td className="whitespace-nowrap px-8 py-3 text-gray-700">No</td>
              <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                Pending
              </td>
              <td className="whitespace-nowrap px-8 py-3">
                <button
                  className="inline-block rounded bg-indigo-600 px-8 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                  onClick={handleViewClick}
                >
                  View
                </button>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2">
                <label className="sr-only" htmlFor="Row1">
                  Row 3
                </label>

                <input
                  className="size-4 rounded border-gray-300 bg-white"
                  type="checkbox"
                  id="Row3"
                  // checked={selectedRows.includes("Row1")}
                  onChange={() => handleCheckboxChange("Row3")}
                />
              </td>
              <td className="whitespace-nowrap px-8 py-3 font-medium text-gray-900">
                3
              </td>
              <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                24/05/2024
              </td>
              <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                24/06/2024
              </td>
              <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                Complete
              </td>
              <td className="whitespace-nowrap px-8 py-3">
                <button
                  className="inline-block rounded bg-indigo-600 px-8 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                  onClick={handleViewClick}
                >
                  View
                </button>
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
      <OrderItems
        isOpen={isOrderItemsOpen}
        onClose={handleCloseOrderItems}
        Bill_ID={BillID}
      />
    </div>
  );
};

export default ViewOrders;
