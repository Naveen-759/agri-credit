import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardComp from "../components/DashboardComp";
import DashComments from "../components/DashComments";
import DashPosts from "../components/DashPosts";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";
import OrganicManure from "../components/OrganicManure";
import { useSelector, useDispatch } from "react-redux";
import AddManure from "../components/AddManure";
import DashManure from "../components/DashManure";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("dash"); // Default tab to 'dash'
  const [manureList, setManureList] = useState([]);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || "dash"; // Default to 'dash' if no tab is found
    setTab(selectedTab);
    // getManuresByUser();
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white ">
      <div className="md:w-56 bg-white">
        {/* Sidebar */}
        <motion.div
          className=" min-h-full "
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 70 }}
        >
          <DashSidebar />
        </motion.div>
      </div>

      <div className="flex-1 p-4 ">
        {/* Render the corresponding tab component */}
        <motion.div
          className="transition-opacity duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {tab === "profile" && <DashProfile />}
          {tab === "manures" && <AddManure />}
          {tab === "manuresbyuser" && <DashManure/>}
          {tab === "comments" && <DashComments />}
          {tab === "dash" && <DashboardComp />}
        </motion.div>
      </div>
    </div>
  );
}
