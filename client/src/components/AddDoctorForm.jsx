import {Component} from "react";
import {getAllSpecializations} from "../services/specializationsService.js";
import {useNavigate} from "react-router-dom";

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
        this.handleSelectSpecialization = this.handleSelectSpecialization.bind(this);
    }

    validateForm() {
        const { doctors_first_name, doctors_last_name, doctors_middle_name, birthday_date, email, career_start_year, specializationId } = this.state;
        //return doctors_first_name && doctors_last_name && doctors_middle_name && birthday_date && email && career_start_year && specializationId;
        return true;
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
            this.props.onSubmit({
                doctors_first_name: this.state.doctors_first_name,
                doctors_last_name: this.state.doctors_last_name,
                doctors_middle_name: this.state.doctors_middle_name,
                birthday_date: this.state.birthday_date,
                email: this.state.email,
                career_start_year: this.state.career_start_year,
                specializationId: this.state.specializationId,
            });
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

    handleSelectSpecialization(e) {
        const specId = e.target.value;
        this.setState({
            specializationId: specId || '',
        });
    }

    render() {
        const {
            doctors_first_name,
            doctors_last_name,
            doctors_middle_name,
            birthday_date,
            email,
            career_start_year,
            specializationId,
            formValid,
            specializations
        } = this.state;

        return (
            <div className="add-doctor-form">
                <form onSubmit={this.handleSubmit}>
                    <h2>Создать аккаунт врача</h2>

                    <div className="form-field">
                        <label>Фамилия врача:</label><br/>
                        <input
                            type="text"
                            name="doctors_last_name"
                            value={doctors_last_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label>Имя врача:</label><br/>
                        <input
                            type="text"
                            name="doctors_first_name"
                            value={doctors_first_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label>Отчество врача:</label><br/>
                        <input
                            type="text"
                            name="doctors_middle_name"
                            value={doctors_middle_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label>День рождения:</label><br/>
                        <input
                            type="date"
                            name="birthday_date"
                            value={birthday_date}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label>Адрес электронной почты:</label><br/>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label>Год начала карьеры:</label><br/>
                        <input
                            type="number"
                            name="career_start_year"
                            value={career_start_year}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label>Специализация:</label><br/>
                        <select value={specializationId} onChange={this.handleSelectSpecialization} required>
                            <option value="">Выберите специализацию</option>
                            {specializations.length > 0 &&
                                specializations.map((spec) => (
                                    <option
                                        value={spec._id}
                                        key={spec._id}>{spec.SpecializationName}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <button type="submit" disabled={!formValid}>Создать врача</button>
                </form>
            </div>
        )
    }
}

export default AddDoctorForm;