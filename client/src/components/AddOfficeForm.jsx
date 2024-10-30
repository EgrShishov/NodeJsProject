import {Component} from "react";

class AddOfficeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: '',
            region: '',
            city: '',
            street: '',
            street_number: '',
            office_number: '',
            phone_number: '',
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { country, region, city, street, street_number, office_number, phone_number } = this.state;
        return country && region && city && street && street_number && office_number && phone_number;
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
                country: '',
                region: '',
                city: '',
                street: '',
                street_number: '',
                office_number: '',
                phone_number: '',
                formValid: false
            });
        }
    }

    render() {
        const {
            country,
            region,
            city,
            street,
            street_number,
            office_number,
            phone_number,
            formValid
        } = this.state;

        return (
            <div className="office-form-component">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Страна:</label><br/>
                        <input
                            type="text"
                            name="country"
                            value={country}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Город:</label><br/>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Область:</label><br/>
                        <input
                            type="text"
                            name="region"
                            value={region}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Улица:</label><br/>
                        <input
                            type="text"
                            name="street"
                            value={street}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Номер улица:</label><br/>
                        <input
                            type="text"
                            name="street_number"
                            value={street_number}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Номер оффиса:</label><br/>
                        <input
                            type="text"
                            name="office_number"
                            value={office_number}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Номер телефона оффиса:</label><br/>
                        <input
                            type="text"
                            name="phone_number"
                            value={phone_number}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <button type="submit" disabled={!formValid}>Добавить процедуру</button>
                </form>
            </div>
        )
    }
}

export default AddOfficeForm;