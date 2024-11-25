import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {getAllPatients} from '../services/patientsService.js';
import {getAllDoctors} from '../services/doctorsService.js';
import {getAllOffices} from "../services/officesService.js";
import {getServices} from "../services/servicesService.js";
import {toast} from "react-toastify";
import {getAllProcedures} from "../services/proceduresService.js";

const AddAppointmentModal = ({ isOpen, onClose, onSubmit, patient, doctor, day, date, time}) => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [offices, setOffices] = useState([]);
    const [services, setServices] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [formData, setFormData] = useState({
        PatientId: patient?.patient_id,
        DoctorId: doctor?.doctor_id,
        AppointmentDate: date,
        AppointmentTime: time,
        OfficeId: '',
        ServiceId: '',
        ProcedureId: '',
    });

    const fetchData = async() => {
        try {
            const officesData = await getAllOffices();
            const servicesData = await getServices();
            const proceduresData = await getAllProcedures();

            setOffices(officesData);
            setServices(servicesData);
            setProcedures(proceduresData)
            if (!patient) {
                const patientData = await getAllPatients();
                console.log(patientData);
                if (patientData) setPatients(patientData);
            }
            if (!doctor) {
                const doctorData = await getAllDoctors();
                if(doctorData) setDoctors(doctorData);
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
                DoctorId: doctor?.doctor_id,
                PatientId: patient?.patient_id,
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
        console.log(formData);
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
                ProcedureId: '',
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
                            <option key={patient.patient_id} value={formData.PatientId}>
                                {patient.last_name} {patient.first_name} {patient?.middle_name}
                            </option>
                        ) : (
                            <>
                                <option value="">Выберите пациента</option>
                                {patients.map((patient) => (
                                    <option key={patient.patient_id} value={patient.patient_id}>
                                        {patient.last_name} {patient.first_name} {patient?.middle_name}
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
                            <option key={doctor.doctor_id} value={formData.DoctorId}>
                                {doctor.last_name} {doctor.first_name} {doctor?.middle_name}
                            </option>
                        ) : (
                            <>
                                <option value="">Выберите доктора</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.doctor_id} value={doctor.doctor_id}>
                                        {doctor.last_name} {doctor.first_name} {doctor?.middle_name}
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
                            <option key={office.office_id} value={office.office_id}>
                                {office.country}, {office.city},
                                Address: {office.street} {office.street_number},
                                OfficeBlock: {office.office_number},
                                Phone: {office.phone_number}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Нужная услуга:</label>
                    <select name="ServiceId" value={formData.ServiceId} onChange={handleChange} required>
                        <option value="">Выберите услугу</option>
                        {services.map((service) => (
                            <option key={service.service_id} value={service.service_id}>
                                {service.service_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Нужная процедура:</label>
                    <select name="ProcedureId" value={formData.ProcedureId} onChange={handleChange} required>
                        <option value="">Выберите процедуру</option>
                        {procedures.map((proc) => (
                            <option key={proc.procedure_id} value={proc.procedure_id}>
                                {proc.procedure_name}
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