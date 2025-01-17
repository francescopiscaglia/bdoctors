import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import GlobalContext from "../context/GlobalContext";
import Inpagination from "./Inpagination";

export default function DoctorList() {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(8);
  const navigate = useNavigate();
  const { selectedDepartment, setSelectedDepartment } = useContext(GlobalContext);

  // Calcolo dei risultati visibili
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredDoctors.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(filteredDoctors.length / resultsPerPage);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3008/api/doctors");
      const doctors = response.data;

      const sortedDoctors = doctors.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setData(sortedDoctors);
      setFilteredDoctors(sortedDoctors);

      const uniqueDepartments = [
        ...new Set(doctors.map((doctor) => doctor.department)),
      ];

      setDepartments(uniqueDepartments);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Navigazione alla pagina di ricerca avanzata
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleNavigateToAdvancedSearch = () => {
    navigate("search", { state: { department: selectedDepartment } });
  };

  // pages
  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="container mt-4">

      {/* Tendina dei reparti */}
      <div className="row justify-content-center align-items-center mb-4">
        <label htmlFor="department" className="form-label text-center" style={{ fontSize: "14px" }}>
          Search by Department:
        </label>

        <div className="col-auto">
          <select
            className="form-select"
            style={{ minWidth: "200px", fontSize: "14px" }}
            id="department"
            onChange={handleDepartmentChange}
          >
            <option
              value=""
              className="text-secondary"
            >-- All Department --</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div className="col-auto">
          <button
            className="btn navigate-adv-search"
            style={{ width: "200px", fontSize: "14px" }}
            onClick={handleNavigateToAdvancedSearch}
            disabled={!selectedDepartment}
          >
            Go to Advanced Search
          </button>
        </div>

      </div>

      {/* Conteggio dei medici */}
      <p className="text-center text-secondary" style={{ fontSize: "12px" }}>
        Doctors found: {filteredDoctors.length}
      </p>

      {/* Lista dei medici */}
      <DoctorCard doctors={currentResults} />

      {/* page navigation */}
      <Inpagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />

    </div>
  );
}
