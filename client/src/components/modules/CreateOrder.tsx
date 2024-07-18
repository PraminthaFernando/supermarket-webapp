import React, { useState } from "react";

interface Item {
  item: string;
  place: string;
  quantity: number;
}

interface CreateOrderProps {
  initialItemList: Item[];
  isOpen: boolean;
  onClose: () => void;
}

const CreateOrder: React.FC<CreateOrderProps> = ({
  initialItemList,
  isOpen,
  onClose,
}) => {
  const [items, setItems] = useState<string[]>(["Beens", "Potatoes"]);
  const [places, setPlaces] = useState<string[]>(["Dambulla", "Puttalama"]);
  const [rowItem, setRowItem] = useState<string>("");
  const [itemPlace, setItemPlace] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [itemList, setItemlist] = useState<Item[]>(initialItemList);
  const [closeDate, setCloseDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rowItem && itemPlace && amount > 0) {
      setItemlist([
        ...itemList,
        { item: rowItem, place: itemPlace, quantity: amount },
      ]);
      setRowItem("");
      setItemPlace("");
      setAmount(0);
    }
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
        <div className="inline-block align-bottom text-center bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-3xl">
          <section className="bg-white rounded-2xl">
            <div className="lg:grid">
              <main className="flex items-center justify-center px-8 py-10 sm:px-10 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-8">
                <div className="max-w-full m-auto lg:max-w-3xl">
                  <a className="block text-blue-600" href="#">
                    <span className="sr-only">Home</span>
                    <img
                      src="path/to/your/logo.svg"
                      alt="Your Company Logo"
                      className="h-8 sm:h-10"
                    />
                  </a>

                  <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Order Items
                  </h1>
                  <form
                    action="#"
                    className="mt-8 grid grid-cols-6 gap-6 shadow-xl p-3 rounded-xl"
                    onSubmit={handleSubmit}
                  >
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="place"
                        className="block text-left mx-1 text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Place{" "}
                      </label>

                      <select
                        name="place"
                        id="place"
                        required
                        className="mt-1.5 w-full rounded-lg bg-gray-200 border-2 h-8 border-gray-300 text-gray-700 sm:text-sm"
                        onChange={(e) => setItemPlace(e.target.value)}
                        value={itemPlace}
                        autoFocus
                      >
                        <option value="">select place</option>
                        {places.map((place) => (
                          <option key={place} value={place}>
                            {place}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="item"
                        className="block text-left mx-1 text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Item{" "}
                      </label>
                      <select
                        name="item"
                        id="item"
                        className="mt-1.5 w-full rounded-lg bg-gray-200 border-2 h-8 border-gray-300 text-gray-700 sm:text-sm"
                        onChange={(e) => setRowItem(e.target.value)}
                        value={rowItem}
                      >
                        <option value="">select item</option>
                        {items.map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="quantity"
                        className="block mx-1 text-left text-sm font-medium text-gray-700"
                      >
                        Quantity
                      </label>

                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="mt-1 p-2 h-8 border-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        onChange={(e) => setAmount(e.target.valueAsNumber)}
                        value={amount}
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="date"
                        className="block text-left mx-1 text-sm font-medium text-gray-700"
                      >
                        Close date
                      </label>

                      <div className="relative">
                        <input
                          type="date"
                          id="date"
                          name="date"
                          className="mt-1 p-1 w-full h-8 border-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm pr-10 cursor-pointer"
                          onChange={(e) =>
                            setCloseDate(new Date(e.target.value))
                          }
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-2">
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
                  </form>

                  <div className="overflow-x-auto mt-8 rounded-xl w-full">
                    <table className="min-w-full mx-auto divide-y-2 divide-gray-200 bg-white text-sm">
                      <thead className="ltr:text-left rtl:text-right">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Item
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Place
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Unit Price(1 kg)
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Quantity(kg)
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Total Price
                          </th>
                          <th className="whitespace-nowrap pl-4 pr-16 py-2 font-medium text-gray-900">
                            <label htmlFor="SelectAll" className="sr-only">
                              Remove Item
                            </label>
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {itemList.map((item, index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              {item.item}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {item.place}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              200.00
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {item.quantity}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {(item.quantity * 200.0).toFixed(2)}
                            </td>
                            <td className="whitespace-nowrap pl-3 pr-16 py-2 text-gray-200">
                              <div className="relative inline-block">
                                <button className="relative text-gray-600 border-gray-200 transition hover:text-red-600 hover:border-gray-400 rounded bg-blue-50 px-2 py-1.5 group">
                                  <span className="absolute z-50 start-full top-1/2 ms-1 -translate-y-full rounded bg-gray-900 px-1 py-0.5 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    Remove
                                  </span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
            </div>
          </section>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
