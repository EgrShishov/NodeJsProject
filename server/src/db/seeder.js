const {sequelize} = require('../db/connection');

exports.seedDatabase = async () => {
    try {
        await sequelize.query(
            `INSERT INTO Roles (role_name)
            VALUES
            ('receptionist'),
            ('doctor'),
            ('patient');`
        );

        await sequelize.query(
            `INSERT INTO Offices (country, region, city, street, street_number, office_number, phone_number)
            VALUES
            ('Belarus', 'Minsk', 'Minsk', 'Yakuba Kolasa', 28, 1106, '+375445717021'),
            ('Belarus', 'Mogilev', 'Mogilev', 'Nezavisimosti', 10, 32, '+375445717021'),
            ('Belarus', 'Mogilev', 'Horki', 'Zaslonova', 138, 2, '+375445717021'),
            ('Belarus', 'Minsk', 'Soligorsk', 'Nepokorennyx', 23, 43, '+375445717021'),
            ('Belarus', 'Grodno', 'Grodno', 'Sovetskaya', 55, 15, '+375445717022'),
            ('Belarus', 'Brest', 'Brest', 'Pushkinskaya', 1, 101, '+375445717023');`
        );

        await sequelize.query(
            `INSERT INTO Users (user_name, email, phone_number, is_email_verified, password_hash, role_id)
            VALUES
            ('rosto4eks', 'rosto4eks@gmail.com', '+375445717021', TRUE, 'hash1', (SELECT role_id FROM Roles WHERE role_name = 'patient')),
            ('statham', 'statham@gmail.com', '+375445717021', TRUE,'hash2', (SELECT role_id FROM Roles WHERE role_name = 'patient')),
            ('pupsik228', 'pupsik228@gmail.com', '+375445717021', FALSE, 'hash3', (SELECT role_id FROM Roles WHERE role_name = 'patient')),
            ('yarik1337', 'yarik1337@gmail.com', '+375445717021', FALSE, 'hash4', (SELECT role_id FROM Roles WHERE role_name = 'doctor')),
            ('messi10', 'messi10@gmail.com', '+375445717021', TRUE, 'hash5', (SELECT role_id FROM Roles WHERE role_name = 'receptionist')),
            ('ronaldo7', 'ronaldo7@gmail.com', '+375445717021', TRUE, 'hash6', (SELECT role_id FROM Roles WHERE role_name = 'receptionist'));`
        );

        await sequelize.query(
            `INSERT INTO Services (service_category_id, service_name, is_active)
            VALUES
            (1, 'Blood Test', TRUE),
            (2, 'MRI Scan', TRUE),
            (3, 'Consultation', TRUE),
            (1, 'X-Ray', TRUE),
            (2, 'Ultrasound', TRUE);`
        );

        await sequelize.query(
            `INSERT INTO Specializations (specialization_name)
            VALUES
            ('General Practitioner'),
            ('Cardiologist'),
            ('Neurologist');`
        );

        await sequelize.query(
            `INSERT INTO Appointments (patient_id, doctor_id, office_id, service_id, appointment_date, appointment_time, is_approved)
            VALUES
            (1, 1, 1, 11, '2024-01-15', '09:30', FALSE),
            (2, 2, 1, 12, '2024-01-16', '10:00', TRUE);`
        );

        await sequelize.query(
            `INSERT INTO Logs (user_id, action, action_date)
            VALUES
            (1, 'Created appointment', '2024-01-15 09:30:00'),
            (2, 'Uploaded results', '2024-01-16 10:00:00');`
        );

        await sequelize.query(
            `INSERT INTO MedicalProcedures (procedure_name, description, procedure_cost, doctor_id, patient_id, procedure_time, procedure_date)
            VALUES
            ('Appendectomy', 'Appendix removal surgery', 1500.00, 1, 1, '10:00', '2024-02-01');`
        );

        await sequelize.query(
            `INSERT INTO MedicalProcedures (procedure_name, description, procedure_cost, doctor_id, patient_id, procedure_time, procedure_date)
            VALUES
            ('Appendectomy', 'Appendix removal surgery', 1500.00, 1, 1, '10:00', '2024-02-01');`
        );

        await sequelize.query(
            `INSERT INTO Payments (appointment_id, amount, user_id, payment_date)
            VALUES
            (1, 100.00, 1, '2024-01-15 09:30:00');`
        );

        await sequelize.query(
            `INSERT INTO Prescriptions (patient_id, doctor_id, prescription_date, medication, dosage, duration)
            VALUES
            (1, 1, '2024-01-15 09:30:00', 'Paracetamol', '500mg', 10);`
        );

        await sequelize.query(
            `INSERT INTO Documents (document_type, file_path)
            VALUES
            ('Blood Test', '/documents/blood_test_1.pdf');`
        );

        await sequelize.query(
            `INSERT INTO Results (patient_id, doctor_id, document_id, appointment_id, complaints, recommendations, conclusion)
            VALUES
            (1, 1, 1, 1, 'Headache', 'Take rest', 'Migraine');`
        );

        await sequelize.query(
            `INSERT INTO servicecategory (category_name)
            VALUES
            ('Laboratory Tests'),
            ('Imaging'),
            ('Consultation');`
        );

        await sequelize.query(
            `INSERT INTO AppointmentProcedures (appointment_id, procedure_id)
            VALUES
            ((SELECT appointment_id FROM appointments WHERE appointment_date='2024-01-15' LIMIT 1),
            (SELECT procedure_id FROM medicalprocedures WHERE procedure_name='Appendectomy' LIMIT 1));`
        );

    } catch (error) {
        console.log(error);
    }
};