import {Component} from "react";
import {getAllDoctors, getDoctorById} from "../services/doctorsService.js";
import {getAppointmentById, getAppointments} from "../services/appointmentsService.js";
import {getAllPatients, getPatientById} from "../services/patientsService.js";

class AddResultsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patientId: '',
            doctorId: '',
            appointmentId: '',
            documentId: '',
            complaints: '',
            recommendations: '',
            conclusion: '',
            document: '',
            patients: [],
            doctors: [],
            appointments: [],
            documents: [],
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectAppointment = this.handleSelectAppointment.bind(this);
        this.handleSelectPatient = this.handleSelectPatient.bind(this);
        this.handleSelectDoctor = this.handleSelectDoctor.bind(this);
    }

    validateForm() {
        const { patientId, doctorId, appointmentId, documentId, complaints, recommendations, conclusion } = this.state;
        return patientId && doctorId && appointmentId && documentId && complaints && recommendations && conclusion;
    }

    componentDidMount() {
        this.fetchDataForMedicalResults();
    }

    async fetchDataForMedicalResults() {
        const appointments = await getAppointments();
        const patients = await getAllPatients();
        const doctors = await getAllDoctors();

        this.setState({ appointments: appointments, doctors: doctors, patients: patients });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState(
            { [name]: value },
            () => {
                this.setState({ formValid: this.validateForm() });
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.formValid) {
            this.setState({
                patientId: '',
                doctorId: '',
                appointmentId: '',
                documentId: '',
                complaints: '',
                recommendations: '',
                conclusion: '',
                document: '',
                formValid: false
            });
        }
    }

    async handleSelectDoctor(e) {
        const doctorId = e.target.value;
        const doctorAppointments = this.state.appointments.filter(a => a.DoctorId === doctorid);

        this.setState({doctorId: doctorId, patientId: '', appointmentId: '', complaints: '', recommendations: '', formValid: false});
        if (doctorAppointments.length === 1) {
            const appointment = doctorAppointments[0];
            const patientData = await getPatientById(appointment.patientId);

            this.setState({
                appointmentId: appointment._id,
                patientId: patientData?._id || '',
                complaints: appointment.complaints || '',
                recommendations: appointment.recommendations || '',
                conclusion: appointment.conclusion || '',
                document: '',
                formValid: this.validateForm()
            });
        }
    }

    async handleSelectPatient(e) {
        const patientId = e.target.value;
        const patientAppointments = this.state.appointments.filter(a => a.PatientId === patientId);

        this.setState({ patientId: patientId, doctorId: '', appointmentId: '', complaints: '', recommendations: '', conclusion: '', formValid: false });

        if (patientAppointments.length === 1) {
            const appointment = patientAppointments[0];
            const doctorData = await getDoctorById(appointment.doctorId);

            this.setState({
                appointmentId: appointment._id,
                doctorId: doctorData?._id || '',
                complaints: appointment.complaints || '',
                recommendations: appointment.recommendations || '',
                conclusion: appointment.conclusion || '',
                formValid: this.validateForm()
            });
        }
    }

    async handleSelectAppointment(e) {
        const appointmentId = e.target.value;
        const appointmentData = await getAppointmentById(appointmentId);

        if (appointmentData) {
            const patientData = await getPatientById(appointmentData.patientId);
            const doctorData = await getDoctorById(appointmentData.doctorId);

            this.setState({
                appointmentId,
                patientId: patientData?._id || '',
                doctorId: doctorData?._id || '',
                complaints: appointmentData.complaints || '',
                recommendations: appointmentData.recommendations || '',
                conclusion: appointmentData.conclusion || '',
                formValid: this.validateForm()
            });
        }
    }

    async handleDocumentSelected(e) {
        //
    }

    render() {
        const {
            patientId,
            doctorId,
            appointmentId,
            documentId,
            complaints,
            recommendations,
            conclusion,
            document,
            patients,
            doctors,
            appointments,
            formValid
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Добавить результаты консультации</h2>

                    <div>
                        <label>Пациент:</label><br/>
                        <select name="patientId" value={patientId} onChange={this.handleSelectPatient} required>
                            <option value="">Выберите пациента</option>
                            {patients ? (
                                patients.map(patient => (
                                    <option key={patient._id} value={patient._id}>
                                        {patient.FirstName} {patient.LastName}
                                    </option>
                                ))) : (
                                    <div>Loading patients...</div>
                                )}
                        </select>
                    </div>

                    <div>
                        <label>Врач:</label><br/>
                        <select name="doctorId" value={doctorId} onChange={this.handleSelectDoctor} required>
                            <option value="">Выберите врача</option>
                            {doctors ? (
                                doctors.map(doctor => (
                                    <option key={doctor._id} value={doctor._id}>
                                        {doctor.FirstName} {doctor.LastName}
                                    </option>
                            ))) : (
                                <div>Loading doctors...</div>
                            )}
                        </select>
                    </div>

                    <div>
                        <label>Приём:</label><br/>
                        <select name="appointmentId" value={appointmentId} onChange={this.handleSelectAppointment}
                                required>
                            <option value="">Выберите приём</option>
                            {appointments ? (
                                appointments.map(app => (
                                <option key={app._id} value={app._id}>
                                    Прием от {app.AppointmentDate} {app.AppointmentTime}
                                </option>
                            ))) : (
                                <div>Loading appointments...</div>
                            )}
                        </select>
                    </div>

                    <div>
                        <label>Жалобы: </label><br/>
                        <input
                            type="text"
                            name="complaints"
                            value={complaints}
                            onChange={this.handleChange}
                            readOnly={Boolean(appointmentId)}
                            required
                        />
                    </div>

                    <div>
                        <label>Рекомендации: </label><br/>
                        <input
                            type="text"
                            name="recommendations"
                            value={recommendations}
                            onChange={this.handleChange}
                            readOnly={Boolean(appointmentId)}
                            required
                        />
                    </div>

                    <div>
                        <label>Заключение:</label><br/>
                        <input
                            type="text"
                            name="conclusion"
                            value={conclusion}
                            onChange={this.handleChange}
                            readOnly={Boolean(appointmentId)}
                            required
                        />
                    </div>

                    <div>
                        <label>Прикрепленные файлы: </label><br/>
                        <input
                            type="file"
                        />
                    </div>

                    <button type="submit" disabled={!formValid}>Добавить результаты</button>
                </form>
            </div>
        )
    }
}

export default AddResultsForm;