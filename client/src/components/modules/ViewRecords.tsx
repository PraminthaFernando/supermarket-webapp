import React, { useEffect, useState } from "react";
import EditRecord from "./EditRecord";
import GoBack from "./Goback";
import ErrorModal from "./ErrorModel";
import { format } from "date-fns";
import axios from "axios";

const ViewRecords: React.FC = () => {
  const [recordID, setRecordID] = useState<any>();
  const [State, setState] = useState(false);
  const [isEditRecordOpen, setIsEditRecordOpen] = useState(false);
  const [isErrorModelOpen, setIsErrorModelOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows] = useState<string[]>([]);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllRecords = async () => {
      try {
        const res = await axios.get("http://localhost:8000/records");
        setRecords(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRecords();
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
    setIsEditRecordOpen(false);
  };

  const handleEditClick = (id: any) => {
    setRecordID(id);
    setIsEditRecordOpen(true);
  };

  const handleRemoveClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      selectedRows.forEach(async (record) => {
        try {
          const res = await axios.delete(
            "http://localhost:8000/records/delete",
            {
              params: { id: record },
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
        setIsLoading(false);
      });
    }, 1400);
  };

  return (
    <div className="overflow-x-auto flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-full">
        <h1 className="mt-6 text-xl font-bold text-gray-900 text-center my-10 sm:text-3xl md:text-4xl">
          Record list
        </h1>
        <table className="min-w-fit min-h-full p-5 m-8 rounded-lg divide-y-2 overflow-hidden shadow-xl transform transition-all divide-gray-300 bg-white text-sm items-start">
          <thead className="ltr:text-left rtl:text-right font-light">
            <tr>
              <th className="inset-y-0 start-0 bg-white px-4 py-2">
                <label htmlFor="SelectAll" className="sr-only">
                  Select All
                </label>
              </th>
              <th className="whitespace-nowrap px-6 py-2 font-normal text-gray-900">
                ID
              </th>
              <th className="whitespace-nowrap px-6 py-2 font-normal text-gray-900">
                Payment
              </th>
              <th className="whitespace-nowrap px-6 py-2 font-normal text-gray-900">
                Date
              </th>
              <th className="whitespace-nowrap px-6 py-2 font-normal text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-6 py-2 font-normal text-gray-900">
                Description
              </th>
              <th className="whitespace-nowrap px-6 py-2 font-normal text-gray-900">
                Reprt ID
              </th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {records.map((record) => (
              <tr>
                <td className="px-4 py-2">
                  <label className="sr-only" htmlFor="Row1">
                    Row 1
                  </label>

                  <input
                    className="size-4 rounded border-gray-300 bg-white"
                    type="checkbox"
                    id={record.ID}
                    // checked={selectedRows.includes("Row1")}
                    onChange={() => handleCheckboxChange(record.ID)}
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-2 font-normal text-black">
                  {record.ID}
                </td>
                <td className="whitespace-nowrap px-6 py-2 font-normal text-black">
                  {record.Payment}
                </td>
                <td className="whitespace-nowrap px-6 py-2 font-normal text-black">
                  {format(new Date(record.Date), "yyyy-MM-dd")}
                </td>
                <td className="whitespace-nowrap px-6 py-2 font-normal text-black">
                  {record.Price}
                </td>
                <td className="whitespace-nowrap px-6 py-2 font-normal text-black">
                  {record.Description}
                </td>
                <td className="whitespace-nowrap px-6 py-2 font-normal text-black">
                  {record.Report_ID}
                </td>
                <td className="whitespace-nowrap px-6 py-2">
                  <button
                    className={`${
                      record.Payment === "Stock" ? "hidden" : "inline-block"
                    } rounded bg-indigo-600 px-6 py-2 text-xs font-normal text-white hover:bg-indigo-700 `}
                    onClick={() => handleEditClick(record.ID)}
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
      <EditRecord
        isOpen={isEditRecordOpen}
        onClose={handleClose}
        Record_ID={recordID}
      />
      <ErrorModal
        isOpen={isErrorModelOpen}
        onClose={() => setIsErrorModelOpen(false)}
        errorMessage={error}
      />
    </div>
  );
};

export default ViewRecords;
