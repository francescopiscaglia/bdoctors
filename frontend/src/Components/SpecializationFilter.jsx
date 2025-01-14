import React, { useState, useEffect } from "react";
import axios from "axios";
import './SpecializationFilter';
import { Link } from "react-router-dom";

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
      <h2 className="text-center mb-4">Search Doctors by Departments</h2>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <label htmlFor="department" className="form-label">
            Select a Department:
          </label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="form-select"
          >
            <option value="">-- No Filter --</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-center">Caricamento medici...</p>}

      {!loading && filteredDoctors.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {filteredDoctors.map((doctor) => (
            <Link to={`/${doctor.id}`} key={doctor.id} className="text-decoration-none">
              <div className="col mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{doctor.name} {doctor.last_name}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {doctor.email}
                    </p>
                    <p className="card-text">
                      <strong>Department:</strong> {doctor.department}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && filteredDoctors.length === 0 && (
        <p className="text-center text-muted">Nessun medico trovato per questo reparto.</p>
      )}
    </div>
  );
};

export default DoctorSearch;
