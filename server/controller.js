const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')
        const {session} = req
        

        let user = await db.login({email})
        user = user[0]

        if (!user) {
            return res.status(401).send('wrong user')
        }

        let authenticated = bcrypt.compareSync(password, user.password)

        if (authenticated) {
            delete user.password
            session.user = user
            res.status(200).send(session.user)
        } else {
            res.status(401).send('not authenticated')
        }
    },
    register: async (req,res) => {
        const {username, email, password, admin} = req.body
        const {session} = req
        const db = req.app.get('db')

        let takenEmail = await db.check_email({email})
        takenEmail = +takenEmail[0].count

        if (takenEmail !== 0) {
            return res.sendStatus(409)
        }

        let salt= bcrypt.genSaltSync(10)
        let hash= bcrypt.hashSync(password, salt)

        let user = await db.create_user({username, email, password:hash, admin})
        user = user[0]
        session.user = user
        res.status(200).send(session.user)
    }
}