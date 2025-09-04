const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticket-controller');

// Middleware para validação básica
const validateTicket = (req, res, next) => {
    const { title, id, telefone } = req.body;

    if (!title || !id || !telefone) {
        return res.status(400).json({
            success: false,
            message: 'Todos os campos obrigatórios devem ser preenchidos'
        });
    }

    if (typeof id !== 'number' || id <= 0) {
        return res.status(400).json({
            success: false,
            message: 'O campo "id" deve ser um número maior que zero'
        });
    }

    if (typeof telefone !== 'number' || telefone <= 0) {
        return res.status(400).json({
            success: false,
            message: 'O campo "telefone" deve ser um número válido e maior que zero'
        });
    }

    next();
};

// Rotas para tickets
router.get('/', TicketController.getAllTickets);
router.get('/title/:title', TicketController.getTicketsByTitle);
router.get('/:id', TicketController.getTicketById);
router.post('/', validateTicket, TicketController.createTicket);
router.put('/:id', validateTicket, TicketController.updateTicket);
router.delete('/:id', TicketController.deleteTicket);

module.exports = router;
