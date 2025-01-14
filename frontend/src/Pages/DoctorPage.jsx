import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DoctorPage() {
    const [doctorDetails, setDoctorDetails] = useState(null);
    const { id } = useParams();

    // chiamata per doctor.id
    const fetchDocDetails = (id) => {
        fetch(`http://localhost:3008/api/doctors/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDoctorDetails(data.doctor);
            })
            .catch(error => {
                console.error(error, `Error fetching doctor's data`);
            })
    }

    // useEffect
    useEffect(() => {
        fetchDocDetails(id);
    }, [id])

    if (!doctorDetails) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <p>
                pagina dettagli dottore
            </p>
            <p>
                {doctorDetails.name}
            </p>
            <p>
                pagina dettagli dottore
            </p>
        </>
    )
}