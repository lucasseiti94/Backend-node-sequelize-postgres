import jwt from 'jsonwebtoken'
import User from "../models/User"
import * as Yup from 'yup'

import authConfig from '../../config/auth'

class SessionController {
    async store(req, res) {

        //camada de validação de dados
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        })

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({
                message: 'Falha na validação'
            })
        }

        // validação usuário existente
        const { email, password } = req.body

        const user = await User.findOne({
            where: { email }
        })

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado!' })
        }

        // validação de senha
        if (! (await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Senha inválida!' })
        }

        // resposta caso tudo ok
        const { id, name } = user
        return res.json({
            user: {
                id, 
                name,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default new SessionController()