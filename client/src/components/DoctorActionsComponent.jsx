import {Component} from "react";

class DoctorActions extends Component {
    handleViewPatients = () => {
        this.props.onViewPatients();
    };

    handleAddResults = () => {
        this.props.onAddResults();
    };

    handleAddPrescription = () => {
        this.props.onAddPrescription();
    };

    handleShowSchedule = () => {
        this.props.onViewSchedule();
    };

    render() {
        return (
            <div className="doctors-actions">
                <button className="submit-btn" onClick={this.handleViewPatients}>Просмотр пациентов</button>
                <button className="submit-btn" onClick={this.handleAddPrescription}>Назначить рецепт</button>
                <button className="submit-btn" onClick={this.handleAddResults}>Добавить результаты</button>
                <button className="submit-btn" onClick={this.handleAddResults}>Просмотр результатов</button>
                <button className="submit-btn" onClick={this.handleShowSchedule}>Расписание</button>
            </div>
        );
    }
}

export default DoctorActions;