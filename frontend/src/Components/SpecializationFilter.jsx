import React, { useState, useEffect } from "react";
import axios from "axios";
import './SpecializationFilter';
import { Link } from "react-router-dom";
import DoctorCard from "./DoctorCard";

const DoctorSearch = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);

      try {
        const response = await axios.get("http://localhost:3008/api/doctors");
        const allDoctors = response.data;

        setDoctors(allDoctors);


        const departmentsList = [
          ...new Set(allDoctors.map((doctor) => doctor.department)),
        ];
        setDepartments(departmentsList);

        setFilteredDoctors(allDoctors);
      } catch (error) {
        console.error("Errore nel recupero dei medici:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);


  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);


    if (department === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doctor) => doctor.department === department);
      setFilteredDoctors(filtered);
    }
  };

  return (
    <div className="container py-5">

      {/* select department */}
      <div className="row justify-start mb-4">
        <div className="col-12 col-md-3">
          <label htmlFor="department" className="form-label text-muted">
            Select a Department:
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="form-select"
            style={{ fontSize: "14px" }}
          >
            <option value="">-- All --</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-center">Caricamento medici...</p>}

      {/* doctors card */}
      <DoctorCard filteredDoctors={filteredDoctors} loading={loading} />

      {!loading && filteredDoctors.length === 0 && (
        <p className="text-center text-muted">Nessun medico trovato per questo reparto.</p>
      )}
    </div>
  );
};

export default DoctorSearch;
