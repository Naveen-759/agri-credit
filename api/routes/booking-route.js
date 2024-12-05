import express from "express";
import {
  getBookingsByUser,
  newBooking,
  acceptRequest,
  rejectRequest,
  getAllBookings,
} from "../controllers/bookings.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/new-booking", newBooking);
router.get("/", getAllBookings);
router.get("/bookingsbyuser/:userId", verifyToken, getBookingsByUser);
router.patch("/accept/:bookingId", acceptRequest);
router.patch("/reject/:bookingId", rejectRequest);

export default router;
