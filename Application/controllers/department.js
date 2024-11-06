const Department = require("../models/department");

exports.createDepartment = async (req, res) => {
  try {
  } catch (error) {}
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({}, "-__v");
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id, "-__v");

    if (!department) {
      res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
  } catch (error) {}
};

exports.deleteDepartment = async (req, res) => {
  try {
    const deletedDept = await Department.findByIdAndDelete(req.params.id);

    if (deletedDept) {
      res.status(200).json({ message: "Department deleted successfully" });
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
