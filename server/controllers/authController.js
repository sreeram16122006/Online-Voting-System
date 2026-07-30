const User = require('../models/User');
const Admin = require('../models/Admin');

exports.register = async (req, res) => {
    try {
        const { name, mobile, department, year, registerNumber, password } = req.body;

        const existingMobile = await User.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).json({ message: 'Mobile number already registered' });
        }

        const existingReg = await User.findOne({ registerNumber });
        if (existingReg) {
            return res.status(400).json({ message: 'Register number already registered' });
        }

        const user = await User.create({ name, mobile, department, year, registerNumber, password });

        res.status(201).json({ message: 'Registration successful', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.studentLogin = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                department: user.department,
                year: user.year,
                registerNumber: user.registerNumber,
                hasVoted: user.hasVoted
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Admin login successful', admin: { _id: admin._id, username: admin.username } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createDefaultAdmin = async () => {
    const count = await Admin.countDocuments();
    if (count === 0) {
        await Admin.create({ username: 'admin', password: 'admin123' });
        console.log('Default admin created - username: admin, password: admin123');
    }
};