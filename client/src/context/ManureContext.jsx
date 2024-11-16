import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const ManureContext = createContext();

export const ManureProvider = ({ children }) => {
  const addManure = async () => {
    try {
      const manure = await fetch("/api/manures/addmanure", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(formDataToSend),
        body: JSON.stringify(formData),
      });

      if (manure.ok) {
        const result = await manure.json();
        console.log("Form submitted successfully", result);
        setImageFile(null);
        e.target.reset();
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <ManureContext.Provider value={{ addManure }}>
      {children}
    </ManureContext.Provider>
  );
};
