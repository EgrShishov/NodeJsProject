import {Component} from "react";
import {getAllSpecializations} from "../services/specializationsService.js";

class AddDoctorForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doctors_first_name: '',
            doctors_last_name: '',
            doctors_middle_name: '',
            birthday_date: '',
            career_start_year: '',
            specializationId: '',
            email: '',
            specializations: [],
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { doctors_first_name, doctors_last_name, doctors_middle_name, birthday_date, email, career_start_year, specializationId } = this.state;
        return doctors_first_name && doctors_last_name && doctors_middle_name && birthday_date && email && career_start_year && specializationId;
    }

    componentDidMount() {
        this.fetchSpecializations();
    }

    async fetchSpecializations() {
        const data = await getAllSpecializations();
        if (data) {
            this.setState({ specializations: data });
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
                doctors_first_name: '',
                doctors_last_name: '',
                doctors_middle_name: '',
                birthday_date: '',
                email: '',
                career_start_year: '',
                specializationId: '',
                formValid: false
            });
        }
    }

    render() {
        const {
            doctors_first_name,
            doctors_last_name,
            doctors_second_name,
            birthday_date,
            email,
            career_start_year,
            specializationId,
            formValid,
            specializations
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Создать аккаунт врача</h2>

                    <div>
                        <label>Имя врача:</label><br/>
                        <input
                            type="text"
                            name="doctors_first_name"
                            value={doctors_first_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Фамилия врача:</label><br/>
                        <input
                            type="text"
                            name="doctors_last_name"
                            value={doctors_last_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Отчество врача:</label><br/>
                        <input
                            type="text"
                            name="doctors_middle_name"
                            value={doctors_second_name}
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

                    <div>
                        <label>Год начала карьеры:</label><br/>
                        <input
                            type="number"
                            name="career_start_year"
                            value={career_start_year}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Специализация:</label><br/>
                        <select>
                            <option value="">Выберите специализацию</option>
                            {specializations.length > 0 ? (
                                specializations.map((spec) => (
                                    <option
                                        value={spec._id}
                                        key={spec._id}>{spec.SpecializationName}
                                    </option>
                                ))
                            ) : (
                                <option>Loading specializations...</option>
                            )}
                        </select>
                    </div>

                    <button type="submit" disabled={!formValid}>Создать врача</button>
                </form>
            </div>
        )
    }
}

export default AddDoctorForm;