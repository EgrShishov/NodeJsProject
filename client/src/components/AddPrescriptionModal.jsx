import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getAllPatients } from '../services/patientsService.js';
import { getAllDoctors } from '../services/doctorsService.js';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPrescriptionModal = ({ isOpen, onClose, onSubmit, doctor }) => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        PatientId: '',
        DoctorId: '',
        Medication: '',
        Dosage: '',
        Duration: '',
        PrescriptionDate: ''
    });

    const fetchData = async () => {
        try {
            const patientData = await getAllPatients();
            const doctorData = await getAllDoctors();
            setPatients(patientData);
            setDoctors(doctorData);
        } catch (error) {
            toast.error(`Ошибка загрузки данных: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (doctor) {
            setFormData((prevData) => ({
                ...prevData,
                DoctorId: doctor._id,
            }));
        }
    }, [doctor]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.PatientId) newErrors.PatientId = "Выберите пациента.";
        if (!formData.DoctorId) newErrors.DoctorId = "Выберите доктора.";
        if (!formData.Medication.trim()) newErrors.Medication = "Укажите лекарство.";
        if (!formData.Dosage.trim()) newErrors.Dosage = "Укажите дозировку.";
        if (!formData.Duration || formData.Duration <= 0) newErrors.Duration = "Укажите продолжительность (положительное число).";
        if (!formData.PrescriptionDate) newErrors.Duration = "Укажите дату выдачи рецепта";
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('mama');
        const formErrors = validateForm();
        console.log('mama2');
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error("Исправьте ошибки в форме.");
        } else {
            console.log(formData);
            onSubmit(formData);
            onClose();
            setFormData({
                PatientId: '',
                DoctorId: '',
                Medication: '',
                Dosage: '',
                Duration: '',
                PrescriptionDate: '',
            });
            setErrors({});
        }
    };

    return (
        <>
            <ToastContainer />
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Добавить рецепт"
                className="modal"
                overlayClassName="modal-overlay"
                ariaHideApp={false}
            >
                <h2>Добавить рецепт</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Пациент:</label>
                        <select
                            name="PatientId"
                            value={formData.PatientId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Выберите пациента</option>
                            {patients.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.LastName} {patient.FirstName} {patient.MiddleName}
                                </option>
                            ))}
                        </select>
                        {errors.PatientId && <div className="error">{errors.PatientId}</div>}
                    </div>

                    <div>
                        <label>Доктор:</label>
                        <select
                            name="DoctorId"
                            value={formData.DoctorId}
                            onChange={handleChange}
                            required
                        >
                            {doctor ? (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.LastName} {doctor.FirstName} {doctor.MiddleName}
                                </option>
                            ) : (
                                <>
                                    <option value="">Выберите доктора</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor._id} value={doctor._id}>
                                            {doctor.LastName} {doctor.FirstName} {doctor.MiddleName}
                                        </option>
                                    ))}
                                </>
                            )}
                        </select>
                        {errors.DoctorId && <div className="error">{errors.DoctorId}</div>}
                    </div>

                    <div>
                        <label>Лекарство:</label>
                        <input
                            type="text"
                            className="input-field"
                            name="Medication"
                            value={formData.Medication}
                            onChange={handleChange}
                            required
                        />
                        {errors.Medication && <div className="error">{errors.Medication}</div>}
                    </div>

                    <div>
                        <label>Дозировка:</label>
                        <input
                            type="text"
                            className="input-field"
                            name="Dosage"
                            value={formData.Dosage}
                            onChange={handleChange}
                            required
                        />
                        {errors.Dosage && <div className="error">{errors.Dosage}</div>}
                    </div>

                    <div>
                        <label>Продолжительность (дней):</label>
                        <input
                            type="number"
                            className="input-field"
                            name="Duration"
                            value={formData.Duration}
                            onChange={handleChange}
                            required
                        />
                        {errors.Duration && <div className="error">{errors.Duration}</div>}
                    </div>

                    <div>
                        <label>Дата назначения:</label>
                        <input
                            type="date"
                            className="input-field"
                            name="PrescriptionDate"
                            value={formData.PrescriptionDate}
                            onChange={handleChange}
                            required
                        />
                        {errors.Duration && <div className="error">{errors.PrescriptionDate}</div>}
                    </div>

                    <button className="submit-btn" onClick={handleSubmit}>Добавить рецепт</button>
                    <button className="cancel-btn" onClick={onClose}>
                        Отмена
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default AddPrescriptionModal;