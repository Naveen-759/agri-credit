import React, { createContext, useEffect, useState } from "react";

const CropContext = createContext();
export { CropContext };

const CropContextProvider = ({ children }) => {
  const [cropList, setCropList] = useState([]);

  useEffect(() => {
    getAllCrops();
  }, []); // Empty dependency array to run useEffect only once on component mount

  const getAllCrops = async () => {
    try {
      const res = await fetch("/api/crops/getallcrops", {
        method: "GET",
      });
      const crops = await res.json();
      if (res.ok) {
        setCropList(crops);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CropContext.Provider value={{ cropList }}>{children}</CropContext.Provider>
  );
};

export default CropContextProvider;
