import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {

    const initialFormData = {
        name: '',
        last_name: '',
        email: '',
        department: '',
        phone_number: '',
        address: '',
        description: ''
    };

    // hooks
    const [doctors, setDoctors] = useState("");
    const [formData, setFormData] = useState(initialFormData);
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const apiUrl = 'http://localhost:3008';

    function HandleFormSubmit(e) {
        e.preventDefault()

        // Validazione dati
        if (formData.name.length < 3) {
            setError('Name must contain at least 3 characters!');
        } else if (formData.last_name.length < 3) {
            setError('Last name must contain at least 3 characters!');
        } else if (formData.address.length < 5) {
            setError('Address must contain at least 5 characters!');
        } else if (formData.phone_number.includes("+") && formData.phone_number.indexOf("+") !== 0) {
            setError('Phone number is not valid or the ' + ' symbol is not at the beginning.');
        } else if (formData.email.length > 254) {
            setError('Email not valid');
        } else if ((formData.name.length || formData.last_name.length || formData.department.length || formData.email.length || formData.phone_number.length || formData.address.length) === 0) {
            setError('Fields values cannot be empty!');

        } else {

            fetch(`${apiUrl}/api/doctors`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData),
            })
                .then(res => {
                    return res.json();
                })
                .then(response => {
                    console.log(response);
                    setFormData(response)

                    // Verifica se l'email esiste già nel database
                    if (formData.email.exists) {
                        setError('Email already exist');
                        return;
                    }

                    if (response) {
                        setSuccess(true)
                        alert('Doctor added successfully')
                        navigate('/');
                    } else {
                        setSuccess(false)
                        alert('Ops! something wrong happened')
                    }
                })
                .catch(err => console.error(err))

            setFormData(initialFormData)
        }

    }

    useEffect(() => {
        fetch(`${apiUrl}/api/doctors`)
            .then(response => response.json())
            .then(response => {
                const allDoctors = response || [];

                setDoctors(allDoctors);

                const departmentsList = [
                    ...new Set(allDoctors.map((doctor) => doctor.department)),
                ];

                setDepartments(departmentsList);
            })
            .catch(err => console.error("Error loading departments:", err));
    }, [success]);

    function handleFormField(e) {
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    const handleDepartmentChange = (e) => {
        const department = e.target.value;


        setFormData((formData) => ({
            ...formData,
            department: department
        }));
        setSelectedDepartment(department);


        setSelectedDepartment(department);
        setFormData({ ...formData, department });

    };

    return (
        <>
            <div className="container border border-1 rounded py-4 my-5">

                <h1 className="text-center">Are you a doctor? Fill out the form and register on our website.</h1>

                <form onSubmit={HandleFormSubmit} className="p-4">

                    {/* name */}
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

                    {/* lastname */}
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

                    {/* department */}
                    {<div className="mb-3">
                        <label htmlFor="department" className="form-label">
                            Select a Department*:
                        </label>
                        <select
                            id="department"
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            className="form-select"
                            required
                        >
                            <option value="">-- No Filter --</option>
                            {departments.map((department, index) => (
                                <option key={index} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select>
                    </div>}

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email*</label>
                        <input
                            type="text"
                            pattern="[A-z0-9\.\+-]+@[A-z0-9\.-]+\.[A-z]{2,6}"
                            title="Like abc123@gmail.com"
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
                            pattern="^\+?[0-9]+$"
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

                    <button type="submit" className="btn submit d-block m-auto">Add</button>

                    {error && <span className="text-danger mx-2">{error}</span>}
                </form>
            </div>
        </>
    )
}