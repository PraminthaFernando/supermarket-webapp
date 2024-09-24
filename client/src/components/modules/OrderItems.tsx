import React, { useEffect, useState } from "react";
import CreateOrder from "./CreateOrder";
import axios from "axios";

interface OrderItemsprops {
  isOpen: boolean;
  onClose: () => void;
  Bill_ID: any;
  view: string;
}

interface Item {
  item: string;
  place: string;
  quantity: number;
  unitPrice: number;
  id: number;
}

const OrderItems: React.FC<OrderItemsprops> = ({
  isOpen,
  onClose,
  Bill_ID,
  view,
}) => {
  const [itemList, setItemlist] = useState<any[]>([]);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [initialItemList, setInitialItems] = useState<Item[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(true);

  useEffect(() => {
    const fetchAllitems = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/CustomerOrders/items",
          {
            params: { id: Bill_ID },
          }
        );
        setItemlist(res.data);
        if (view === "bill" || view === "complete") {
          setIsEditOpen(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllitems();
  }, [Bill_ID]);

  useEffect(() => {
    setInitialItems(
      itemList.map((order) => ({
        item: order.Item,
        place: order.Place,
        quantity: order.Quantity,
        unitPrice: order.Unit_Price,
        id: order.ID,
      }))
    );
  }, [itemList]);

  const handleCloseOrder = () => {
    setIsOrderOpen(false);
    onClose();
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
            <table className="min-w-fit min-h-full mx-auto text-left p-5 my-4 rounded-lg divide-y-2 overflow-hidden shadow-xl transform transition-all divide-gray-300 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
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
                {itemList.map((item) => (
                  <tr key={item.ID}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {item.Item}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {item.Place}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {item.Quantity}
                    </td>
                  </tr>
                ))}
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
              className={`w-full ${
                isEditOpen ? "inline-flex" : "hidden"
              } justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-gray-800 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm`}
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
        billId={Bill_ID}
      />
    </div>
  );
};

export default OrderItems;
