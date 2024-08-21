import React, { useEffect, useState } from "react";
import OrderItems from "./OrderItems";
import GoBack from "./Goback";
import axios from "axios";

const ViewBills: React.FC = () => {
  const [BillID, setBillID] = useState("");
  const [isOrderItemsOpen, setIsOrderItemsOpen] = useState(false);
  const [bills, setBills] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllBills = async () => {
      try {
        const res = await axios.get("http://localhost:8000/bills");
        setBills(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBills();
  }, []);

  const handleCloseOrderItems = () => {
    setIsOrderItemsOpen(false);
    // window.location.reload();
  };

  const handleViewClick = (id: any) => {
    setBillID(id);
    setIsOrderItemsOpen(true);
  };
  return (
    <div className="overflow-x-auto flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-full">
        <h1 className="mt-6 text-xl font-bold text-gray-900 text-center my-10 sm:text-3xl md:text-4xl">
          Bill list
        </h1>
        <table className="min-w-fit min-h-full p-5 m-8 rounded-lg divide-y-2 overflow-hidden shadow-xl transform transition-all divide-gray-300 bg-white text-sm items-start">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900">
                ID
              </th>
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900">
                Date
              </th>
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900">
                Total Price
              </th>
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900">
                Customer ID
              </th>
              <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900">
                Status
              </th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {bills.map((bill) => (
              <tr>
                <td className="whitespace-nowrap px-8 py-3 font-medium text-gray-900">
                  {bill.ID}
                </td>
                <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                  {bill.Date}
                </td>
                <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                  {bill.Total_Price}
                </td>
                <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                  {bill.Customer_ID}
                </td>
                <td className="whitespace-nowrap px-8 py-3 text-gray-700">
                  {bill.Status}
                </td>
                <td className="whitespace-nowrap px-8 py-3">
                  <button
                    className="inline-block rounded bg-indigo-600 px-8 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                    onClick={() => handleViewClick(bill.ID)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <GoBack label="Back to Home" className="mt-4" />
      </div>
      <OrderItems
        isOpen={isOrderItemsOpen}
        onClose={handleCloseOrderItems}
        Bill_ID={BillID}
      />
    </div>
  );
};

export default ViewBills;
