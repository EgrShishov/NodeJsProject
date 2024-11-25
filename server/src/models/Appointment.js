const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.getAllAppointments = async () => {
    const results = await sequelize.query(`
        SELECT
            a.appointment_id,
            a.appointment_date,
            a.appointment_time,
            p.first_name AS patient_first_name,
            p.last_name AS patient_last_name,
            p.middle_name AS patient_middle_name,
            d.first_name AS doctors_first_name,
            d.last_name AS doctors_last_name,
            d.middle_name AS doctors_middle_name,
            o.city AS office_city,
            o.region AS office_region,
            o.street AS office_street,
            o.street_number AS office_number,
            s.service_name AS service_name
        FROM Appointments a
             JOIN Patients p ON a.patient_id = p.patient_id
             JOIN Doctors d ON d.doctor_id = a.doctor_id
             JOIN Services s ON s.service_id = a.service_id
             JOIN Offices o ON o.office_id = a.office_id
        ORDER BY a.appointment_time;`,
        {
        type: QueryTypes.SELECT
    });
    return results;
};

exports.getAppointmentById = async (id) => {
    const results = await sequelize.query(`
        SELECT
            a.appointment_date,
            a.appointment_time,
            p.first_name AS patient_first_name,
            p.last_name AS patient_last_name,
            p.middle_name AS patient_middle_name,
            d.first_name AS doctors_first_name,
            d.last_name AS doctors_last_name,
            d.middle_name AS doctors_middle_name,
            o.city AS office_city,
            o.region AS office_region,
            o.street AS office_street,
            o.street_number AS office_number,
            s.service_name AS service_name
        FROM Appointments a
             JOIN Patients p ON a.patient_id = p.patient_id
             JOIN Doctors d ON d.doctor_id = a.doctor_id
             JOIN Services s ON s.service_id = a.service_id
             JOIN Offices o ON o.office_id = a.office_id
        WHERE a.appointment_id = ?
        ORDER BY a.appointment_time;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results;
}

exports.getPaginatedAppointments = async (pageNo, itemsPerPage) => {
    const results = await sequelize.query(`
        DECLARE appointment_cursor CURSOR WITH HOLD FOR
        SELECT
            a.appointment_id,
            a.appointment_date,
            a.appointment_time,
            p.first_name AS patients_first_name,
            p.last_name AS patients_last_name,
            d.first_name AS doctors_first_name,
            d.last_name AS doctors_last_name,
            o.phone_number AS office_phone_number
        FROM Appointments AS a
                 JOIN Patients AS p ON (a.patient_id=p.patient_id)
                 JOIN Doctors AS d ON (a.doctor_id=d.doctor_id)
                 JOIN Offices AS o ON (a.office_id=o.office_id)
        ORDER BY a.appointment_date DESC;
        FETCH FORWARD ? IN appointment_cursor;`,
        {
            replacements: [itemsPerPage],
            type: QueryTypes.SELECT
        });
    return results;
};

exports.getBusySlotsByDoctor = async (id) => {
    const results = await sequelize.query(`
        SELECT
            a.appointment_id,
            a.appointment_date,
            a.appointment_time,
            p.first_name,
            p.last_name,
            p.middle_name,
            a.is_approved,
            o.country,
            o.city,
            o.street,
            o.street_number,
            o.phone_number
        FROM Appointments a
        JOIN Patients p on p.patient_id = a.patient_id
        JOIN Offices o on o.office_id = a.office_id
        WHERE a.doctor_id = ?
        ORDER BY a.appointment_time;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
    });
    return results;
};

exports.getAppointmentHistory = async (patientId) => {
    const results = await sequelize.query(
        `SELECT
        a.appointment_id,
        a.appointment_date,
        a.appointment_time,
        p.first_name AS patients_first_name,
        p.last_name AS patients_last_name,
        d.first_name AS doctors_first_name,
        d.last_name AS doctors_last_name,
        o.phone_number AS office_phone_number
        FROM Appointments AS a
            JOIN Patients AS p ON a.patient_id = p.patient_id
            JOIN Doctors AS d ON a.doctor_id = d.doctor_id
            JOIN Offices AS o ON a.office_id = o.office_id
        WHERE a.patient_id = ?
        ORDER BY a.appointment_date DESC`,
        {
            replacements: [patientId],
            type: QueryTypes.SELECT
        }
    );

    return results;
};

exports.getPatientAppointments = async (patientId) => {
    const results = await sequelize.query( `
        SELECT
        a.appointment_id,
        a.appointment_date,
        a.appointment_time,
        a.is_approved,
        d.first_name AS doctors_first_name,
        d.last_name AS doctors_last_name,
        d.middle_name AS doctors_middle_name,
        p.first_name AS patients_first_name,
        p.last_name AS patients_last_name,
        p.middle_name AS patients_middle_name
        FROM Appointments a
            JOIN Patients p ON a.patient_id = p.patient_id
            JOIN Doctors d ON d.doctor_id = a.doctor_id
        WHERE a.patient_id = ?;`,
        {
            replacements: [patientId],
            type: QueryTypes.SELECT
        });

    return results;
};

exports.getDoctorsSchedule = async (doctorId) => {
    const results = await sequelize.query(`
        SELECT
        a.appointment_id,
        a.appointment_date,
        a.appointment_time,
        p.first_name AS patient_first_name,
        p.last_name AS patient_last_name,
        p.middle_name AS patient_middle_name,
        d.first_name AS doctors_first_name,
        d.last_name AS doctors_last_name,
        d.middle_name AS doctors_middle_name,
        o.city AS office_city,
        o.region AS office_region,
        o.street AS office_street,
        o.street_number AS office_number,
        s.service_name AS service_name
        FROM Appointments a
            JOIN Patients p ON a.patient_id = p.patient_id
            JOIN Doctors d ON d.doctor_id = a.doctor_id
            JOIN Services s ON s.service_id = a.service_id
            JOIN Offices o ON o.office_id = a.office_id
        WHERE a.doctor_id = ?
        ORDER BY a.appointment_time;`,
        {
            replacements: [doctorId],
            type: QueryTypes.SELECT
        }
    );

    return results;
};

exports.getDoctorsUpcomingAppointments = async (doctorId) => {
    const results  = await sequelize.query(`
    SELECT 
        a.appointment_id,
        a.appointment_date, 
        a.appointment_time, 
        p.first_name, 
        p.last_name, 
        p.middle_name
    FROM Appointments a
        JOIN Patients p ON a.patient_id = p.patient_id
    WHERE a.doctor_id = ? AND a.appointment_date >= CURRENT_DATE
    ORDER BY a.appointment_date, a.appointment_time;`,
        {
            replacements: [doctorId],
            type: QueryTypes.SELECT
        }
    );

    return results;
};

exports.getProceduresForAppointments = async (patientId, appointmentDate) => {
    const results =  await sequelize.query(
        `SELECT
            a.appointment_id,
            a.appointment_time,
            d.first_name AS doctor_first_name,
            d.last_name AS doctor_last_name,
            s.service_name,
            mp.procedure_name,
            mp.procedure_cost
        FROM Appointments a
            JOIN Doctors d ON a.doctor_id = d.doctor_id
            JOIN Services s ON a.service_id = s.service_id
            LEFT JOIN AppointmentProcedures ap ON a.appointment_id = ap.appointment_id
            LEFT JOIN MedicalProcedures mp ON ap.procedure_id = mp.procedure_id
        WHERE a.patient_id = ?
        AND a.appointment_date = ?
        ORDER BY a.appointment_time;`,
        {
            replacements: [patientId, appointmentDate],
            type: QueryTypes.SELECT
        });

    return results;
};

exports.getPreviousPatientsAppointments = async (patientId) => {
    const results = await sequelize.query(`
        SELECT DISTINCT
            a.appointment_id,
            a.appointment_date,
            a.appointment_time,
            a_alias.appointment_date AS previous_appointment_date,
            a_alias.appointment_time AS previous_appointment_time,
            d.first_name AS doctors_first_name,
            d.last_name AS doctors_last_name,
            d.middle_name AS doctors_middle_name
        FROM Appointments AS a
        LEFT JOIN Appointments AS a_alias
            ON a_alias.appointment_date < a.appointment_date
            OR (a_alias.appointment_date = a.appointment_date
                AND a_alias.appointment_time < a.appointment_time)
        JOIN Doctors AS d ON d.doctor_id = a.doctor_id
        WHERE a.is_approved = true
        AND a.patient_id = ?
        ORDER BY a.appointment_date DESC;`,
        {
            replacements: [patientId],
            type: QueryTypes.SELECT
        }
    );
    return results;
};

exports.getAppointmentsPerDoctor = async () => {
    const results = await sequelize.query(`
        SELECT
            COUNT(a.appointment_id) AS appointments_count,
            d.first_name,
            d.last_name,
            d.middle_name
        FROM Appointments AS a
        JOIN Doctors AS d ON a.doctor_id = d.doctor_id
        GROUP BY d.doctor_id;`,
        {
            type: QueryTypes.SELECT
        }
    );

    return results;
};

exports.appointmentHistoryForPatient = async (patientId) => {
    const results = await sequelize.query(`
        SELECT
            a.appointment_id,
            a.appointment_date, a.appointment_time,
            o.country, o.city, o.street_number, o.street, o.office_number, o.phone_number
        FROM appointments a
        JOIN patients p ON a.patient_id = p.patient_id
        JOIN offices o ON o.office_id = a.office_id
        WHERE p.patient_id = ?
        ORDER BY a.appointment_date DESC, a.appointment_time DESC;`,
        {
            replacements: [patientId],
            type: QueryTypes.SELECT
        }
    );
};

exports.createAppointment = async (data) => {
    const results = await sequelize.query(`
        CALL create_new_appointment(:p_patient_id, :p_doctor_id, :p_office_id, :p_service_id, :date, :p_procedure_id, :time);`,
        {
            replacements: {
                p_patient_id: data.patient_id,
                p_doctor_id: data.doctor_id,
                p_office_id: data.office_id,
                p_service_id: data.service_id,
                date: data.appointment_date,
                p_procedure_id: data.procedure_id,
                time: data.appointment_time
            },
            type: QueryTypes.INSERT
        }
    );
    return results;
};

exports.updateStatus = async (id, status) => {
    const results = await sequelize.query(`
        UPDATE Appointments
        SET is_approved = ?
        WHERE appointment_id = ?;`,
        {
            replacements: [status, id],
            type: QueryTypes.UPDATE
        }
    );

    return results[0];
};

exports.cancelAppointment = async (id) => {
    const results  = await sequelize.query(`
        CALL cancel_appointment(:id);`,
        {
            replacements:{
                id: id
            },
            type: QueryTypes.UPDATE
        });
    return results[0];
}

exports.updateAppointment = async (id, data) => {
    const results = await sequelize.query(`
        UPDATE Appointments
        SET appointment_date = ?, 
            appointment_time = ?,
        WHERE appointment_id = ? AND is_approved = false;`,
        {
            replacements: [data.appointment_date, data.appointment_time, id],
            type: QueryTypes.UPDATE
        }
    );

    return results[0];
};

exports.deleteAppointment = async (id) => {
    const results = await sequelize.query(`
        DELETE FROM Appointments
        WHERE appointment_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });
    return results[0];
};