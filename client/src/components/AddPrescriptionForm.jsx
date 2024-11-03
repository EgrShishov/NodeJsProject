import {Component} from "react";
import {getAllDoctors} from "../services/doctorsService.js";
import {getAllPatients} from "../services/patientsService.js";

class AddPrescriptionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prescription_date: '',
            doctor_id: '',
            patient_id: '',
            medication: '',
            dosage: '',
            duration: 0,
            doctors: [],
            patients: [],
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { prescription_date, doctor_id, patient_id, medication, dosage, duration } = this.state;
        return prescription_date && doctor_id && patient_id && medication && dosage && duration;
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const doctors = await getAllDoctors();
        const patients = await getAllPatients();

        if (doctors && patients) {
            this.setState({ patients: patients, doctors: doctors });
        }
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
                prescription_date: '',
                doctor_id: '',
                patient_id: '',
                medication: '',
                dosage: '',
                duration: 0,
                formValid: false
            });
        }
    }

    render() {
        const {
            prescription_date,
            doctor_id,
            patient_id,
            medication,
            dosage,
            duration,
            doctors,
            patients,
            formValid
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Назначить рецепт</h2>

                    <div>
                        <label>Дата назначения:</label><br/>
                        <input
                            type="date"
                            name="prescription_date"
                            value={prescription_date}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Препарат:</label><br/>
                        <input
                            type="text"
                            name="medication"
                            value={medication}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Доза:</label><br/>
                        <input
                            type="text"
                            name="dosage"
                            value={dosage}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Показание:</label><br/>
                        <input
                            type="text"
                            name="duration"
                            value={duration}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Пациент:</label><br/>
                        <select>
                            <option value="">Выберите пациента</option>
                            {patients.length > 0 ? (
                                patients.map((patient) => (
                                    <option
                                        value={patient._id}
                                        key={patient._id}>{patient.FirstName} {patient.MiddleName} {patient.LastName}
                                    </option>
                                ))
                            ) : (
                                <option>Loading patients...</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <label>Врач:</label><br/>
                        <select>
                            <option value="">Выберите врача</option>
                            {doctors.length > 0 ? (
                                doctors.map((doctor) => (
                                    <option
                                        value={doctor._id}
                                        key={doctor._id}>{doctor.FirstName} {doctor.MiddleName} {doctor.LastName}
                                    </option>
                                ))
                            ) : (
                                <option>Loading doctors...</option>
                            )}
                        </select>
                    </div>

                    <button type="submit" disabled={!formValid}>Назначить рецепт</button>
                </form>
            </div>
        )
    }
}

export default AddPrescriptionForm;