import React, { useState } from "react";
import CreateOrder from "./CreateOrder";

interface OrderItemsprops {
  isOpen: boolean;
  onClose: () => void;
  Bill_ID: any;
}

interface Item {
  item: string;
  place: string;
  quantity: number;
}

const OrderItems: React.FC<OrderItemsprops> = ({
  isOpen,
  onClose,
  Bill_ID,
}) => {
  const [itemList, setItemlist] = useState<any>();
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const initialItemList: Item[] = [
    { item: "Beans", place: "Dambulla", quantity: 10 },
    { item: "Potatoes", place: "Puttalama", quantity: 15 },
  ];

  const handleCloseOrder = () => {
    setIsOrderOpen(false);
    // window.location.reload();
  };

  const handleClickEdit = (event: any) => {
    event.preventDefault();
    setIsOrderOpen(true);
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block justify-center align-bottom bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all sm:my-4 sm:align-middle sm:max-w-full sm:w-full">
            <h1 className="mt-6 text-xl font-bold text-gray-900 text-center my-10 sm:text-3xl md:text-4xl">
              Item list
            </h1>
            <table className="min-w-fit min-h-full mx-auto text-center p-5 my-4 rounded-lg divide-y-2 overflow-hidden shadow-xl transform transition-all divide-gray-300 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="inset-y-0 start-0 bg-white px-4 py-2">
                    <label htmlFor="SelectAll" className="sr-only">
                      Select All
                    </label>
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Item
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Place
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Quantity(kg)
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
                      // onChange={() => handleCheckboxChange("Row1")}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Beens
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    Dambulla
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    10
                  </td>
                </tr>

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
                      // onChange={() => handleCheckboxChange("Row1")}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Potatoes
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    Puttalama
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    8
                  </td>
                </tr>

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
                      // onChange={() => handleCheckboxChange("Row1")}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Tomatoes
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    Nuwara Eliya
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    5
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-gray-800 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClickEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <CreateOrder
        isOpen={isOrderOpen}
        onClose={handleCloseOrder}
        initialItemList={initialItemList}
      />
    </div>
  );
};

export default OrderItems;
