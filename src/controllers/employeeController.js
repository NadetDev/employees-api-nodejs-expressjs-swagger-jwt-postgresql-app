const Employee = require('../models/Employee');
const { badRequest, notFound, success, created } = require('../utils/apiResponse');

// @desc    Get all employees
// @access  Private
exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();
    return success(res, employees, `Found ${employees.length} employees`);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single employee
// @access  Private
exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
    return notFound(res, `Employee not found with id ${req.params.id}`);
    }

    return success(res, employee);
  } catch (err) {
    next(err);
  }
};

// @desc    Create employee
// @access  Private/Admin
exports.createEmployee = async (req, res, next) => {
  try {
    const { first_name, last_name, email, position, salary } = req.body;
    
    // Validate required fields
    if (!last_name || !email) {
      return badRequest(res, 'Last name and email are required fields');
    }
    
    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      position,
      salary,
      created_by: req.user.id
    });

    return created(res, employee);
  } catch (err) {
    next(err);
  }
};

// @desc    Update employee
// @access  Private/Admin
exports.updateEmployee = async (req, res, next) => {
  try {
    const { last_name, email } = req.body;
    
    // Validate required fields
    if (!last_name || !email) {
      return badRequest(res, 'Last name and email are required fields');
    }

    const employee = await Employee.update(req.params.id, req.body);

    if (!employee) {
      return notFound(res, `Employee not found with id ${req.params.id}`);
    }

    return success(res, employee);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete employee
// @access  Private/Admin
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.delete(req.params.id);

    if (!employee) {
      return notFound(res, `Employee not found with id ${req.params.id}`);
    }

    return success(res, employee);
  } catch (err) {
    next(err);
  }
};
