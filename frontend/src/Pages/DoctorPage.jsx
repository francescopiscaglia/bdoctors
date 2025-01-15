import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleDoc from "../Components/SingleDoc";
import ReviewCard from "../Components/ReviewCard";
import SingleDocCard from "../Components/SingleDocCard";

export default function DoctorPage() {
    const [doctorDetails, setDoctorDetails] = useState(null); // variables for doctor's details
    const [doctorReviews, setDoctorReviews] = useState([]); // variables for reviews
    const { id } = useParams();

    // chiamata per doctor.id
    const fetchDocDetails = (id) => {
        fetch(`http://localhost:3008/api/doctors/${id}`)
            .then(res => res.json())
            .then(data => {
                setDoctorDetails(data.doctor);
                setDoctorReviews(data.reviews);
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

    // cv static link
    const cvUrl = `http://localhost:3008/uploads/${doctorDetails.cv}`; // works with link hardcoded to the crash course file

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">

                        {/* doctor card */}
                        <SingleDocCard doctorDetails={doctorDetails} />


                        {/* cv preview */}
                        <div className="card p-3 my-3 doc-card">
                            <h3>My Curriculum Vitae:</h3>
                            <embed src={cvUrl}
                                type="application/pdf" />
                        </div>

                        {/* reviews */}
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                            {doctorReviews.map(review => (

                                <ReviewCard key={review.id} review={review} />

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}