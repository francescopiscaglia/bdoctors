import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AddReview({ formData, setFormData, initialFormData }) {

    const apiUrl = 'http://localhost:3008';

    // hooks
    const [error, setError] = useState(null);
    const { id } = useParams();


    function HandleFormSubmit(e) {
        e.preventDefault()

        if (!formData.username) {
            setError('Username required');
        } else if (!formData.rating || Number(formData.rating) < 0 || Number(formData.rating) > 5) {
            setError('Rating must be between 0 and 5');
        } else if (!formData.review_text) {
            setError('Review required');
        } else {

            fetch(`${apiUrl}/api/doctors//review/${id}`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData),
            })
                .then(res => res.json())
                .then(response => {
                    setFormData(response);
                })
                .catch(err => console.error(err))

            setFormData(initialFormData)
        };
    };

    function handleFormField(e) {
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <div className="container border border-1 rounded py-4 my-5">


                <form onSubmit={HandleFormSubmit} className="p-2">

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">



                        {/* name */}
                        <div className="mb-3 col">
                            <label htmlFor="name" className="form-label">Username*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                id="username"
                                aria-describedby="helpId"
                                placeholder="Insert your username"
                                required
                                value={formData.username}
                                onChange={handleFormField}
                            />

                        </div>

                        {/* lastname */}
                        <div className="mb-3 col">
                            <label htmlFor="rating" className="form-label">Rating*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rating"
                                id="rating"
                                aria-describedby="helpId"
                                placeholder="Between 0 to 5"
                                required
                                value={formData.rating}
                                onChange={handleFormField}
                            />

                        </div>


                        <div className="mb-3 col">
                            <label htmlFor="review_text" className="form-label">Type your review</label>
                            <input
                                type="textarea"
                                className="form-control"
                                name="review_text"
                                id="review_text"
                                aria-describedby="helpId"
                                placeholder="Review..."
                                required
                                value={formData.review_text}
                                onChange={handleFormField}
                            />

                        </div>


                    </div>

                    <button type="submit" className="btn submit d-block">Add review</button>

                    {error && <span className="text-danger mx-2">{error}</span>}
                </form>
            </div>
        </>
    )
}