const Role = require('../models/Role');
const User = require('../models/User');
const Receptionist = require('../models/Receptionist');
const bcrypt = require('bcryptjs');
const { Schema } = require('mongoose');

exports.seedDatabase = async () => {
    try {
        let receptionistRole = await Role.findOne({ RoleName: 'Receptionist' });

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