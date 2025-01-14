import { useState, useEffect } from "react";
import axios from "axios";

export default function AdvancedResearch() {

    // state
    const [data, setData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchName, setSearchName] = useState("");

    // fetch
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3008/api/doctors");
            const doctors = response.data;
            setData(response.data);

            // Estrai i reparti senza duplicati
            const UniqueDepartments = [...new Set(doctors.map(doctor => doctor.department))];
            setDepartments(UniqueDepartments);

        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        fetchData();
    }, []);

    // form handle
    function handleFormSubmit(e) {
        e.preventDefault();

        applyFilters(selectedDepartment, searchName);
    };

    // department handle
    function handleDepartmentChange(e) {
        setSelectedDepartment(e.target.value);
    };

    // name handle
    function handleNameChange(e) {
        setSearchName(e.target.value);
    };

    function applyFilters(department, name) {
        const filtered = data.filter((doctor) => {
            const matchesDepartment = department ? doctor.department === department : true;
            const matchesName = name ? doctor.name.toLowerCase().includes(name.toLowerCase()) : true;
            return matchesDepartment && matchesName;
        });
        setFilteredDoctors(filtered);
    };

    return (
        <>
            <div className="container">
                <form className="row g-3 needs-validation mt-3" onSubmit={handleFormSubmit}>

                    {/* Select */}
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

                    {/* Search bar */}
                    <div className="col mb-3">
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

                    <button type="submit" className="btn btn-sm btn-primary" >Submit</button>
                </form>

                <div className="mt-4">
                    {filteredDoctors.length > 0 ? (
                        <div className="row">
                            {filteredDoctors.map((doctor) => (
                                <div className="col-md-4 mb-3" key={doctor.id}>
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {doctor.name} {doctor.last_name}
                                            </h5>
                                            <p className="card-text">
                                                <strong>Email:</strong> {doctor.email}
                                            </p>
                                            <p className="card-text">
                                                <strong>Department:</strong> {doctor.department}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>


        </>
    );
};