import {Component} from "react";

class AddPatientForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patients_first_name: '',
            patients_last_name: '',
            patients_middle_name: '',
            birthday_date: '',
            email: '',
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { patients_first_name, patients_last_name, patients_middle_name, birthday_date ,email } = this.state;
        return patients_first_name && patients_last_name && patients_middle_name && birthday_date && email;
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
                patients_first_name: '',
                patients_last_name: '',
                patients_middle_name: '',
                birthday_date: '',
                email: '',
                formValid: false
            });
        }
    }

    render() {
        const {
            patients_first_name,
            patients_last_name,
            patients_second_name,
            birthday_date,
            email,
            formValid
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Создать аккаунт пациента</h2>

                    <div>
                        <label>Имя пациента:</label><br/>
                        <input
                            type="text"
                            name="patients_first_name"
                            value={patients_first_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Фамилия пациента:</label><br/>
                        <input
                            type="text"
                            name="patients_last_name"
                            value={patients_last_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Отчество пациента:</label><br/>
                        <input
                            type="text"
                            name="patients_second_name"
                            value={patients_second_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>День рождения:</label><br/>
                        <input
                            type="date"
                            name="birthday_date"
                            value={birthday_date}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Адресс электронной почты:</label><br/>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <button type="submit" disabled={!formValid}>Создать пациента</button>
                </form>
            </div>
        )
    }
}

export default AddPatientForm;