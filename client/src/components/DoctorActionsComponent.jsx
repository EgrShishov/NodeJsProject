import React, {Component} from "react";

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
            <div className="doctor-actions">
                <button onClick={this.handleViewPatients}>View Patients</button>
                <button onClick={this.handleAddPrescription}>Add Prescription</button>
                <button onClick={this.handleAddResults}>Add Results</button>
                <button onClick={this.handleShowSchedule}>Schedule</button>
            </div>
        );
    }
}