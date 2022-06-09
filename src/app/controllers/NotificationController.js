import User from '../models/User'
import Notifications from '../schema/Notifications'

class NotificationController {
    async index(req, res) {

        // valida se é colaborador
        const checkIsCollaborator = await User.findOne({
            where: { id: req.userId, provider: true }
        })

        if(!checkIsCollaborator) {
            return res.status(401).json({ erro: "Notificação disponível apenas para colaboradores"})
        }

        // lista as notificações
        const notifications = await Notifications.find({
            user: req.userId
        }).sort({ createdAt: 'desc' }).limit(20)

        return res.json(notifications)
    }

    async update(req, res) {
        // atualiza valor de read para marcar como lido
        const notifications = await Notifications.findByIdAndUpdate( 
            req.params.id,
            { read: true },
            { new: true }
        )
        return res.json(notifications)
    }
}

export default new NotificationController()