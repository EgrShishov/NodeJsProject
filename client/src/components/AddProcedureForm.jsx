import {Component} from "react";

class AddProcedureForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            procedure_name: '',
            description: '',
            procedure_cost: 0,
            formValid: false
        };
    }

    validateForm() {
        const { procedure_name, procedure_cost, description } = this.state;
        return procedure_name && procedure_cost && description;
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
                procedure_name: this.state.procedure_name,
                description: this.state.description,
                procedure_cost: this.state.procedure_cost
            });
            this.setState({
                procedure_name: '',
                procedure_cost: 0,
                description: '',
                formValid: false
            });
        }
    }

    render() {
        const {
            procedure_name,
            description,
            procedure_cost,
            formValid
        } = this.state;

        return (
            <div className="procedure-form-component">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Название процедуры:</label><br/>
                        <input
                            type="text"
                            className="input-field"
                            name="procedure_name"
                            value={procedure_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Описание:</label><br/>
                        <input
                            type="text"
                            className="input-field"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Стоимость:</label><br/>
                        <input
                            type="number"
                            className="input-field"
                            name="procedure_cost"
                            value={procedure_cost}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={!formValid}
                    >Добавить процедуру</button>
                </form>
            </div>
        )
    }
}

export default AddProcedureForm;