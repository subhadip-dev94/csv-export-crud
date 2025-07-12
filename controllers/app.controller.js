const EmpModel = require("../models/emp.model");
const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

class AppController {
    async getForm(req, res) {
        try {
            res.render('form', {
                title: "Form"
            });
        } catch (err) {
            throw err;
        }
    }

    async submitForm(req, res) {
    try {
        const { fullName, email, phone, age, gender, address } = req.body;

        if (!fullName || !email || !phone || !age || !gender || !address) {
            console.log("All fields are required.");
            return res.redirect("/submit-form");
        }

        //Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Invalid email format.");
            return res.redirect("/submit-form");
        }

        //Check for duplicate email
        const existingEmail = await EmpModel.findOne({ email, isDeleted: false });
        if (existingEmail) {
            console.log("Email already exists.");
            return res.redirect("/submit-form");
        }

        const newEmp = {
            fullName,
            email,
            phone,
            age,
            gender,
            address,
            isDeleted: false
        };

        await EmpModel.create(newEmp);
        console.log("Employee data saved successfully.");
        res.redirect("/"); // or to a success page

    } catch (err) {
        console.error("Error submitting form:", err);
        res.redirect("/submit-form");
    }
}

    async getList(req, res) {
        try {
            let allData = await EmpModel.find({ isDeleted: false }).sort({ fullName: 1 });
            res.render('list', {
                title: "List",
                allData
            });
        } catch (err) {
            throw err;
        }
    }
    async exportCSV(req, res) {
        try {
            const data = await EmpModel.find({ isDeleted: false }).lean();

            if (!data || data.length === 0) {
                console.log("No data available to export.");
                return res.redirect("/");
            }

            // Format only required fields
            const formattedData = data.map((emp) => ({
                Name: emp.fullName,
                Email: emp.email,
                "Phone Number": emp.phone,
                Age: emp.age,
                Gender: emp.gender,
                Address: emp.address,
            }));

            // Convert to CSV
            const csv = Papa.unparse(formattedData);

            // Set headers to prompt download
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=employee-data.csv");
            res.send(csv);
            res.redirect("/");
    
        } catch (err) {
            console.error("Export error:", err);
            throw err;
        }
    }
   
}

module.exports = new AppController();
