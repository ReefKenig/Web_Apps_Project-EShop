const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departments");

// Create new department
router.post("/", departmentController.createDepartment);

// Get departments
router.get("/search", departmentController.getDepartments);

// Get departments by ID
router.get("/search/:id", departmentController.getDepartmentById);

// Update department
router.put("/:id", departmentController.updateDepartment);

// Delete department
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
