const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = "abcd";
const nodemailer = require('nodemailer');
require('dotenv').config();



exports.demoapp = async (req, res) => {
    try {
        const { Name, email, phone, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10)
        const query = `INSERT INTO demo (Name,email,phone,password) VALUES (?,?,?,?)`;

        db.execute(query, [Name, email, phone, hashpassword], (err, result) => {
            if (err) {
                console.error("User not created", err);
                return res.status(500).send("User not created");

            }
            console.log("sdl")
            res.status(201).send("User created successfully");
        });

    }
    catch (error) {
        console.error("Internal server error:", error);
        res.status(500).send("Internal server error");
    }
};

exports.demoappget = (req, res) => {
    try {
        const query = "select * from demo";
        db.execute(query, (err, results) => {
            if (err) {
                console.error("error fetch the data", err);
                return res.status(501).send("Can't fetcht the data");

            }
            res.json(results)
            console.log("Data fetch successfully")
        })
    }
    catch {
        console.error("error fetch the data", err);
        return res.status(501).send("Can't fetcht the data");
    }
}

exports.getdemoid = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM demo WHERE id = ?";

    db.execute(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching the data:', err);
            return res.status(500).send("Failed to get employee data");
        }

        if (result.length === 0) {
            return res.status(404).send("No employee found with this ID");
        }

        res.status(200).json(result[0]); // Send the data of the employee with the given ID
    });
};

exports.demoUpdate = (req, res) => {
    const { id } = req.params;
    const { Name, email, phone, password } = req.body;
    const query = `UPDATE demo SET Name=?,email=?,phone=?,password=? WHERE id=?`;
    db.execute(query, [Name, email, phone, password, id], (err, result) => {
        if (err) {
            console.error("Error updating the data", err);
            return res.status(500).send("Error updating the data");
        }
        res.status(200).send("Data updated successfully")
    })
}


exports.demoDelete = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM demo WHERE id = ?";
    db.execute(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting the data", err);
            return res.status(500).send("Error deleting the data");
        }
        res.status(200).send("Data deleted successfully")
    })
}


// ஏன்னா query-ல எத்தனை ? placeholders இருக்குதோ, அவத்துக்கெல்லாம் values-ஐ ஒரே ஒரு [name,email .....] array-வா pass பண்ணணும்.



// exports.loginDemo = (req, res) => {
//     const { email, password } = req.body;

//     const query = "SELECT * FROM demo WHERE email = ?";
//     db.query(query, [email], async (err, results) => {
//       if (err) {
//         console.error("DB Error:", err);
//         return res.status(500).json({ message: "Server error" });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       const user = results[0];
//       console.log("sd",user);

//       // Compare hashed password
//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid password" });
//       }

//       res.status(200).json({ message: "Login successful", user: { id: user.id, email: user.email, name: user.name } });
//     });
//   };

exports.logindemo = (req, res) => {
    const { email, password } = req.body;
    const query = "select * from demo where email =? ";
    db.execute(query, [email], async (err, result) => {
        if (err) {
            console.error("DB error", err);
            return res.status(500).json({ message: "Server error" })
        }
        if (result.length === 0) {
            console.log("User not found")
            return res.status(401).json({ message: "User not found" });
        }

        const user = result[0];
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password invalid" });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },  
            secretkey,                          
            { expiresIn: '1m' }
                );
        res.status(200).json({ 
            message: "Login successful", 
            token: token, 
            user: { id: user.id, email: user.email, name: user.name }
        });
    });
}


exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    const query = "SELECT * FROM demo WHERE email = ?";
    db.execute(query, [email], (err, result) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (result.length === 0) return res.status(404).json({ message: "User not found" });

        const user = result[0];
        const token = jwt.sign({ id: user.id }, "abcd", { expiresIn: '15m' });

        const resetLink = `http://localhost:3000/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Nodemailer error:", error); // log the exact error
              return res.status(500).json({ message: "Email not sent", error: error.toString() });
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).json({ message: "Reset link sent to your email" });
            }
          });
    });
};

// POST /auth/reset-password
exports.resetPassword = (req, res) => {
    const { token, newPassword } = req.body;
    if (!token) return res.status(400).json({ message: "Token missing" });

    jwt.verify(token, "abcd", async (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid or expired token" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateQuery = "UPDATE demo SET password = ? WHERE id = ?";
        db.execute(updateQuery, [hashedPassword, decoded.id], (err, result) => {
            if (err) return res.status(500).json({ message: "Error updating password" });
            res.status(200).json({ message: "Password reset successfully" });
        });
    });
};
