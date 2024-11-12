import React, { useEffect, useState } from "react";
import axios from "axios";
import GoBack from "./Goback";
import RootNbodyStyle from "./RootNbodyStyle";
import ErrorModal from "./ErrorModel";

const ViewVendors: React.FC = () => {
  const [State, setState] = useState(false);
  const [selectedRows] = useState<string[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModelOpen, setIsErrorModelOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllCategorie = async () => {
      try {
        const res = await axios.get("http://localhost:8000/vendors", {
          withCredentials: true, // This tells Axios to send cookies with the request
        });
        setVendors(res.data);
        setRowData(res.data);
      } catch (err) {
        setError("අනවසර පිවිසුමකි");
        setIsErrorModelOpen(true);
        console.log(err);
      }
    };
    fetchAllCategorie();
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

  const handleRemoveClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      selectedRows.forEach(async (user) => {
        try {
          const res = await axios.delete(
            "http://localhost:8000/vendors/delete",
            {
              params: { id: user },
            }
          );
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase();
    const rows = rowData.filter(
      (vendor) =>
        (vendor.ID.startsWith(input) ||
          vendor.Place_ID.startsWith(input) ||
          vendor.Name.startsWith(input)) &&
        input !== null
    );
    setVendors(rows);
  };
  return (
    <RootNbodyStyle>
      <div className="overflow-x-auto flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-full">
          <h1 className="mt-6 text-xl font-bold text-gray-900 text-center my-10 sm:text-3xl md:text-4xl">
            Vendors
          </h1>
          <div className="relative text-center w-1/2 mx-auto bg-white">
            <label htmlFor="Search" className="sr-only">
              {" "}
              Search{" "}
            </label>

            <input
              type="text"
              id="Search"
              onChange={(e) => handleSearch(e)}
              placeholder="සොයන්න..."
              className="w-full px-2 rounded-2xl text-black bg-white border-gray-300 border-2 py-1.5 pe-10 shadow-sm sm:text-sm"
            />

            <span className="absolute inset-y-0 rounded-2xl end-0 grid w-10 place-content-center hover:bg-blue-600 hover:text-white">
              <a type="button" className="text-gray-600 hover:text-white">
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
              </a>
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
                  Code ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Contact number
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Place
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr>
                  <td className="px-4 py-2">
                    <label className="sr-only" htmlFor="Row1">
                      Row 1
                    </label>

                    <input
                      className="size-4 rounded border-gray-300 bg-white"
                      type="checkbox"
                      id={vendor.ID}
                      // checked={selectedRows.includes("Row1")}
                      onChange={() => handleCheckboxChange(vendor.ID)}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {vendor.ID}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {vendor.Name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {vendor.Contact_No}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {vendor.Role}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {vendor.Place_ID}
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
        <ErrorModal
          isOpen={isErrorModelOpen}
          onClose={() => setIsErrorModelOpen(false)}
          errorMessage={error}
        />
      </div>
    </RootNbodyStyle>
  );
};

export default ViewVendors;
