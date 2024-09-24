import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModel";
// import { ipcRenderer } from "electron";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   const saveTokens = async (tokens: { refreshToken: string }) => {
  //     await ipcRenderer.invoke("setRefreshTokens", tokens);
  //   };

  //   const getTokens = async () => {
  //     const tokens = await ipcRenderer.invoke("getTokens");
  //     return tokens;
  //   };

  const handleUN = (data: string) => {
    setUsername(data);
    setError("");
  };
  const handlePW = (data: string) => {
    setPassword(data);
    setError("");
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const response = await fetch("http://localhost:8000/Refresh-login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // await window.electronStore.set("refreshToken", data.refreshToken);
        navigate("/"); // Use context to log in
      } else {
        const error = await response.text();
        console.log(error);
        setError("Login faild");
        setIsErrorModalOpen(true);
      }
      setIsLoading(false);
    }, 1400);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-12 lg:px-14 bg-white bg-current bg-opacity-90 rounded-2xl">
      <div className="mx-auto max-w-xl">
        <form
          action="#"
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-4 lg:p-8"
        >
          <p className="text-center text-black text-lg font-medium">
            Sign in to Admin account
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Username
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg bg-gray-200 text-black border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter username"
                value={username}
                onChange={(e) => handleUN(e.target.value)}
                autoFocus
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg bg-gray-200 text-black border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => handlePW(e.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </form>
        <button
          type="submit"
          className="block w-full my-3 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          onClick={handleLogin}
          aria-disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign in"}
        </button>

        <p className="text-center text-sm text-gray-500">
          No account?
          <a className="underline" href="#">
            Sign up
          </a>
        </p>
      </div>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={error}
      />
    </div>
  );
};

export default AdminLogin;
