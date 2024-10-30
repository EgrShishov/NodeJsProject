import {Component} from "react";

class AddAppointmentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patients_first_name: '',
            patients_last_name: '',
            patients_middle_name: '',
            appointment_date: '',
            appointment_time: '',
            doctor_full_name: '',
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { patients_first_name, patients_last_name, patients_second_name, appointment_date, appointment_time, doctor_full_name } = this.state;
        return patients_first_name && patients_last_name &&
            patients_second_name && appointment_date && appointment_time && doctor_full_name;
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

    handleSubmit(e){
        e.preventDefault();
        if (this.state.formValid){
            this.setState({
                patients_first_name: '',
                patients_last_name: '',
                patients_middle_name: '',
                appointment_date: '',
                appointment_time: '',
                doctor_full_name: '',
                formValid: false
            });
        }
    }

    render() {
        const { patients_first_name, patients_last_name, patients_second_name, appointment_date, appointment_time, doctor_full_name, formValid} = this.state;

        return (
            <div className="appointment-form">
                <form onSubmit={this.handleSubmit}>
                    <h2>Забронировать консультацию</h2>

                    <div>
                        <label>Имя пациента:</label><br/>
                        <input
                            type="text"
                            name="patientFirstName"
                            value={patients_first_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="patientLastName"
                            value={patients_last_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="patientSecondName"
                            value={patients_second_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Дата:</label><br/>
                        <input
                            type="date"
                            name="date"
                            value={appointment_date}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Время:</label><br/>
                        <input
                            type="time"
                            name="time"
                            value={appointment_time}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Доктор:</label><br/>
                        <input
                            type="text"
                            name="doctor"
                            value={doctor_full_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <button type="submit" disabled={!formValid}>Забронировать</button>
                </form>
            </div>
        );
    }
}

export default AddAppointmentForm;