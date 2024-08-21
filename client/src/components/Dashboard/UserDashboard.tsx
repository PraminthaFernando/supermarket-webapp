import React, { useEffect, useState } from "react";
import BillBoard from "./BillBoard";
import CustomerBoard from "./CustomerBoard";
import Employeeboard from "./Employeeboard";
import ItemBoard from "./ItemBoard";
import PlacesBoard from "./PlacesBoard";
import VendorBoard from "./VendorBoard";
import RecordBoard from "./RecordBoard";
import StockBoard from "./StockBoard";

interface Link {
  label: string;
  href: string;
  activeFunc: () => void;
  closeFunc: () => void;
}

const UserDashboard: React.FC = () => {
  const links: Link[] = [
    {
      label: "Billing",
      href: "#",
      activeFunc: () => setISBIllBoardOpen(true),
      closeFunc: () => setISBIllBoardOpen(false),
    },
    {
      label: "Stock",
      href: "#",
      activeFunc: () => setIsStockBoardOpen(true),
      closeFunc: () => setIsStockBoardOpen(false),
    },
    {
      label: "Customers",
      href: "#",
      activeFunc: () => setIsCustomerBoardOpen(true),
      closeFunc: () => setIsCustomerBoardOpen(false),
    },
    {
      label: "Employees",
      href: "#",
      activeFunc: () => setIsEmployeeBoardOpen(true),
      closeFunc: () => setIsEmployeeBoardOpen(false),
    },
    {
      label: "Vegitables",
      href: "#",
      activeFunc: () => setIsItemBoardOpen(true),
      closeFunc: () => setIsItemBoardOpen(false),
    },
    {
      label: "Financial centers",
      href: "#",
      activeFunc: () => setIsPlaceBoardOpen(true),
      closeFunc: () => setIsPlaceBoardOpen(false),
    },
    {
      label: "Vendors",
      href: "#",
      activeFunc: () => setIsVendorBoardOpen(true),
      closeFunc: () => setIsVendorBoardOpen(false),
    },
    {
      label: "Records",
      href: "#",
      activeFunc: () => setIsRecordBoardOpen(true),
      closeFunc: () => setIsRecordBoardOpen(false),
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

  return (
    <div className="fixed z-2 inset-0 flex flex-row flex-nowrap text-left">
      {/* Left-side menu */}
      <div className="bg-gray-800 text-white w-64 p-6">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <nav>
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
      </div>
    </div>
  );
};

export default UserDashboard;
