const Role = require('../models/Role');
const User = require('../models/User');
const Office = require('../models/Office');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Service = require('../models/Service');
const Payment = require('../models/Payment');
const ServiceCategory = require('../models/ServiceCategory');
const Procedures = require('../models/MedicalProcedures');
const Specialization = require('../models/Specialization');
const bcrypt = require('bcryptjs');
const { Schema } = require('mongoose');
const faker = require('faker');
const { mongoose } = require('mongoose');

exports.seedDatabase = async () => {
    try {
        let receptionistRole = await Role.findOne({ RoleName: 'receptionist' });

        if (!receptionistRole) {
            receptionistRole = new Role({ RoleName: 'Receptionist' });
            await receptionistRole.save();
            console.log('Role "Receptionist" created');
        }

        const userExists = await User.findOne({ email: 'receptionist@example.com' });
        if (userExists) {
            console.log('Receptionist already exists');
            return;
        }

        const newUser = new User({
            name: 'Receptionist User',
            email: 'receptionist@example.com',
            password: 'password123',
            roleId: receptionistRole.id,
        });

        const savedUser = await newUser.save();

        const receptionistExists = await Receptionist.findOne({ UserId: savedUser.id });
        if (receptionistExists) {
            console.log('User already exists');
            return;
        }

        const newReceptionist = new Receptionist({
            UserId: savedUser.id,
            FirstName: 'Receptionist',
            LastName: 'Receptionist',
            MiddleName: 'Receptionist',
            DateOfBirth: Date.now(),
        });

        await newReceptionist.save();
        console.log('Receptionist created successfully');
    } catch (err) {
        console.error('Error while seeding receptionist:', err.message);
    }
};

exports.insertMockData = async () => {
    try {

        const categories = ['Consultation', 'Surgery', 'Therapy', 'Diagnostic'];
        const categoryDocs = await ServiceCategory.insertMany(categories.map(name => ({ CategoryName: name })));

        const services = Array.from({ length: 10 }).map(() => ({
            ServiceName: faker.commerce.productName(),
            IsActive: faker.datatype.boolean(),
            CategoryId: faker.random.arrayElement(categoryDocs)._id,
        }));
        const serviceDocs = await Service.insertMany(services);

        const roles = ['patient', 'doctor', 'receptionist'];
        const roleDocs = await Role.insertMany(roles.map(name => ({ RoleName: name })));

        const users = Array.from({ length: 10 }).map(() => ({
            roleId: faker.random.arrayElement(roleDocs)._id,
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }));
        const userDocs = await User.insertMany(users);

        const offices = Array.from({ length: 10 }).map(() => ({
            Country: faker.address.country(),
            Region: faker.address.state(),
            City: faker.address.city(),
            Street: faker.address.streetName(),
            StreetNumber: faker.datatype.number({ min: 1, max: 200 }),
            OfficeNumber: faker.datatype.number({ min: 1, max: 50 }),
            PhoneNumber: faker.phone.phoneNumber(),
        }));
        const officeDocs = await Office.insertMany(offices);

        const specializations = ['Cardiology', 'Dermatology', 'Pediatrics', 'Neurology', 'Oncology'];
        const specializationDocs = await Specialization.insertMany(specializations.map(name => ({ SpecializationName: name })));

        const procedures = Array.from({ length: 10 }).map(() => ({
            ProcedureName: faker.commerce.productName(),
            Description: faker.lorem.sentence(),
            ProcedureCost: faker.finance.amount(100, 500, 2),
        }));
        const procedureDocs = await Procedures.insertMany(procedures);

        // Services


        // Doctors
        const doctors = Array.from({ length: 10 }).map(() => ({
            UserId: faker.random.arrayElement(userDocs)._id,
            FirstName: faker.name.firstName(),
            LastName: faker.name.lastName(),
            MiddleName: faker.name.middleName(),
            DateOfBirth: faker.date.past(40, new Date('2000-01-01')),
            CareerStartYear: faker.datatype.number({ min: 2000, max: 2021 }),
            Specialization: faker.helpers.shuffle(specializationDocs).slice(0,2).map(s => s._id),
        }));
        const doctorDocs = await Doctor.insertMany(doctors);

        // Patients
        const patients = Array.from({ length: 10 }).map(() => ({
            UserId: faker.random.arrayElement(userDocs)._id,
            FirstName: faker.name.firstName(),
            LastName: faker.name.lastName(),
            MiddleName: faker.name.middleName(),
            DateOfBirth: faker.date.past(30, new Date('2000-01-01')),
        }));
        const patientDocs = await Patient.insertMany(patients);

        // Appointments
        const appointments = Array.from({ length: 10 }).map(() => ({
            PatientId: faker.random.arrayElement(patientDocs)._id,
            DoctorId: faker.random.arrayElement(doctorDocs)._id,
            OfficeId: faker.random.arrayElement(officeDocs)._id,
            ServiceId: faker.random.arrayElement(serviceDocs)._id,
            AppointmentDate: faker.date.future(),
            AppointmentTime: faker.date.future(),
            IsApproved: faker.datatype.boolean(),
        }));
        const appointmentDocs = await Appointment.insertMany(appointments);

        // Payments
        const payments = Array.from({ length: 10 }).map(() => ({
            AppointmentId: faker.random.arrayElement(appointmentDocs)._id,
            Amount: faker.finance.amount(100, 1000, 2),
            UserId: faker.random.arrayElement(userDocs)._id,
            PaymentDate: faker.date.recent(),
        }));
        await Payment.insertMany(payments);

        console.log('Mock data successfully inserted.');
    } catch (err) {
        console.error('Error inserting mock data:', err);
    } finally {
        mongoose.connection.close();
    }
}