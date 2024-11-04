import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getAllPatients } from '../services/patientsService.js';
import { getAllDoctors } from '../services/doctorsService.js';

const AddPrescriptionModal = ({ isOpen, onClose, onSubmit, doctor }) => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        PatientId: '',
        DoctorId: '',
        Medication: '',
        Dosage: '',
        Duration: '',
    });

    const fetchData = async() => {
        const patientData = await getAllPatients();
        const doctorData = await getAllDoctors();
        setPatients(patientData);
        setDoctors(doctorData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.PatientId && formData.DoctorId && formData.Medication && formData.Dosage && formData.Duration) {
            onSubmit(formData);
            onClose();
            setFormData({
                PatientId: '',
                DoctorId: '',
                Medication: '',
                Dosage: '',
                Duration: '',
            });
        } else {
            setError(`Заполните все поля`);
        }
    };

    return (
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
                {error && (<div className="error">{error}</div>)}
                <div>
                    <label>Пациент:</label>
                    <select name="PatientId" value={formData.PatientId} onChange={handleChange} required>
                        <option value="">Выберите пациента</option>
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.LastName} {patient.FirstName} {patient.MiddleName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Доктор:</label>
                    <select name="DoctorId" value={formData.DoctorId} onChange={handleChange} required>
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
                </div>

                <button className="submit-btn" type="submit">Добавить рецепт</button>
                <button className="cancel-btn" type="button" onClick={onClose}>Отмена</button>
            </form>
        </Modal>
    );
};

export default AddPrescriptionModal;