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
                <button className="action-button" onClick={this.handleViewPatients}>Просмотр пациентов</button>
                <button className="action-button" onClick={this.handleAddPrescription}>Назначить рецепт</button>
                <button className="action-button" onClick={this.handleAddResults}>Добавить результаты</button>
                <button className="action-button" onClick={this.handleShowSchedule}>Расписание</button>
            </div>
        );
    }
}

export default DoctorActions;