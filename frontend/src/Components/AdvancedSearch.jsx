import { useState, useEffect } from "react";
import axios from "axios";

export default function AdvancedResearch() {

    // state
    const [data, setData] = useState([]);
    const [departments, setDepartments] = useState([]);
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
    }, [])

    return (
        <>
            <div className="container">
                <form className="row g-3 needs-validation mt-3">
                    <div className="col-md-3">
                        <label htmlFor="department" className="form-label">Department</label>
                        <select className="form-select" id="department" required style={{ fontSize: "14px" }}>

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
                        <div className="invalid-feedback">
                            Please select a valid state.
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};