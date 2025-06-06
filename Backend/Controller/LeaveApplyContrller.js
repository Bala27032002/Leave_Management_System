const db = require('../config/db');

exports.CreateLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, leaveCategory, leaveDate, endDate, reason } = req.body;

    // Step 1: Fetch employeeName using employeeId
    const [rows] = await db.promise().query(
      'SELECT Name FROM user WHERE employeeId = ?',
      [employeeId]
    );

    if (rows.length === 0) {
      return res.status(404).send("Employee not found");
    }

    const employeeName = rows[0].Name;

    // Step 2: Insert into leave_applications
    const insertQuery = `
      INSERT INTO leave_applications (employeeId, employeeName, leaveType, leaveCategory, leaveDate, endDate, reason)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await db.promise().execute(insertQuery, [
      employeeId,
      employeeName,
      leaveType,
      leaveCategory,
      leaveDate,
      endDate,
      reason
    ]);

    res.status(201).send("Leave applied successfully");

  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).send("Internal server error");
  }
};


exports.getLeave = (req, res) => {
  try {
    const { employeeId } = req.query;

    let query = "SELECT * FROM leave_applications";
    let params = [];

    // If employeeId is provided (non-admin), filter by employeeId
    if (employeeId) {
      query += " WHERE employeeId = ?";
      params.push(employeeId);
    }

    db.execute(query, params, (err, results) => {
      if (err) {
        console.error("Error fetching Leave:", err);
        return res.status(500).send("Error fetching Leave");
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).send("Internal server error");
  }
};



exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved_status } = req.body;

    if (!approved_status) {
      return res.status(400).send("Status is required");
    }

    const query = "UPDATE leave_applications SET approved_status = ? WHERE id = ?";
    db.execute(query, [approved_status, id], (err, result) => {
      if (err) {
        console.error("Error updating status:", err);
        return res.status(500).send("Error updating status");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("Leave entry not found");
      }

      res.status(200).send("Leave status updated successfully");
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).send("Internal server error");
  }
};
