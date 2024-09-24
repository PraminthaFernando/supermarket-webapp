import React from "react";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface PrintBillProps {
  items: Item[];
  total: number;
}

const PrintBill: React.FC<PrintBillProps> = ({ items, total }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="bill">
      <h1>POS Bill</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <h2>Total: ${total.toFixed(2)}</h2>
      <button onClick={handlePrint}>Print Bill</button>
    </div>
  );
};

export default PrintBill;
