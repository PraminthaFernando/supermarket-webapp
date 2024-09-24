import React, { useEffect, useState } from "react";
import OrderItems from "./OrderItems";
import { format } from "date-fns";
import GoBack from "./Goback";
import ErrorModal from "./ErrorModel";
import axios from "axios";

const ViewOrders: React.FC = () => {
  const [BillID, setBillID] = useState("");
  const [status, setStatus] = useState("");
  const [isOrderItemsOpen, setIsOrderItemsOpen] = useState(false);
  const [State, setState] = useState(false);
  const [selectedRows] = useState<string[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModelOpen, setIsErrorModelOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllplaces = async () => {
      try {
        const res = await axios.get("http://localhost:8000/orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllplaces();
  }, []);

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
    window.location.reload();
  };

  const handleViewClick = (id: any, status: string) => {
    setStatus(status);
    setBillID(id);
    setIsOrderItemsOpen(true);
  };

  const handleRemoveClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        selectedRows.forEach(async (order) => {
          try {
            await axios.delete("http://localhost:8000/orders/delete", {
              params: { id: order },
            });
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        setError("අයිතම මකා දැමීමේදී දෝෂයක් ඇති විය");
        setIsErrorModelOpen(true);
      }
      setIsLoading(false);
      window.location.reload();
    }, 1400);
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
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900">
                ID
              </th>
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
            {orders.map((order) => (
              <tr key={order.ID}>
                <td className="px-4 py-2">
                  <label className="sr-only" htmlFor="Row1">
                    Row 1
                  </label>

                  <input
                    className={`${
                      order.Status === "complete"
                        ? "hidden"
                        : "size-4 rounded border-gray-300 bg-white"
                    }`}
                    type="checkbox"
                    id={order.ID}
                    onChange={() => handleCheckboxChange(order.ID)}
                  />
                </td>
                <td className="whitespace-nowrap px-8 py-3 font-medium text-gray-900">
                  {order.ID}
                </td>
                <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                  {format(new Date(order.Open_Date), "yyyy-MM-dd")}
                </td>
                <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                  {order.Close_Date
                    ? format(new Date(order.Close_Date), "yyyy-MM-dd")
                    : ""}
                </td>
                <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                  {order.Status}
                </td>
                <td className="whitespace-nowrap px-8 py-3">
                  <button
                    className="inline-block rounded bg-indigo-600 px-8 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                    onClick={() => handleViewClick(order.Bill_ID, order.Status)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
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
            onClick={handleRemoveClick}
            aria-disabled={isLoading}
          >
            {isLoading ? "Removing..." : "Remove"}
          </button>

          <button
            type="button"
            className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        <GoBack className="mt-4" />
      </div>
      <OrderItems
        isOpen={isOrderItemsOpen}
        onClose={handleCloseOrderItems}
        Bill_ID={BillID}
        view={status}
      />
      <ErrorModal
        isOpen={isErrorModelOpen}
        onClose={() => setIsErrorModelOpen(false)}
        errorMessage={error}
      />
    </div>
  );
};

export default ViewOrders;
