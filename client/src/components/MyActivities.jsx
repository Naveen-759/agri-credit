import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalContext } from "../context/GlobalState";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";

import socket from "../utils/Socket";

const MyActivities = () => {
  const {
    bookingsList,
    getBookingsByUser,
    calculateDistance,
    userLatitude,
    userLongitude,
  } = useContext(GlobalContext);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    getBookingsByUser();
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on("bookingUpdated", (updatedBooking) => {
      toast.info(`Booking updated: ${updatedBooking.itemId.manure_type}`);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );
    });

    return () => {
      socket.disconnect();
      socket.off("bookingUpdated");
    };
  }, []);

  const acceptRequest = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  ``;

  const setPhoneNumber = async (mobile, userId) => {
    try {
      const res = await fetch(
        `/api/user/phoneupdate/${userId}?mobile=${mobile}`,
        { method: "PUT" }
      );
      if (res.ok) toast.success("Mobile number updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update mobile number.");
    }
  };

  // const handleConfirm = async (booking) => {
  //   setIsModalOpen(false);
  //   console.log(booking);
  //   console.log(booking.providerId.phone);

  //   {
  //     !booking.providerId.phone &&
  //       setPhoneNumber(mobile, booking.providerId._id);
  //   }

  //   try {
  //     const response = await fetch(`/api/bookings/accept/${booking._id}`, {
  //       method: "PATCH",
  //     });
  //     if (response.ok) {
  //       alert("Booking accepted successfully!");
  //       getBookingsByUser();
  //     }
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(
  //       "Error accepting booking:",
  //       error.response?.data || error.message
  //     );
  //     alert("Failed to accept the booking.");
  //   }
  // };

  const handleConfirm = async (booking) => {
    setIsModalOpen(false);

    if (!mobile && !booking.providerId.phone) {
      toast.error("Please provide a valid mobile number.");
      return;
    }

    if (!booking.providerId.phone) {
      await setPhoneNumber(mobile, booking.providerId._id);
    }

    try {
      const response = await fetch(`/api/bookings/accept/${booking._id}`, {
        method: "PATCH",
      });

      if (response.ok) {
        toast.success("Booking accepted successfully!");
        getBookingsByUser();
      }
    } catch (error) {
      toast.error("Failed to accept the booking.");
    }
  };

  const rejectRequest = async (booking) => {
    try {
      const response = await fetch(`/api/bookings/reject/${booking._id}`, {
        method: "PATCH",
      });
      if (response.ok) {
        alert("Booking rejected successfully!");
        getBookingsByUser();
      }
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error rejecting booking:",
        error.response?.data || error.message
      );
      alert("Failed to accept the booking.");
    }
  };

  return (
    <>
      <div className="flex flex-col content-center items-center ">
        <h1 className="font-bold text-green-500 text-2xl mb-10">
          Your Bookings
        </h1>

        {selectedBooking ? (
          <div className="flex flex-col  justify-center items-center p-6 bg-green-50 shadow-lg rounded-lg sm:p-8 lg:flex-row lg:items-start lg:gap-8 lg:max-w-5xl">
            <h1 className="text-2xl font-extrabold text-green-800 mb-6 lg:mb-0">
              Booking Details
            </h1>

            <div className="flex flex-col lg:flex-row lg:gap-6 content-center items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-40 w-40 rounded-lg shadow-xl object-cover border-2 border-green-300"
                  src={selectedBooking.itemId.manure_img}
                  alt={selectedBooking.itemId.manure_type}
                />
              </div>
              <div className="flex-grow space-y-4">
                <p className="text-gray-700">
                  <span className="font-bold text-green-800">
                    Manure Type:{" "}
                  </span>
                  {selectedBooking.itemId.manure_type}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold text-green-800">Quantity: </span>
                  {selectedBooking.itemId.quantity}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold text-green-800">Address: </span>
                  {selectedBooking.itemId.address}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold text-green-800">Distance: </span>
                  {calculateDistance(
                    selectedBooking.itemId.manure_lat,
                    selectedBooking.itemId.manure_long,
                    userLatitude,
                    userLongitude
                  )}
                  -km
                </p>
                <p className="text-gray-700">
                  <span className="font-bold text-green-800">Owner: </span>
                  {selectedBooking.providerId.username}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold text-green-800">Status: </span>
                  {selectedBooking.status}
                </p>
                <div className="flex flex-wrap gap-4">
                  {selectedBooking.status === "pending" ? (
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all">
                      Cancel Request
                    </button>
                  ) : (
                    ""
                  )}
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all"
                    onClick={() => setSelectedBooking(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          bookingsList &&
          bookingsList.map((booking) => (
            <ul
              key={booking._id} // Use unique identifier
              className="w-full flex flex-col gap-4 p-4 bg-gradient-to-r from-green-50 via-white to-green-50 rounded-lg shadow-md hover:shadow-lg transition-all sm:flex-row sm:items-center sm:justify-between"
            >
              {booking.requesterId._id === currentUser._id ||
              booking.providerId._id === currentUser._id ? (
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full cursor-pointer">
                  {/* Item Details */}
                  <div className="flex flex-col gap-2 sm:flex-1">
                    <h1 className="text-xl font-bold text-green-800">
                      {booking.itemId.manure_type}
                    </h1>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-green-700">
                        Quantity:
                      </span>{" "}
                      {booking.requested_quantity}
                    </p>
                  </div>
                  {booking.requesterId._id === currentUser._id &&
                  booking.status === "accepted" ? (
                    <p>
                      {" "}
                      Name:{booking.providerId.username} <br />
                      Email:{booking.providerId.email} <br />
                      Mobile Number:{booking.providerId.phone}
                    </p>
                  ) : (
                    ""
                  )}

                  {/* Action Buttons or Status */}
                  <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
                    {booking.providerId._id === currentUser._id &&
                    booking.status === "pending" ? (
                      <div className="flex gap-4 mr-3">
                        {/* Accept Button */}
                        <button
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-lg transition-transform transform hover:scale-105"
                          onClick={() => acceptRequest()}
                        >
                          Accept
                        </button>
                        {isModalOpen && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                              <h2 className="text-xl font-bold mb-4">
                                Confirm Action
                              </h2>
                              <p className="mb-4 text-gray-700">
                                <span>NOTE:</span>
                                By accepting this request,
                                <ul>
                                  <li>
                                    Your Mobile Number and email are shared with
                                    the requester for further comunication
                                  </li>
                                  <li>
                                    You cannot cancel this commitment , once
                                    confirmed
                                  </li>
                                </ul>
                                Do you want to continue?
                              </p>
                              {!booking.providerId.phone ? (
                                <input
                                  type="number"
                                  placeholder="Enter the your mobile number"
                                  value={mobile}
                                  onChange={(e) =>
                                    setMobile(Number(e.target.value))
                                  }
                                  className="w-full p-2 border rounded mb-4"
                                />
                              ) : (
                                ""
                              )}
                              <div className="flex justify-end gap-4">
                                <button
                                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg"
                                  onClick={handleCancel}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                                  onClick={() => handleConfirm(booking)}
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>{" "}
                          </div>
                        )}
                        {/* Reject Button */}
                        <button
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-lg transition-transform transform hover:scale-105"
                          onClick={() => rejectRequest(booking)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        <span className="font-bold text-lg text-green-600">
                          Status:
                        </span>{" "}
                        {booking.status}
                      </p>
                    )}
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-800 transition-all"
                    onClick={() => {
                      setSelectedBooking(booking);
                    }}
                  >
                    <AiOutlineEye size={24} />
                  </button>
                </li>
              ) : (
                <p className="text-center text-gray-500">
                  You don't have any booking records
                </p>
              )}
            </ul>
          ))
        )}
      </div>
    </>
  );
};

export default MyActivities;
