import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GlobalContext = createContext();
export { GlobalContext };

// // Connect to the Socket.IO server
// const socket = io("http://localhost:3000");

const GlobalProvider = ({ children }) => {
  const { currentUser, error, loading } = useSelector((state) => state.user);

  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [soilList, setSoilList] = useState([]);
  const [fertilizerList, setFertilizerList] = useState([]);
  const [cropList, setCropList] = useState([]);
  const [diseaseList, setDiseaseList] = useState([]);
  const [manureAdminList, setManureAdminList] = useState([]);
  const [pesticideList, setPesticideList] = useState([]);
  const [manureList, setManureList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    getCurrentLocation();
    getAllSoils();
    getAllCrops();
    getAllFertilizers();
    getAllDiseases();
    getAllManures();
    getAllPesticides();
    getManuresByUser();
    getBookingsByUser();
  }, []); // Empty dependency array to run useEffect only once on component mount

  // useEffect(() => {
  //   // Listen for manure updates
  //   socket.on("bookingUpdated", (updatedManure) => {
  //     console.log("Real-time manure update received:", updatedManure);

  //     // Update manureList state in real-time
  //     setManureList((prevManureList) =>
  //       prevManureList.map((manure) =>
  //         manure._id === updatedManure._id ? updatedManure : manure
  //       )
  //     );

  //     // Update manureAdminList state in real-time if applicable
  //     setManureAdminList((prevManureAdminList) =>
  //       prevManureAdminList.map((manure) =>
  //         manure._id === updatedManure._id ? updatedManure : manure
  //       )
  //     );
  //   });

  //   // Cleanup socket listeners on unmount
  //   return () => {
  //     socket.off("manureUpdated");
  //   };
  // }, []);

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

    // Round the distance to 1 decimal place
    return parseFloat(distance.toFixed(1));
  };

  const getAllSoils = async () => {
    try {
      const res = await fetch("/api/soils/getsoils", {
        method: "GET",
      });
      const soils = await res.json();
      // console.log(soils);

      if (res.ok) {
        setSoilList(soils);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const getAllFertilizers = async () => {
    try {
      const res = await fetch("/api/fertilizers/getallfertilizers", {
        method: "GET",
      });
      const fertilizers = await res.json();
      if (res.ok) {
        setFertilizerList(fertilizers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDiseases = async () => {
    try {
      const res = await fetch("/api/diseases/getalldiseases", {
        method: "GET",
      });
      const diseases = await res.json();
      if (res.ok) {
        setDiseaseList(diseases);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllManures = async () => {
    try {
      const res = await fetch("/api/manures/getmanures", {
        method: "GET",
      });
      const manures = await res.json();
      if (res.ok) {
        setManureAdminList(manures);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPesticides = async () => {
    try {
      const res = await fetch("/api/pesticides/getallpesticides", {
        method: "GET",
      });
      const pesticides = await res.json();
      if (res.ok) {
        setPesticideList(pesticides);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getManuresByUser = async () => {
    try {
      console.log(currentUser);
      const res = await fetch(`/api/manures/getbyuser/${currentUser._id}`, {
        method: "GET",
        credentials: "include",
      });
      const manures = await res.json();
      setManureList(manures);
      console.log(manures);

      if (res.ok) {
        console.log("manures fetched successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getBookingsByUser = async () => {
  //   try {
  //     const res = await fetch(
  //       `/api/bookings/bookingsbyuser/${currentUser._id}`,
  //       {
  //         method: "GET",
  //         credentials: "include",
  //       }
  //     );
  //     const booking = await res.json();
  //     if (res.ok) {
  //       setBookingsList(booking);
  //       console.log(bookingsList);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getBookingsByUser = async () => {
    try {
      const res = await fetch(
        `/api/bookings/bookingsbyuser/${currentUser._id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const booking = await res.json();
      if (res.ok) {
        setBookingsList(booking);
        console.log("Bookings fetched successfully:", booking); // Log fetched data directly
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  // To confirm updates:
  useEffect(() => {
    console.log("Bookings list updated:", bookingsList);
  }, [bookingsList]); // Watches for changes in bookingsList

  return (
    <GlobalContext.Provider
      value={{
        soilList,
        fertilizerList,
        cropList,
        diseaseList,
        manureAdminList,
        manureList,
        pesticideList,
        getAllFertilizers,
        getCurrentLocation,
        getAllSoils,
        getAllCrops,
        getAllPesticides,
        getAllDiseases,
        userLongitude,
        userLatitude,
        calculateDistance,
        getManuresByUser,
        getAllManures,
        bookingsList,
        getBookingsByUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
