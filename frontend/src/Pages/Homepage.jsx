import { useState, useEffect } from "react";
import Jumbotron from "../Components/jumbotron";
import { Link } from "react-router-dom";

export default function Homepage() {
    const [doctors, setDoctors] = useState();
    useEffect(() => {
        fetch('http://localhost:3008/api/doctors')
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                setDoctors(data)
            })
    }, [])



    return (
        <>
            <Jumbotron />

            <div className="container">
                <div className="row">
                    {doctors ? doctors.map(doctor => (
                        <div className="col" key={doctor.id}>
                            <Link to={`/${doctor.id}`}>
                                <div className="card">
                                    <div className="card-body">
                                        <p>{doctor.name}</p>
                                        <p>{doctor.last_name}</p>
                                        <p>{doctor.department}</p>
                                        <p>{doctor.email}</p>
                                        <p>{doctor.phone_number}</p>
                                        <p>{doctor.address}</p>
                                        <p>{doctor.description}</p>
                                        <p>{doctor.cv}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )) : (
                        <p>error</p>
                    )}
                </div>
            </div>
        </>
    );
}