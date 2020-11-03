module.exports = {
    getDarkMode: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const darkMode = await db.get_dark_mode(user_id)
        res.status(200).send(darkMode[0].dark_mode)
    },
    updateDarkMode: async(req, res) => {
        const db = req.app.get('db');
        const {update} = req.body
        const {user_id} = req.session.user;
        const darkMode = await db.update_dark_mode(user_id, update)
        res.status(200).send(darkMode[0].dark_mode)
    }
}