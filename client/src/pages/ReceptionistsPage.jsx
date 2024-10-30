import AddDoctorForm from "../components/AddDoctorForm.jsx";
import AddPatientForm from "../components/AddPatientForm.jsx";
import AddReceptionistForm from "../components/AddReceptionistForm.jsx";
import AddAppointmentForm from "../components/AddAppointmentForm.jsx";
import AddProcedureForm from "../components/AddProcedureForm.jsx";
import AddResultsForm from "../components/AddResultsForm.jsx";
import AddServiceForm from "../components/AddServiceForm.jsx";
import AddPrescriptionForm from "../components/AddPrescriptionForm.jsx";

const ReceptionistsPage = () => {
    return (
        <div className="receptionists">
            <AddDoctorForm />
            <AddPatientForm />
            <AddReceptionistForm />
            <AddAppointmentForm />
            <AddProcedureForm />
            <AddResultsForm />
            <AddServiceForm />
            <AddPrescriptionForm />
        </div>
    );
};

export default ReceptionistsPage;