import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBack from "./Goback";
import axios from "axios";

const CreateBill: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [customerID, setCustomerID] = useState<null | string>(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/customers");
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCustomers();
  }, []);

  const billCreate = async (name: string) => {
    setIsLoading(true);
    const res = await axios.put("http://localhost:8000/bill/create", {
      customerID: customerID,
      date: date,
    });
    const b_id = res.data;
    if (name == "order") {
      const res = await axios.put("http://localhost:8000/order/create", {
        bill: b_id,
        date: date,
      });
      console.log(res.data);
    }
    setTimeout(() => {
      navigate(`/${name}/items/${b_id}`);
      setIsLoading(false);
    }, 1000);
  };

  const handleCreateOrder = () => {
    billCreate("order");
  };

  const handleCreateBill = () => {
    billCreate("bill");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const ID = e.target.value;
    const idSet = customers.map((customer) => customer.ID);
    if (idSet.includes(ID)) {
      setCustomerID(ID);
    }
  };

  return (
    <section className="bg-white rounded-2xl">
      <div className="lg:grid">
        <main className="flex items-center justify-center px-8 py-10 sm:px-10 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
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
              බිල්පත සාදන්න
            </h1>

            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6 shadow-xl p-3 rounded-xl"
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block mx-1 text-left text-sm font-medium text-gray-700"
                >
                  පාරිභෝගිකයා
                </label>

                <div className="relative mt-1">
                  <input
                    type="text"
                    list="HeadlineActArtist"
                    id="HeadlineAct"
                    className="w-full p-1 h-8 border-2 bg-white rounded-lg border-gray-300 pe-10 text-gray-700 sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                    placeholder="කරුණාකර තෝරා ගන්න"
                    onChange={(e) => handleChange(e)}
                  />

                  <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </span>
                </div>

                <datalist content="HeadlineAct" id="HeadlineActArtist">
                  {customers.map((customer) => (
                    <option value={customer.ID}>{customer.Name}</option>
                  ))}
                </datalist>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-left mx-1 text-sm font-medium text-gray-700"
                >
                  දිනය
                </label>

                <div className="relative">
                  <input
                    type="date"
                    id="LastName"
                    value={date}
                    name="last_name"
                    className="mt-1 p-1 w-full h-8 border-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm pr-10 cursor-pointer"
                    onChange={(e) => setDate(e.target.value)}
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
              <div className="col-span-6 mx-6 sm:flex sm:items-baseline sm:gap-10">
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleCreateBill}
                  disabled={isLoading}
                >
                  {isLoading ? "පූරණය වෙමින්..." : "බිල්පත සාදන්න"}
                </button>
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-10 ml-5 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleCreateOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "පූරණය වෙමින්..." : "ඇණවුම සාදන්න"}
                </button>
              </div>
            </form>
            <GoBack className="inline-block shrink-0 rounded-md border border-blue-600 px-16 ml-5 mt-6 py-3 text-sm font-medium text-black transition hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500" />
          </div>
        </main>
      </div>
    </section>
  );
};

export default CreateBill;
