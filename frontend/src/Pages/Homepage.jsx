import { useState, useEffect } from "react";

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
            <div className="container">
                <div className="row">
                    {doctors ? doctors.map(doctor => (
                        <div className="col" key={doctor.id}>
                            <div className="card">
                                <div className="card-body">
                                    <p>{doctor.name}</p>
                                    <p>{doctor.last_name}</p>
                                    <p>{doctor.department}</p>
                                    <p>{doctor.email}</p>
                                    <p>{doctor.phone_number}</p>
                                    <p>{doctor.addres}</p>
                                    <p>{doctor.description}</p>
                                    <p>{doctor.cv}</p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p>error</p>
                    )}
                </div>
            </div>
        </>
    );
}