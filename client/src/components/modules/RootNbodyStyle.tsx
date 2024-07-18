import React from "react";

interface props {
  children: React.ReactNode;
}

const RootNbodyStyle: React.FC<props> = ({ children }) => {
  return (
    <>
      <style>{`
    :root {
      padding: 0rem;
    }

    body {
      place-items: start;
    }
  `}</style>
      <div>{children}</div>
    </>
  );
};

export default RootNbodyStyle;
