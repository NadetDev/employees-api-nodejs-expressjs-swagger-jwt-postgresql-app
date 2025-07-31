const express = require('express');
const {
  protect,
  authorize
} = require('../middlewares/authMiddleware');
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all employees
 *       401:
 *         description: Unauthorized
 */
router.route('/')
  .get(protect, getEmployees)
  
  /**
   * @swagger
   * /api/employees:
   *   post:
   *     summary: Create new employee
   *     tags: [Employees]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Employee'
   *     responses:
   *       201:
   *         description: Employee created
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden (admin only)
   */
  .post(protect, authorize(process.env.ADMIN_ROLE), createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
router.route('/:id')
  .get(protect, getEmployee)
  
  /**
   * @swagger
   * /api/employees/{id}:
   *   put:
   *     summary: Update employee
   *     tags: [Employees]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Employee'
   *     responses:
   *       200:
   *         description: Updated employee data
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden (admin only)
   *       404:
   *         description: Employee not found
   */
  .put(protect, authorize(process.env.ADMIN_ROLE), updateEmployee)
  
  /**
   * @swagger
   * /api/employees/{id}:
   *   delete:
   *     summary: Delete employee
   *     tags: [Employees]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Employee deleted
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden (admin only)
   *       404:
   *         description: Employee not found
   */
  .delete(protect, authorize(process.env.ADMIN_ROLE), deleteEmployee);

module.exports = router;
