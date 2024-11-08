const Department = require("../models/departments");
const buildFilters = require("../helpers/filters");

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name, address, phoneNumber, openingHours } = req.body;

    const newDept = new Department({
      name,
      address,
      phoneNumber,
      openingHours,
    });

    await newDept.save();

    res.status(201).json({
      message: "Department created successfully",
      data: newDept,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating department", error: error.message });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const filterableFields = ["city", "openingHours", "yearOfManufacture", "color"];
    const filters = createFilters(req.query, filterableFields);

    const cars = await Car.find(filters, "-__v");

    res.status(200).json(cars);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not fetch cars", error: error.message });
  }
};

// Get department by ID
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

// Update department
exports.updateDepartment = async (req, res) => {
  try {
    const deptId = req.params.id;
    const { name, address, phoneNumber, openingHours } = req.body;

    const updatedDept = await Department.findByIdAndUpdate(
      deptId,
      { name, address, phoneNumber, openingHours },
      { new: true, runValidators: true }
    );

    if (!updatedDept) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department updated successfully",
      department: updatedDept,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating department", error: error.message });
  }
};

// Delete department
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
