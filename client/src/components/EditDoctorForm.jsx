import { useState, useEffect } from "react";
import { editDoctor, getDoctorById } from "../services/doctorsService.js";
import { useParams, useNavigate } from "react-router-dom";

const EditDoctorForm = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        specialization: '',
        experience: 0,
        email: ''
    });

    useEffect(() => {
        const fetchDoctor = async () => {
            const doctor = await getDoctorById(doctorId);
            setFormData(doctor);
        };
        fetchDoctor();
    }, [doctorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editDoctor(doctorId, formData);
        navigate('/doctors');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Редактировать врача</h2>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Имя врача" required />
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Фамилия врача" required />
            <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} placeholder="Отчество врача" required />
            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Специализация" required />
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="Стаж" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default EditDoctorForm;
