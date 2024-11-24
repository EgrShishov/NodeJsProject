import {useEffect, useState} from 'react';
import {getAllPatients} from "../services/patientsService.js";
import {getAllDoctors} from "../services/doctorsService.js";
import {getAppointments} from "../services/appointmentsService.js";
import {createResult} from "../services/resultsService.js";
import Modal from "react-modal";
import {toast, ToastContainer} from "react-toastify";

const AddResultModal = ({ isOpen, onClose, onSubmit }) => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
    const [complaints, setComplaints] = useState('');
    const [recommendations, setRecommendations] = useState('');
    const [conclusion, setConclusion] = useState('');
    const [resultFile, setResultFile] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const patientsData = await getAllPatients();
            const doctorsData = await getAllDoctors();
            const appointmentsData = await getAppointments();

            setPatients(patientsData);
            setDoctors(doctorsData);
            setAppointments(appointmentsData);
        } catch (error) {
            toast.error(`Ошибка загрузки данных: ${error.message}`);
        }
    };

  /*  const handlePatientChange = (e) => {
        const patientId = e.target.value;
        setSelectedPatientId(patientId);

        const patientAppointments = appointments.filter(app => app.PatientId === patientId);
        setAppointments(patientAppointments);

        if (patientAppointments.length > 0) {
            setSelectedAppointmentId(patientAppointments[0]._id);
            const doctorId = patientAppointments[0].DoctorId;
            setSelectedDoctorId(doctorId);
        } else {
            setSelectedAppointmentId('');
            setSelectedDoctorId('');
        }
    };

    const handleAppointmentChange = (e) => {
        const appointmentId = e.target.value;
        setSelectedAppointmentId(appointmentId);

        const selectedAppointment = appointments.find(app => app._id === appointmentId);
        if (selectedAppointment) {
            setSelectedPatientId(selectedAppointment.PatientId);
            setSelectedDoctorId(selectedAppointment.DoctorId);
        }
    };

    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        setSelectedDoctorId(doctorId);

        const doctorAppointments = appointments.filter(app => app.DoctorId === doctorId);
        setAppointments(doctorAppointments);

        if (doctorAppointments.length > 0) {
            setSelectedAppointmentId(doctorAppointments[0]._id);
            setSelectedPatientId(doctorAppointments[0].PatientId);
        } else {
            setSelectedAppointmentId('');
            setSelectedPatientId('');
        }
    };*/

    const handleFileChange = (e) => {
        setResultFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('PatientId', selectedPatientId);
        formData.append('DoctorId', selectedDoctorId);
        formData.append('AppointmentId', selectedAppointmentId);
        formData.append('Complaints', complaints);
        formData.append('Recommendations', recommendations);
        formData.append('Conclusion', conclusion);
        if (resultFile) {
            formData.append('file', resultFile);
        }

        onSubmit(formData);
/*        try {
            const response = await createResult(formData);
            if (response) {
                onClose();
                toast.success('Результаты обследования успешно созданы!');
            }
        } catch (error) {
            toast.error(`Ошибка создания результата обследования: ${error.message}`);
        }*/
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
                <h2>Добавить результат</h2>

                <form onSubmit={handleSubmit}>
                    <label>Пациент:</label>
                    <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)} required>
                        <option value="">Выберите пациента</option>
                        {patients && (
                            patients.map(patient => (
                                <option key={patient.patient_id} value={patient.patient_id}>
                                    {patient.first_name} {patient.middle_name} {patient.last_name}
                                </option>
                            )))}
                    </select>

                    <label>Врач:</label>
                    <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} required>
                        <option value="">Выберите врача</option>
                        {doctors && (
                            doctors.map(doctor => (
                                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                                    {doctor.first_name} {doctor.middle_name} {doctor.last_name}
                                </option>
                            )))}
                    </select>

                    <label>Встреча:</label>
                    <select value={selectedAppointmentId} onChange={(e) => setSelectedAppointmentId(e.target.value)} required>
                        <option value="">Выберите встречу</option>
                        {appointments.map(app => (
                            <option key={app.appointment_id} value={app.appointment_id}>
                                {new Date(app.appointment_date).toLocaleDateString()} — {app.appointment_time}
                            </option>
                        ))}
                    </select>

                    <label>Жалобы:</label>
                    <input
                        type="text"
                        className="input-field"
                        value={complaints}
                        onChange={(e) => setComplaints(e.target.value)}
                        required
                    />

                    <label>Рекомендации:</label>
                    <input
                        type="text"
                        className="input-field"
                        value={recommendations}
                        onChange={(e) => setRecommendations(e.target.value)}
                        required/>

                    <label>Заключение:</label>
                    <input
                        type="text"
                        className="input-field"
                        value={conclusion}
                        onChange={(e) => setConclusion(e.target.value)}
                        required
                    />

                    <label>Загрузить файл:</label>
                    <input
                        type="file"
                        name="resultFile"
                        className="input-field"
                        onChange={handleFileChange}
                    />

                    <div className="modal-btns">
                        <button className="submit-btn" type="submit">Добавить результат</button>
                        <button className="cancel-btn" type="button" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddResultModal;
