const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { makeTransaction } = require('../controllers/transactionController');


/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Financial transactions
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 *                 newBalance:
 *                   type: number
 *       400:
 *         description: Invalid input or insufficient funds
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, makeTransaction);

module.exports = router;