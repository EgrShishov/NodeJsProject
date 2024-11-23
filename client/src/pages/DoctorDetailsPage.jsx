import {useEffect, useState} from "react";
import {getDoctorById} from "../services/doctorsService.js";
import DoctorScheduleComponent from "../components/DoctorScheduleComponent.jsx";
import {useParams} from "react-router-dom";
import {getDoctorsSchedule} from "../services/appointmentsService.js";
import {createAppointment} from "../services/appointmentsService.js";
import {useAuth} from "../context/AuthContext.jsx";
import {toast} from "react-toastify";
import {getOfficeById} from "../services/officesService.js";
import {getServiceById} from "../services/servicesService.js"

const DoctorDetailsPage = () => {
    const [doctorProfile, setDoctorProfile] = useState(null);
    const [slots, setSlots] = useState(null);
    const [name, setName] = useState('');
    const [experience, setExperience] = useState(0);
    const [doctorDetails, setDoctorDetails] = useState(null); // For storing doctor details
    const doctorsId  = useParams();
    const {user} = useAuth();

    const fetchDoctorProfile = async () => {
        const profile = await getDoctorById(doctorsId.id);
        if (!profile) toast.error(`Ошибка в получении профиля врача`);

        setDoctorProfile(profile);

        setName(`${profile.FirstName} ${profile.MiddleName} ${profile.LastName}`);

        const currentYear = new Date().getFullYear();
        const experience = currentYear - profile.CareerStartYear;

        setExperience(experience);
        setDoctorDetails({
            id: profile._id,
            name: name,
            office: profile.officeId,
            serviceName: profile.ServiceId,
        });
    };

    const fetchDoctorsSchedule = async (id) => {
        const data = await getDoctorsSchedule(id);
        if (data) setSlots(data);
    };

    useEffect(() => {
        fetchDoctorProfile();
        fetchDoctorsSchedule(doctorsId.id);
    }, [doctorsId]);

    const workingHours = {
        Monday: { start: '09:00', end: '17:00' },
        Tuesday: { start: '09:00', end: '17:00' },
        Wednesday: { start: '09:00', end: '17:00' },
        Thursday: { start: '09:00', end: '17:00' },
        Friday: { start: '09:00', end: '15:00' },
        Saturday: { start: '08:00', end: '13:00' },
        Sunday: { start: '08:00', end: '13:00' },
    };

    const handleNewAppointmentBooked = async (appointmentDetails) => {
        try {
            const data = {
                PatientId: user._id,
                DoctorId: appointmentDetails.doctorId,
                OfficeId: appointmentDetails.officeId,
                ServiceId: appointmentDetails.serviceId,
                AppointmentDate: appointmentDetails.date,
                AppointmentTime: appointmentDetails.time,
            };
            const response = await createAppointment(data);
            if (response) {
                toast.success(
                    `Вы успешно забронировали консультацию на ${appointmentDetails.date} в ${appointmentDetails.time}`
                );
            } else {
                toast.error(`Что-то пошло не так при бронировании. Попробуйте ещё раз.`);
            }
        } catch (error) {
            toast.error(`Ошибка при создании встречи: ${error.message}`);
        }
    };

    console.log(doctorProfile);

    return (
        <div className="doctor-details">
            { doctorProfile ? (
                <>
                    <div className="doctor-card__info">
                        <h3 className="doctor-card__name">{name}</h3>
                        <img className="doctor-card__image" src={doctorProfile.UserId?.urlPhoto} alt={`${name}'s profile pic`}/>
                        <p className="doctor-card__specialization">{doctorProfile.SpecializationId?.SpecializationName}</p>
                        <p className="doctor-card__experience">{experience} лет опыта</p>

                    </div>
                    {
                        slots ? (
                            <DoctorScheduleComponent
                                doctorDetails={doctorProfile}
                                onAppointmentBooked={handleNewAppointmentBooked}
                                workingHours={workingHours}
                                bookedSlots={slots}
                            />
                        ) : (
                            <div className="loader"></div>
                        )
                    }
                </>
            ) : (
                <div className="loader"></div>
            )}
        </div>
    );
};

export default DoctorDetailsPage;