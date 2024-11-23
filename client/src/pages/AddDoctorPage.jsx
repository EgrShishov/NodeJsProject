import AddDoctorForm from "../components/AddDoctorForm.jsx";
import {createDoctor} from "../services/doctorsService.js";
import {toast} from "react-toastify";

const AddDoctorPage = () => {
    const handleAddClick = async (data) => {
        try {
            const response = await createDoctor(data);
            toast.success(`Врач ${data.doctors_first_name} ${data.doctors_middle_name} ${data.doctors_first_name} создан.`)
        } catch (error){
            toast.error(`Ошибка при создании нового врача: ${error.message}`);
        }
    }

    return (
        <div className="add-doctor-page">
            <AddDoctorForm onSubmit={handleAddClick}/>
        </div>
    );
};

export default AddDoctorPage;