import React, { useState } from "react";

interface Item {
  item: string;
  place: string;
  quantity: number;
}

const Items: React.FC = () => {
  const [Items, setItems] = useState(["Beens", "Potatoes"]);
  const [Places, setPlaces] = useState(["Dambulla", "Puttalama"]);
  const [rowItem, setRowItem] = useState<string>("");
  const [itemPlace, setItemPlace] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [itemList, setItemlist] = useState<Item[]>([]);

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
    <section className="bg-white rounded-2xl">
      <div className="lg:grid">
        <main className="flex items-center justify-center px-8 py-10 sm:px-10 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-full m-auto lg:max-w-3xl">
            <a className="block text-blue-600" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Bill Items
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
                  {Places.map((Place) => (
                    <option value={Place}>{Place}</option>
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
                  {Items.map((Item) => (
                    <option value={Item}>{Item}</option>
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
                    <th className="whitespace-nowrap pl-4 pr-17 py-2 font-medium text-gray-900">
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
  );
};

export default Items;
