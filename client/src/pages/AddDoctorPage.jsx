import AddDoctorForm from "../components/AddDoctorForm.jsx";
import {createDoctor} from "../services/doctorsService.js";

const AddDoctorPage = () => {
    const handleAddClick = async (data) => {
        const response = await createDoctor(data);
        console.log(response);
    }

    return (
        <div className="add-doctor-page">
            <AddDoctorForm onSubmit={handleAddClick}/>
        </div>
    );
};

export default AddDoctorPage;