import { useState, useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import GlobalContext from "../context/GlobalContext";
import Inpagination from "./Inpagination";

export default function AdvancedResearch() {
    const location = useLocation();
    const initialDepartment = location.state?.department || "";

    // state
    const [data, setData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchLastName, setSearchLastName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(8);
    const { selectedDepartment, setSelectedDepartment } = useContext(GlobalContext);


    // Calcolo dei risultati visibili
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = filteredDoctors.slice(indexOfFirstResult, indexOfLastResult);
    const totalPages = Math.ceil(filteredDoctors.length / resultsPerPage);

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
            console.error("Error loading data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // pages
    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

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

                <h1 className="my-2" style={{ fontSize: "35px" }}>Search for a doctor</h1>

                <form className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 needs-validation mt-3" onSubmit={handleFormSubmit}>

                    {/* select */}
                    <div className="col-md-3">
                        <label htmlFor="department" className="form-label" style={{ fontSize: "14px" }}>Department</label>
                        <select
                            className="form-select"
                            id="department"
                            required
                            style={{ fontSize: "14px" }}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                        >

                            <option value="" className="text-muted">{selectedDepartment}</option>

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
                        <label htmlFor="exampleInputName" className="form-label" style={{ fontSize: "14px" }}>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputName"
                            aria-describedby="nameHelp"
                            style={{ fontSize: "14px" }}
                            placeholder="Type doctor name"
                            value={searchName}
                            onChange={handleNameChange}
                        />
                    </div>

                    {/* lastname search bar */}
                    <div className="col">
                        <label htmlFor="exampleInputName" className="form-label" style={{ fontSize: "14px" }}>Lastname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputLastName"
                            aria-describedby="LastNameHelp"
                            placeholder="Type doctor lastname"
                            style={{ fontSize: "14px" }}
                            value={searchLastName}
                            onChange={handleLastNameChange}
                        />
                    </div>

                    {/* submit */}
                    <button
                        type="submit"
                        className="btn btn-sm ms-2 submit"
                        style={{ width: "80px" }}
                    >
                        Find
                    </button>

                </form>

                <p className="pt-4 text-secondary" style={{ fontSize: "12px" }}>Doctors found : {filteredDoctors.length}</p>

                {/* page navigation */}
                <Inpagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />

                {/* doctor */}
                <DoctorCard doctors={currentResults} />
            </div>
        </>
    );
};