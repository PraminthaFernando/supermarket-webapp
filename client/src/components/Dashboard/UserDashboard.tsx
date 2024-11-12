import React, { useEffect, useState } from "react";
import BillBoard from "./BillBoard";
import CustomerBoard from "./CustomerBoard";
import Employeeboard from "./Employeeboard";
import ItemBoard from "./ItemBoard";
import PlacesBoard from "./PlacesBoard";
import VendorBoard from "./VendorBoard";
import RecordBoard from "./RecordBoard";
import StockBoard from "./StockBoard";
import UserBoard from "./userBoard";
import OrderBoard from "./OrderBoard";

interface Link {
  label: string;
  href: string;
  activeFunc: () => void;
  closeFunc: () => void;
}

const UserDashboard: React.FC = () => {
  const links: Link[] = [
    {
      label: "",
      href: "#",
      activeFunc: () => setISBIllBoardOpen(true),
      closeFunc: () => setISBIllBoardOpen(false),
    },
    {
      label: "බිල්පත්",
      href: "#",
      activeFunc: () => setISBIllBoardOpen(true),
      closeFunc: () => setISBIllBoardOpen(false),
    },
    {
      label: "ඇණවුම්",
      href: "#",
      activeFunc: () => setIsOrderBoardOpen(true),
      closeFunc: () => setIsOrderBoardOpen(false),
    },
    {
      label: "තොග",
      href: "#",
      activeFunc: () => setIsStockBoardOpen(true),
      closeFunc: () => setIsStockBoardOpen(false),
    },
    {
      label: "පාරිභෝගිකයන්",
      href: "#",
      activeFunc: () => setIsCustomerBoardOpen(true),
      closeFunc: () => setIsCustomerBoardOpen(false),
    },
    {
      label: "සේවකයින්",
      href: "#",
      activeFunc: () => setIsEmployeeBoardOpen(true),
      closeFunc: () => setIsEmployeeBoardOpen(false),
    },
    {
      label: "එළවළු",
      href: "#",
      activeFunc: () => setIsItemBoardOpen(true),
      closeFunc: () => setIsItemBoardOpen(false),
    },
    {
      label: "ආර්ථික මධ්යස්ථාන",
      href: "#",
      activeFunc: () => setIsPlaceBoardOpen(true),
      closeFunc: () => setIsPlaceBoardOpen(false),
    },
    {
      label: "වෙළෙන්දෝ",
      href: "#",
      activeFunc: () => setIsVendorBoardOpen(true),
      closeFunc: () => setIsVendorBoardOpen(false),
    },
    {
      label: "ගණුදෙනු",
      href: "#",
      activeFunc: () => setIsRecordBoardOpen(true),
      closeFunc: () => setIsRecordBoardOpen(false),
    },
    {
      label: "පරිශීලකයන්",
      href: "#",
      activeFunc: () => setIsUserBoardOpen(true),
      closeFunc: () => setIsUserBoardOpen(false),
    },
    {
      label: "මාසික වාර්තා",
      href: "#",
      activeFunc: () => setIsReportBoardOpen(true),
      closeFunc: () => setIsReportBoardOpen(false),
    },
  ];

  const linkIndex =
    sessionStorage.getItem("index") !== null
      ? Number(sessionStorage.getItem("index"))
      : null;
  const [activeLink, setActiveLink] = useState<number | null>(linkIndex);
  const [isLoading, setIsLoading] = useState(false);
  const [isBIllBoardOpen, setISBIllBoardOpen] = useState(false);
  const [isCustomerBoardOpen, setIsCustomerBoardOpen] = useState(false);
  const [isEmployeeBoardOpen, setIsEmployeeBoardOpen] = useState(false);
  const [isItemBoardOpen, setIsItemBoardOpen] = useState(false);
  const [isPlaceBoardOpen, setIsPlaceBoardOpen] = useState(false);
  const [isVendorBoardOpen, setIsVendorBoardOpen] = useState(false);
  const [isRecordBoardOpen, setIsRecordBoardOpen] = useState(false);
  const [isStockBoardOpen, setIsStockBoardOpen] = useState(false);
  const [isUserBoardOpen, setIsUserBoardOpen] = useState(false);
  const [isOrderBoardOpen, setIsOrderBoardOpen] = useState(false);
  const [isReportBoardOpen, setIsReportBoardOpen] = useState(false);

  // console.log(linkIndex);

  useEffect(() => {
    const active = (activeLink: number | null) => {
      console.log(linkIndex);
      if (activeLink) {
        links[activeLink].activeFunc();
      }
    };
    active(activeLink);
  }, []);

  const handleLinkClick = (index: number) => {
    setIsLoading(true);
    setActiveLink(index);
    setTimeout(() => {
      links.forEach((link) => link.closeFunc());
      links[index].activeFunc();
      sessionStorage.setItem("index", String(index));
      setIsLoading(false);
    }, 500);
    // console.log(index);
  };

  const handleLogOut = () => {
    window.location.href = "/";
  };

  return (
    <div className="fixed z-2 inset-0 flex flex-row flex-nowrap text-left">
      {/* Left-side menu */}
      <div className="bg-gray-800 text-white w-96 p-6 flex h-screen flex-col justify-between">
        <nav>
          <h2 className="text-xl font-bold mb-6">මෙනුව</h2>
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`block py-2 px-4 my-1 rounded-md transition-colors duration-300 ${
                activeLink === index
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
              aria-disabled={isLoading}
              onClick={() => handleLinkClick(index)}
            >
              {activeLink === index && isLoading ? "Loading..." : link.label}
            </a>
          ))}
        </nav>
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-start rounded-md gap-2 mt-2 hover:bg-gray-700"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>

                <span> eric@frusciante.com </span>
              </p>
            </div>
            <button
              onClick={handleLogOut}
              className="group relative flex w-full justify-center rounded-lg px-2 py-3 text-sm hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span className="invisible absolute start-full top-1/2 ms-4 z-50 -translate-y-1/2 rounded bg-white px-2 py-1.5 text-xs font-medium text-black group-hover:visible">
                Logout
              </span>
            </button>
          </a>
        </div>
      </div>
      <div className="w-full bg-white opacity-85">
        <BillBoard isOpen={isBIllBoardOpen} />
        <CustomerBoard isOpen={isCustomerBoardOpen} />
        <Employeeboard isOpen={isEmployeeBoardOpen} />
        <ItemBoard isOpen={isItemBoardOpen} />
        <PlacesBoard isOpen={isPlaceBoardOpen} />
        <VendorBoard isOpen={isVendorBoardOpen} />
        <RecordBoard isOpen={isRecordBoardOpen} />
        <StockBoard isOpen={isStockBoardOpen} />
        <UserBoard isOpen={isUserBoardOpen} />
        <OrderBoard isOpen={isOrderBoardOpen}></OrderBoard>
      </div>
    </div>
  );
};

export default UserDashboard;
