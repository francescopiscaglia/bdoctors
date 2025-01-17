import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorCard from "./DoctorCard";
import GlobalContext from "../context/GlobalContext";

export default function DoctorList() {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5); // Ad esempio, 5 risultati per pagina
  // const [selectedDepartment, setSelectedDepartment] = useState("");
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

      <nav aria-label="Pagination" >
        <ul className="pagination justify-content-center mt-4" >
          {/* Pulsante "Back" */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`} >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ fontSize: "12px" }}
            >
              Back
            </button>
          </li>

          {/* Numeri di pagina */}
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button
                className="page-link bg-danger"
                onClick={() => handlePageChange(index + 1)}
                style={{ fontSize: "12px" }}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* Pulsante "Next" */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              style={{ fontSize: "12px" }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

    </div>
  );
}
