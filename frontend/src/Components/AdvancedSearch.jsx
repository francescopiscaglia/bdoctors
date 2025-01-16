import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DoctorCard from "./DoctorCard";

export default function AdvancedResearch() {
    const location = useLocation();
    const initialDepartment = location.state?.department || "";

    // state
    const [data, setData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchLastName, setSearchLastName] = useState("");

    // fetch
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3008/api/doctors");
            const doctors = response.data;
            

            const sortedDoctors = doctors.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
              );
        
              setData(sortedDoctors);
              

            // Estrai i reparti senza duplicati
            const UniqueDepartments = [...new Set(doctors.map(doctor => doctor.department))];
            setDepartments(UniqueDepartments);

            if (initialDepartment) {
                const initialFilteredDoctors = sortedDoctors.filter(
                  (doctor) => doctor.department === initialDepartment
                );
                setFilteredDoctors(initialFilteredDoctors);
              } else {
                setFilteredDoctors(sortedDoctors);
              }
            } catch (error) {
              console.error("Errore nel caricamento dei dati:", error);
            }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // form handle
    function handleFormSubmit(e) {
        e.preventDefault();

        applyFilters(selectedDepartment, searchName, searchLastName);
    };

    // department handle
    function handleDepartmentChange(e) {
        setSelectedDepartment(e.target.value);
    };

    // name handle
    function handleNameChange(e) {
        setSearchName(e.target.value);
    };

    // lastname handle
    function handleLastNameChange(e) {
        setSearchLastName(e.target.value);
    };

    // filter
    function applyFilters(department, name, last_name) {
        const filtered = data.filter((doctor) => {
            const matchesDepartment = department ? doctor.department === department : true;
            const matchesName = name ? doctor.name.toLowerCase().includes(name.toLowerCase()) : true;
            const matchesLastName = last_name ? doctor.last_name.toLowerCase().includes(last_name.toLowerCase()) : true;
            return matchesDepartment && matchesName && matchesLastName;
        });
        setFilteredDoctors(filtered);
    };

    return (
        <>
            <div className="container">
                <form className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 needs-validation mt-3" onSubmit={handleFormSubmit}>

                    {/* select */}
                    <div className="col-md-3">
                        <label htmlFor="department" className="form-label">Department</label>
                        <select
                            className="form-select"
                            id="department"
                            required
                            style={{ fontSize: "14px" }}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                        >

                            <option value="" className="text-muted">-- Select a Department --</option>

                            {
                                departments || departments.length > 0 ? departments.map((department, index) => (
                                    <option key={index} value={department}>{department}</option>
                                )
                                ) : (
                                    <h1>Error fetch</h1>
                                )
                            }
                        </select>

                    </div>

                    {/* name search bar */}
                    <div className="">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            aria-describedby="nameHelp"
                            placeholder="Type doctor name"
                            value={searchName}
                            onChange={handleNameChange}
                        />
                    </div>

                    {/* lastname search bar */}
                    <div className="col">
                        <label htmlFor="exampleInputName" className="form-label">Lastname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputLastName"
                            aria-describedby="LastNameHelp"
                            placeholder="Type doctor lastname"
                            value={searchLastName}
                            onChange={handleLastNameChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-sm ms-2 submit"
                        style={{ width: "80px" }}
                    >
                        Find</button>
                </form>

                <DoctorCard doctors={filteredDoctors} />
            </div>


        </>
    );
};