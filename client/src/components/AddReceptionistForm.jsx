import {Component} from "react";
import {getAllSpecializations} from "../services/specializationsService.js";

class AddReceptionistForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            receptionists_first_name: '',
            receptionists_last_name: '',
            receptionists_middle_name: '',
            birthday_date: '',
            email: '',
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { receptionists_first_name, receptionists_last_name, receptionists_middle_name, birthday_date, email } = this.state;
        return receptionists_first_name && receptionists_last_name && receptionists_middle_name && birthday_date && email;
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
                receptionists_first_name: '',
                receptionists_last_name: '',
                receptionists_middle_name: '',
                birthday_date: '',
                email: '',
                formValid: false
            });
        }
    }

    render() {
        const {
            recepionists_first_name,
            recepionists_last_name,
            recepionists_second_name,
            birthday_date,
            email,
            formValid,
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Создать аккаунт регистратора</h2>

                    <div>
                        <label>Имя регистратора:</label><br/>
                        <input
                            type="text"
                            name="receptionsitFirstName"
                            value={recepionists_first_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Фамилия регистратора:</label><br/>
                        <input
                            type="text"
                            name="receptionistLastName"
                            value={recepionists_last_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Отчество регистратора:</label><br/>
                        <input
                            type="text"
                            name="receptionistSecondName"
                            value={recepionists_second_name}
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

                    <button type="submit" disabled={!formValid}>Создать регистратора</button>
                </form>
            </div>
        )
    }
}

export default AddReceptionistForm;