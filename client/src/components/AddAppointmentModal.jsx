import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {getAllPatients} from '../services/patientsService.js';
import {getAllDoctors} from '../services/doctorsService.js';
import {getAllOffices} from "../services/officesService.js";
import {getServices} from "../services/servicesService.js";
import {toast} from "react-toastify";

const AddAppointmentModal = ({ isOpen, onClose, onSubmit, patient, doctor, day, date, time}) => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [offices, setOffices] = useState([]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        PatientId: patient?._id,
        DoctorId: doctor?._id,
        AppointmentDate: date,
        AppointmentTime: time,
        OfficeId: '',
        ServiceId: '',
    });

    const fetchData = async() => {
        try {
            const officesData = await getAllOffices();
            const servicesData = await getServices();

            setOffices(officesData);
            setServices(servicesData);
            if (!patient) {
                const patientData = await getAllPatients();
                setPatients(patientData);
            }
            if (!doctor) {
                const doctorData = await getAllDoctors();
                setDoctors(doctorData);
            }
        } catch (error){
            toast.error(`Ошибка в получении данных для формы: ${error.message}`);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (doctor) {
            setFormData((prevData) => ({
                ...prevData,
                DoctorId: doctor?._id,
                PatientId: patient?._id,
            }));
        }
    }, [doctor, patient]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.PatientId && formData.DoctorId && formData.OfficeId && formData.AppointmentDate && formData.AppointmentTime && formData.ServiceId) {
            onSubmit(formData);
            onClose();
            setFormData({
                PatientId: '',
                DoctorId: '',
                AppointmentDate: '',
                AppointmentTime: '',
                OfficeId: '',
                ServiceId: '',
            });
        } else {
            toast.error(`Заполните все поля`);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Забронировать встречу"
            className="modal"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <h3>Подтвердить встречу</h3>
            <p>
                Вы выбрали <strong>{day}</strong> on{" "}
                <strong>{date}</strong> в{" "}
                <strong>{time}</strong>.
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Пациент:</label>
                    <select name="PatientId" value={formData.PatientId} onChange={handleChange} required>
                        {patient ? (
                            <option key={patient._id} value={patient._id}>
                                {patient.LastName} {patient.FirstName} {patient.MiddleName}
                            </option>
                        ) : (
                        <>
                            <option value="">Выберите пациента</option>
                            {patients.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.LastName} {patient.FirstName} {patient.MiddleName}
                                </option>
                            ))}
                        </>
                        )}
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
                    <label>Оффис:</label>
                    <select name="OfficeId" value={formData.OfficeId} onChange={handleChange} required>
                        <option value="">Выберите оффис</option>
                        {offices.map((office) => (
                            <option key={office._id} value={office._id}>
                                {office.Country}, {office.City},
                                Address: {office.Street} {office.StreetNumber},
                                OfficeBlock: {office.OfficeNumber},
                                Phone: {office.PhoneNumber}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Нужная услуга:</label>
                    <select name="ServiceId" value={formData.ServiceId} onChange={handleChange} required>
                        <option value="">Выберите услугу</option>
                        {services.map((service) => (
                            <option key={service._id} value={service._id}>
                                {service.ServiceName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="submit-btn" onClick={handleSubmit}>
                        Подтвердить
                    </button>
                    <button className="cancel-btn" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddAppointmentModal;