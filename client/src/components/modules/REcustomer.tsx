import React, { useEffect, useState } from "react";
import EditCustomer from "./EditCustomer";
import ErrorModal from "./ErrorModel";
import axios from "axios";

const REcustomer: React.FC = () => {
  const [Customers, setCustomers] = useState<any[]>([]);
  const [Customer, setCustomer] = useState("");
  const [error, setError] = useState("");
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCloseEditCustomer = () => {
    setIsEditCustomerOpen(false);
    window.location.reload();
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleEditClick = () => {
    if (Customer != "") {
      setIsEditCustomerOpen(true);
    } else {
      setError("Please select a customer");
      setIsErrorModalOpen(true);
    }
  };

  const handleRemoveClick = () => {
    if (Customer != "") {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const res = await axios.delete(
            "http://localhost:8000/customers/delete",
            {
              params: { id: Customer },
            }
          );
          if (res.data === "ok") {
            window.location.reload();
          } else {
            setError(res.data);
            setIsErrorModalOpen(true);
          }
        } catch (err) {
          console.log(err);
        }
      }, 1600);
    } else {
      setError("Please select a customer");
      setIsErrorModalOpen(true);
    }
  };

  return (
    <section className="bg-white rounded-2xl">
      <div className="lg:grid">
        <main className="flex items-center justify-center px-8 py-10 sm:px-10 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-2xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Edit or Remove
            </h1>
            <h2 className="mt-6 text-xl text-gray-900 sm:text-2xl md:text-3xl">
              Customer
            </h2>

            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6 shadow-xl p-3 rounded-xl"
            >
              <div className="col-span-6">
                <label
                  htmlFor="HeadlineAct"
                  className="block text-left text-sm font-medium text-gray-900"
                >
                  {" "}
                  Customer{" "}
                </label>

                <select
                  name="HeadlineAct"
                  id="HeadlineAct"
                  required
                  className="mt-1.5 w-full rounded-lg bg-gray-200 border-2 h-8 border-gray-300 text-gray-700 sm:text-sm"
                  onChange={(e) => setCustomer(e.target.value)}
                  autoFocus
                >
                  <option value="">select cutomer</option>
                  {Customers.map((Customer) => (
                    <option value={Customer.ID}>{Customer.Name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-row col-span-6 items-center justify-end gap-2 bg-white p-3">
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
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
            </form>
            <div className="flex justify-start my-3">
              <a
                href="/UserDashboard"
                className="block rounded-lg bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                cancel
              </a>
            </div>
          </div>
        </main>
      </div>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={error}
      />
      <EditCustomer
        isOpen={isEditCustomerOpen}
        onClose={handleCloseEditCustomer}
        Customer_ID={Customer}
      />
    </section>
  );
};

export default REcustomer;
