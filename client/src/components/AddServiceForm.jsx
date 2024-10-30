import {Component} from "react";
import {getAllServiceCategories} from "../services/serviceCategoriesService.js";

class AddServiceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            service_name: '',
            service_category_id: '',
            serviceCategories: [],
            is_active: '',
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        const { service_name, service_category_id, is_active } = this.state;
        return service_name && service_category_id && is_active;
    }

    componentDidMount() {
        this.fetchCategories();
    }

    async fetchCategories() {
        const data = await getAllServiceCategories();
        if (data) {
            this.setState({ serviceCategories: data });
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
                service_name: '',
                service_category_id: '',
                serviceCategories: [],
                is_active: '',
                formValid: false
            });
        }
    }

    render() {
        const {
            service_name,
            serviceCategories,
            is_active,
            formValid
        } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Добавить сервис</h2>

                    <div>
                        <label>Название:</label><br/>
                        <input
                            type="text"
                            name="service_name"
                            value={service_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Статус:</label><br/>
                        <input
                            type="checkbox"
                            name="is_active"
                            value={is_active}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Категория:</label><br/>
                        <select>
                            <option value="">Выберите категорию</option>
                            {serviceCategories.length > 0 ? (
                                serviceCategories.map((category) => (
                                    <option
                                        value={category._id}
                                        key={category._id}>{category.CategoryName}
                                    </option>
                                ))
                            ) : (
                                <option>Loading categories...</option>
                            )}
                        </select>
                    </div>

                    <button type="submit" disabled={!formValid}>Создать сервис</button>
                </form>
            </div>
        )
    }
}

export default AddServiceForm;