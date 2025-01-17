import { useState, useEffect } from "react";
import SpecializationFilter from '../Components/SpecializationFilter'
import Jumbotron from "../Components/jumbotron";



export default function Homepage() {
    const [doctors, setDoctors] = useState();
    useEffect(() => {
        fetch('http://localhost:3008/api/doctors')
            .then(res => res.json())
            .then(data => {
                setDoctors(data)
            })
    }, []);



    return (
        <>
            <Jumbotron />

            <SpecializationFilter />
        </>
    );
};