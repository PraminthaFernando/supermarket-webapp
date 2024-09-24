import React, { useEffect, useState } from "react";
import RootNbodyStyle from "./RootNbodyStyle";
import EditStock from "./EditStock";
import ErrorModal from "./ErrorModel";
import GoBack from "./Goback";
import axios from "axios";

const ViewStock: React.FC = () => {
  const [stockID, setStockID] = useState("");
  const [State, setState] = useState(false);
  const [selectedRows] = useState<string[]>([]);
  const [isEditStockOpen, setIsEditStockOpen] = useState(false);
  const [isErrorModelOpen, setIsErrorModelOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState<any[]>([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await axios.get("http://localhost:8000/stock", {
          withCredentials: true, // This tells Axios to send cookies with the request
        });
        setStocks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStock();
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

  const handleClose = () => {
    setIsEditStockOpen(false);
  };

  const handleEditClick = (id: any) => {
    if (isEditStockOpen) {
      setIsEditStockOpen(false);
    } else {
      setStockID(id);
      setIsEditStockOpen(true);
    }
  };

  const handleRemoveClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      selectedRows.forEach(async (record) => {
        try {
          const res = await axios.delete("http://localhost:8000/stock/delete", {
            params: { id: record },
          });
          if (res.data === "ok") {
            window.location.reload();
          } else {
            setError(res.data);
            setIsErrorModelOpen(true);
          }
        } catch (err) {
          console.log(err);
        }
      });
      setIsLoading(false);
    }, 1400);
  };
  return (
    <RootNbodyStyle>
      <div className="overflow-x-auto flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-full">
          <h1 className="mt-6 text-xl font-bold text-gray-900 text-center my-10 sm:text-3xl md:text-4xl">
            Stock
          </h1>
          <div className="relative text-center w-1/2 mx-auto bg-white">
            <label htmlFor="Search" className="sr-only">
              {" "}
              Search{" "}
            </label>

            <input
              type="text"
              id="Search"
              placeholder="Search for..."
              className="w-full px-2 rounded-2xl bg-white border-gray-200 border-2 py-2.5 pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
          <table className="min-w-fit min-h-full p-5 m-8 rounded-lg divide-y-2 overflow-hidden shadow-xl transform transition-all divide-gray-300 bg-white text-sm items-start">
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
                  Quantity(Kg)
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Unit Price(1 kg)
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Vendor
                </th>
                <th className="px-6 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {stocks.map((stock) => (
                <tr key={stock.ID}>
                  <td className="px-4 py-2">
                    <label className="sr-only" htmlFor="Row1">
                      Row 1
                    </label>

                    <input
                      className="size-4 rounded border-gray-300 bg-white"
                      type="checkbox"
                      id={stock.ID}
                      onChange={() => handleCheckboxChange(stock.ID)}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {stock.Item_ID}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {stock.Place_ID}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {stock.Quantity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {stock.Unit_Price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {stock.Vendor_ID}
                  </td>
                  <td className="whitespace-nowrap px-6 py-2">
                    <button
                      className="inline-block rounded bg-indigo-600 px-6 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      onClick={() => handleEditClick(stock.ID)}
                    >
                      Edit
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
          <GoBack label="Back to Home" className="mt-4" />
        </div>
        <EditStock
          isOpen={isEditStockOpen}
          onClose={handleClose}
          stock_ID={stockID}
        />
        <ErrorModal
          isOpen={isErrorModelOpen}
          onClose={() => setIsErrorModelOpen(false)}
          errorMessage={error}
        />
      </div>
    </RootNbodyStyle>
  );
};

export default ViewStock;
