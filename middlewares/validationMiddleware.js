const { body, validationResult } = require('express-validator');

exports.validateTask = [
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('description').notEmpty().withMessage('Description cannot be empty'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: 'Validation failed',
                time: Date.now(),
                errors: errors.array()
            });
        }
        next();
    }
];
