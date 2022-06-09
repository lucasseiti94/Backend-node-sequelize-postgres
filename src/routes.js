import { Router } from 'express'

import multer from 'multer'

import multerConfig from './config/multer'

// import User from './app/models/User'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import CollaboratorController from './app/controllers/CollaboratorController'
import AppointmentController from './app/controllers/AppointmentController'
import ScheduleController from './app/controllers/ScheduleController'
import NotificationController from './app/controllers/NotificationController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

// routes.get('/', async (request, res) => {
//     const user = await User.create({
//         name: 'Lucas s',
//         email: 'lucass@email.com',
//         password_hash: '123451'
//     })
//     // return response.json({message: 'Okay'})
//     return res.json(user)
//     // console.log(res.json(user))
// })

routes.post('/users', UserController.store)

routes.post('/session', SessionController.store)


// rotas autenticadas

routes.use(authMiddleware)

routes.put('/users', authMiddleware, UserController.update)

// rota de agendamento
routes.post('/appointments', AppointmentController.store)

// listagem de agendamento
routes.get('/appointments', AppointmentController.index)

// lista de todos os colaboradores
routes.get('/collaborators', CollaboratorController.index)

// listagem de agendamentos colaborador
routes.get('/schedule', ScheduleController.index)

// listagem de notificações
routes.get('/notifications', NotificationController.index)

// Marcar como lida
routes.put('/notifications/:id', NotificationController.update)

//upload de arquivos
routes.post('/files', upload.single('file'), FileController.store)


// module.exports = routes
export default routes