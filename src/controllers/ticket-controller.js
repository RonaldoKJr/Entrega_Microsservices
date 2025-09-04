const TicketRepository = require('../repositories/ticket-repository');

class TicketController {
    async getAllTickets(req, res) {
        try {
            const tickets = await TicketRepository.findAll();
            res.status(200).json({
                success: true,
                data: tickets,
                message: 'Tickets listados com sucesso'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao listar tickets',
                error: error.message
            });
        }
    }

    async getTicketById(req, res) {
        try {
            const { id } = req.params;
            const ticket = await TicketRepository.findById(id);

            if (!ticket) {
                return res.status(404).json({
                    success: false,
                    message: 'Ticket não encontrado'
                });
            }
            res.status(200).json({
                success: true,
                data: ticket,
                message: 'Ticket encontrado com sucesso'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar ticket',
                error: error.message
            });
        }
    }

    async createTicket(req, res) {
        try {
            const ticketData = req.body;
            const newTicket = await TicketRepository.create(ticketData);

            res.status(201).json({
                success: true,
                data: newTicket,
                message: 'Ticket criado com sucesso'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erro ao criar ticket',
                error: error.message
            });
        }
    }

    async updateTicket(req, res) {
        try {
            const { id } = req.params;
            const ticketData = req.body;

            const updatedTicket = await TicketRepository.update(id, ticketData);

            if (!updatedTicket) {
                return res.status(404).json({
                    success: false,
                    message: 'Ticket não encontrado'
                });
            }
            res.status(200).json({
                success: true,
                data: updatedTicket,
                message: 'Ticket atualizado com sucesso'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erro ao atualizar ticket',
                error: error.message
            });
        }
    }

    async deleteTicket(req, res) {
        try {
            const { id } = req.params;
            const deletedTicket = await TicketRepository.delete(id);

            if (!deletedTicket) {
                return res.status(404).json({
                    success: false,
                    message: 'Ticket não encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Ticket removido com sucesso'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao remover ticket',
                error: error.message
            });
        }
    }

    async getTicketsByTitle(req, res) {
        try {
            const { title } = req.params;
            const tickets = await TicketRepository.findByTitle(title);

            res.status(200).json({
                success: true,
                data: tickets,
                message: `Tickets com o título ${title} listados com sucesso`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao listar tickets por título',
                error: error.message
            });
        }
    }
}

module.exports = new TicketController();
