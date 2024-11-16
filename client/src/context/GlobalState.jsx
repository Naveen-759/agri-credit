import React, { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export { GlobalContext };

const GlobalProvider = ({ children }) => {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []); // Empty dependency array to run useEffect only once on component mount

  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    return distance;
  };

  return (
    <GlobalContext.Provider
      value={{
        getCurrentLocation,
        userLongitude,
        userLatitude,
        calculateDistance,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
