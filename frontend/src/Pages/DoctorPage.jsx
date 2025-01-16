import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../Components/ReviewCard";
import SingleDocCard from "../Components/SingleDocCard";
import AddReview from "../Components/AddReview";

export default function DoctorPage() {

    const initialFormData = {
        username: '',
        rating: '',
        review_text: ""
    };

    const [doctorDetails, setDoctorDetails] = useState(null); // variables for doctor's details
    const [doctorReviews, setDoctorReviews] = useState([]); // variables for reviews
    const [formData, setFormData] = useState(initialFormData);

    const { slug } = useParams();
    //console.log('Slug trovato:', slug);

    // chiamata per doctor.slug
    const fetchDocDetails = (slug) => {
        fetch(`http://localhost:3008/api/doctors/${slug}`)
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
        fetchDocDetails(slug);
    }, [slug, formData])

    if (!doctorDetails) {
        return <p>Loading...</p>;
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">

                        {/* doctor card */}
                        <SingleDocCard doctorDetails={doctorDetails} doctorReviews={doctorReviews} />

                        <AddReview formData={formData} setFormData={setFormData} initialFormData={initialFormData} />

                        {/* reviews */}
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 mb-4">
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