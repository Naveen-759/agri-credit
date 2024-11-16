import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiAnnotation, HiArrowNarrowUp } from "react-icons/hi";
import { IoDocumentText } from "react-icons/io5";
import { FaSeedling, FaHeartbeat, FaSyringe } from "react-icons/fa";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { GiSprout, GiFertilizerBag } from "react-icons/gi";

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
  const [manureAdminList, setManureAdminList] = useState([]);

  const [cropList, setCropList] = useState([]);
  const [fertilizerList, setFertilizerList] = useState([]);
  const [diseaseList, setDiseaseList] = useState([]);
  const [pesticideList, setPesticideList] = useState([]);

  useEffect(() => {
    {
      !currentUser.isAdmin && getManuresByUser();
    }
    getAllCrops();
    getAllFertilizers();
    getAllPesticides();
    getAllDiseases();
    getAllManures();
  }, [currentUser]);
  const getManuresByUser = async () => {
    try {
      const res = await fetch("/api/manures/getbyuser", {
        method: "GET",
        credentials: "include",
      });
      const manures = await res.json();
      setManureList(manures);
      // console.log(manures);

      if (res.ok) {
        // console.log("manures fetched successfully");
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

  return (
    <div className="p-6 md:mx-auto max-w-screen-lg">
      <div className="grid grid-cols-1 md:grid-rows-1 gap-6">
        {!currentUser.isAdmin ? (
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
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl text-pretty text-stone-600 ">
                Agri Help
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <Link to="/dashboard?tab=totalcrops">
                  <div className="flex justify-between items-center p-6 bg-[#b4f588] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaSeedling className="flex items-center justify-center w-16 h-16 text-[#3b5a26] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Crops in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {cropList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=manuresbyuser">
                  <div className="flex justify-between items-center p-6 bg-[#c1f0ac] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <GiFertilizerBag className="flex items-center justify-center w-16 h-16 text-[#4c8f2e] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Fertilizers in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {fertilizerList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=manuresbyuser">
                  <div className="flex justify-between items-center p-6 bg-[#f69b98] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaHeartbeat className="flex items-center justify-center w-16 h-16 text-[#d9534f] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total diseases in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {diseaseList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=manuresbyuser">
                  <div className="flex justify-between items-center p-6 bg-[#99c4f3] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaSyringe className="flex items-center justify-center w-16 h-16 text-[#007bff] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total pesticides in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {pesticideList.length}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <hr />
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl text-pretty text-stone-600 ">
                Agri Services
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <Link to="/dashboard?tab=manuresbyuser">
                  <div className="flex justify-between items-center p-6 bg-[#f0be9a] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <GiSprout className="flex items-center justify-center w-16 h-16 text-[#7B3F00] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Manures avilable in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {manureAdminList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=manuresbyuser">
                  <div className="flex justify-between items-center p-6 bg-[#c1f0ac] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <GiFertilizerBag className="flex items-center justify-center w-16 h-16 text-[#4c8f2e] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Tractors in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {fertilizerList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=manuresbyuser">
                  <div className="flex justify-between items-center p-6 bg-[#f69b98] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaHeartbeat className="flex items-center justify-center w-16 h-16 text-[#d9534f] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total Nurseries in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {diseaseList.length}
                    </p>
                  </div>
                </Link>
                <Link to="/dashboard?tab=manuresbyuser">
                  <div className="flex justify-between items-center p-6 bg-[#99c4f3] rounded-lg shadow-lg border border-gray-200 gap-4 ">
                    <FaSyringe className="flex items-center justify-center w-16 h-16 text-[#007bff] rounded-full bg-white p-2" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {" "}
                      Total pesticides in database
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {pesticideList.length}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
