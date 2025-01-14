import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {

    const initialFormData = {
        name: '',
        last_name: '',
        department: '',
        email: '',
        phone_number: '',
        address: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const apiUrl = 'http://localhost:3008';

    function HandleFormSubmit(e) {
        e.preventDefault()

        //validazione dati
        if (formData.name.length < 3) {
            setError('Name length must be longer than 3!');
        } else if (formData.last_name.length < 3) {
            setError('Lastname length must be longer than 3!');
        } else if (formData.address.length < 5) {
            setError('Lastname length must be longer than 5!');
        } else if ((formData.name.length || formData.last_name.length || formData.department.length || formData.email.length || formData.phone_number.length || formData.address.length) === 0) {
            setError('Fields values cannot be empty!');
        }

        fetch(`${apiUrl}/api/doctors`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-type': 'Application/json' }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                navigate('/');
            })
            .catch(err => console.error(err)
            )

        setFormData(initialFormData)
    }

    function handleFormField(e) {
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <div className="container border border-1 rounded py-4 my-5">

                <form onSubmit={HandleFormSubmit} className="p-4">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            aria-describedby="helpId"
                            placeholder="Insert your name"
                            required
                            value={formData.name}
                            onChange={handleFormField}
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Lastname*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            id="last_name"
                            aria-describedby="helpId"
                            placeholder="Insert your lastname"
                            required
                            value={formData.last_name}
                            onChange={handleFormField}
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">Department*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="department"
                            id="department"
                            aria-describedby="helpId"
                            placeholder="Insert your department"
                            required
                            value={formData.department}
                            onChange={handleFormField}
                        />

                    </div>

                    {/*<select className="form-select" aria-label="Default select example">
                    <option selected>Department*</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>*/}

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email*</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            aria-describedby="helpId"
                            placeholder="Insert your email"
                            required
                            value={formData.email}
                            onChange={handleFormField}
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone_number" className="form-label">Phone number*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone_number"
                            id="phone_number"
                            aria-describedby="helpId"
                            placeholder="Insert your phone number"
                            required
                            value={formData.phone_number}
                            onChange={handleFormField}
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Last Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            id="last_name"
                            aria-describedby="helpId"
                            placeholder="Insert your last name"
                            required
                            value={formData.last_name}
                            onChange={handleFormField}
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            id="address"
                            aria-describedby="helpId"
                            placeholder="Insert your address"
                            required
                            value={formData.address}
                            onChange={handleFormField}
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            id="description"
                            aria-describedby="helpId"
                            placeholder="Insert your description"
                            value={formData.description}
                            onChange={handleFormField}
                        />

                    </div>

                    <button type="submit" className="btn btn-success d-block m-auto">Login</button>

                    {error && <span className="text-danger mx-2">{error}</span>}
                </form>
            </div>
        </>
    )
}