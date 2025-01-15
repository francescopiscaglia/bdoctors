import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DoctorPage() {
    const [doctorDetails, setDoctorDetails] = useState(null); // variables for doctor's details
    const [doctorReviews, setDoctorReviews] = useState([]); // variables for reviews
    const { id } = useParams();

    // chiamata per doctor.id
    const fetchDocDetails = (id) => {
        fetch(`http://localhost:3008/api/doctors/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.doctor);
                console.log(data.reviews);
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
    const cvUrl = `http://localhost:3008/uploads/DOCTOR.pdf`; // works with link hardcoded to the crash course file

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">

                        {/* doctor's details */}
                        <div className="card p-3 my-3">
                            <h3>{doctorDetails.name} {doctorDetails.last_name}</h3>
                            <p><strong>Specialized in: </strong>{doctorDetails.department}</p>
                            <p><strong>E-mail address: </strong>{doctorDetails.email}</p>
                            <p><strong>Phone number: </strong>{doctorDetails.phone_number}</p>
                            <p><strong>Address: </strong>{doctorDetails.address}</p>
                            <p><strong>Description: </strong>{doctorDetails.description}</p>
                        </div>

                        {/* cv preview */}
                        <h3>My Curriculum Vitae:</h3>
                        <div className="card p-3 my-3">
                            <a href={cvUrl} className="text-decoration-none" target="_blank">View my CV</a>
                        </div>

                        {/* reviews */}
                        <h3>My patients' reviews:</h3>
                        {doctorReviews.length === 0 ? (
                            <div className="card p-3 my-3">
                                <p>No reviews yet</p>
                            </div>
                        ) : (
                            doctorReviews.map((review) => (
                                <div className="card p-3 my-3" key={review.id}>
                                    <p>
                                        <strong>User: </strong>{review.username}
                                    </p>
                                    <p>
                                        <strong>Rating: </strong>{review.rating}/5
                                    </p>
                                    <p>
                                        <strong>Comment: </strong>{review.review_text}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}