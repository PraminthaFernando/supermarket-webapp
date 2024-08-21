import React from "react";

interface editStockProps {
  isOpen: boolean;
  onClose: () => void;
  stock_ID: string;
}

const EditStock: React.FC<editStockProps> = ({ isOpen, onClose, stock_ID }) => {
  const handleClick = (event: any) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                    Edit Stock
                  </h1>

                  <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="HeadlineAct"
                        className="block text-left text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Vendor{" "}
                      </label>

                      <div className="relative mt-1.5">
                        <input
                          type="text"
                          list="HeadlineActArtist"
                          id="HeadlineAct"
                          className="w-full rounded-lg bg-white border-gray-300 h-8 p-1 border-2 pe-10 text-gray-900 sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                          placeholder="select a vendor"
                          autoFocus
                          required
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

                      <datalist itemID="HeadlineAct" id="HeadlineActArtist">
                        <option value="JM">John Mayer</option>
                        <option value="SRV">Stevie Ray Vaughn</option>
                        <option value="JH">Jimi Hendrix</option>
                        <option value="BBK">B.B King</option>
                        <option value="AK">Albert King</option>
                        <option value="BG">Buddy Guy</option>
                        <option value="EC">Eric Clapton</option>
                      </datalist>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="HeadlineAct"
                        className="block text-left text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Item{" "}
                      </label>
                      <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        required
                        className="mt-1.5 w-full rounded-lg bg-gray-200 border-2 h-8 border-gray-300 text-gray-700 sm:text-sm"
                      >
                        <option value="">Please select</option>
                        <optgroup label="A">
                          <option value="AK">Albert King</option>
                        </optgroup>

                        <optgroup label="B">
                          <option value="BBK">B.B King</option>
                          <option value="BG">Buddy Guy</option>
                        </optgroup>

                        <optgroup label="E">
                          <option value="EC">Eric Clapton</option>
                        </optgroup>

                        <optgroup label="J">
                          <option value="JM">John Mayer</option>
                          <option value="JH">Jimi Hendrix</option>
                        </optgroup>

                        <optgroup label="S">
                          <option value="SRV">Stevie Ray Vaughn</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="HeadlineAct"
                        className="block text-left text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Place{" "}
                      </label>

                      <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        required
                        className="mt-1.5 w-full rounded-lg bg-gray-200 border-2 h-8 border-gray-300 text-gray-700 sm:text-sm"
                      >
                        <option value="">Please select</option>
                        <optgroup label="A">
                          <option value="AK">Albert King</option>
                        </optgroup>

                        <optgroup label="B">
                          <option value="BBK">B.B King</option>
                          <option value="BG">Buddy Guy</option>
                        </optgroup>

                        <optgroup label="E">
                          <option value="EC">Eric Clapton</option>
                        </optgroup>

                        <optgroup label="J">
                          <option value="JM">John Mayer</option>
                          <option value="JH">Jimi Hendrix</option>
                        </optgroup>

                        <optgroup label="S">
                          <option value="SRV">Stevie Ray Vaughn</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Password"
                        className="block text-left text-sm font-medium text-gray-700"
                      >
                        {" "}
                        Unit price{" "}
                      </label>

                      <input
                        type="price"
                        id="Password"
                        name="password"
                        className="mt-1 h-8 border-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="PasswordConfirmation"
                        className="block text-left text-sm font-medium text-gray-700"
                      >
                        Quantity
                      </label>

                      <input
                        type="number"
                        id="PasswordConfirmation"
                        name="password_confirmation"
                        className="mt-1 h-8 border-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                        Edit Stock
                      </button>

                      <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        Already added?
                        <a
                          href="#"
                          className="text-gray-700 underline"
                          onClick={handleClick}
                        >
                          Cancel
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditStock;
