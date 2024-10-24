import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiAnnotation, HiArrowNarrowUp } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { GiSprout } from "react-icons/gi";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [manureList, setManureList] = useState([]);

  useEffect(() => {
    getManuresByUser();
  }, [currentUser]);
  const getManuresByUser = async () => {
    try {
      const res = await fetch("/api/manures/getbyuser", {
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

  return (
    <div className="p-6 md:mx-auto max-w-screen-lg">
      <div className="grid grid-cols-1 md:grid-rows-1 gap-6">
        <Link to="/dashboard?tab=manuresbyuser">
          <div className="flex justify-between items-center p-6 bg-[#f3c9aa] rounded-lg shadow-lg border border-gray-200  ">
            <GiSprout className="flex items-center justify-center w-16 h-16 text-[#422006] rounded-full bg-white p-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {" "}
              Manures posted by you
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {manureList.length}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
