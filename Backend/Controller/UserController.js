const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Import your DB connection
const secretkey = "abced"; // JWT secret

// User sign-up
exports.signup = async (req, res) => {
    try {
        // Extract new fields from request body
        const {  Name, email_id, password,  employeeId, role, joiningDate, permissions } = req.body;
        
        // Hash the password
        const hashpassword = await bcrypt.hash(password, 10);

        // Convert permissions object to JSON string
        const permissionsJson = JSON.stringify(permissions);

        // Update the SQL query to include new fields
        const query = `
            INSERT INTO user ( Name, email_id, password, employeeId, role, joiningDate, permissions)
            VALUES ( ?, ?, ?, ?, ?, ?, ?)
        `;

        // Execute the query with all fields
        db.execute(query, [ Name, email_id, hashpassword,  employeeId, role, joiningDate, permissionsJson], (err, result) => {
            if (err) {
                console.error("Error creating user:", err);
                return res.status(500).send("Error creating user");
            }
            res.status(201).send("User created successfully");
        });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).send("Internal server error");
    }
};

exports.getEmployee = (req, res) => {
    try {
        const query = "SELECT * FROM user";
        db.execute(query, (err, results) => {
            if (err) {
                console.error("Error fetching employees:", err);
                return res.status(500).send("Error fetching employees");
            }
            res.json(results);
        });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).send("Internal server error");
    }
};

// Fetch employee by ID
exports.getEmployeeById = (req, res) => {
    const { id } = req.params; // Get the employee id from the request parameters
    const query = "SELECT * FROM user WHERE id = ?";

    db.execute(query, [id], (err, results) => {
        if (err) {
            console.error("Error fetching employee:", err);
            return res.status(500).send("Error fetching employee");
        }

        if (results.length === 0) {
            return res.status(404).send("Employee not found");
        }

        // Check if permissions is already an object or a JSON string
        const employee = results[0];
        
        // If it's a string, parse it, otherwise leave it as is
        if (typeof employee.permissions === 'string') {
            try {
                employee.permissions = JSON.parse(employee.permissions);
            } catch (parseError) {
                console.error("Error parsing permissions:", parseError);
                return res.status(500).send("Error parsing employee permissions");
            }
        }

        res.json(employee);
    });
};

// PUT: Update an existing employee by matching id
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params; // Employee id from URL
        const { Name, email_id, password, employeeId, role, joiningDate, permissions } = req.body;

        // Hash the password if it exists in the update
        let hashpassword = null;
        if (password) {
            hashpassword = await bcrypt.hash(password, 10);
        }

        // Convert permissions object to JSON string if it exists
        const permissionsJson = permissions ? JSON.stringify(permissions) : null;

        // SQL query to update user based on provided fields
        const query = `
            UPDATE user 
            SET 
                Name = COALESCE(?, Name), 
                email_id = COALESCE(?, email_id), 
                password = COALESCE(?, password), 
                employeeId = COALESCE(?, employeeId), 
                role = COALESCE(?, role), 
                joiningDate = COALESCE(?, joiningDate), 
                permissions = COALESCE(?, permissions)
            WHERE id = ?
        `;

        // Execute the query with updated fields
        db.execute(query, [Name, email_id, hashpassword, employeeId, role, joiningDate, permissionsJson, id], (err, result) => {
            if (err) {
                console.error("Error updating employee:", err);
                return res.status(500).send("Error updating employee");
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Employee not found");
            }

            res.status(200).send("Employee updated successfully");
        });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).send("Internal server error");
    }
};


// Delete an employee by ID
exports.deleteEmployee = (req, res) => {
    try {
        const { id } = req.params; // Employee id from URL

        // SQL query to delete user by ID
        const query = "DELETE FROM user WHERE id = ?";

        // Execute the query
        db.execute(query, [id], (err, result) => {
            if (err) {
                console.error("Error deleting employee:", err);
                return res.status(500).send("Error deleting employee");
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Employee not found");
            }

            res.status(200).send("Employee deleted successfully");
        });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).send("Internal server error");
    }
};


// User login
exports.login = async (req, res) => {
    try {
        const { email_id, password } = req.body;
        const query = "SELECT * FROM user WHERE email_id = ?";
        db.execute(query, [email_id], async (err, results) => {
            if (err || results.length === 0) {
                return res.status(400).send("User not found");
            }

            const user = results[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).send("Invalid password");
            }

            const token = jwt.sign({ email_id: user.email_id }, secretkey);
            res.send({ token, Name: user.Name,employeeId:user.employeeId,permissions:user.permissions,role:user.role });
        });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

// Protected route (profile)
exports.profile = (req, res) => {
    res.send('Welcome to your profile');
};

// Token verification middleware
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("Access denied");

    try {
        const verified = jwt.verify(token, secretkey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};
