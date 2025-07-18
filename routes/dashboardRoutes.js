const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  getDashboard,
  getTransactions 
} = require('../controllers/dashboardController');


/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Financial dashboard
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 totalTransactions:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */
router.get('/dashboard', protect, getDashboard);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get transaction history
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 */
router.get('/transactions', protect, getTransactions);

module.exports = router;