module.exports = {
    getAllEntries: async (req, res) => {
        const db = req.app.get('db');
        console.log('request hit')
        const entries = await db.get_entries()
        console.log(entries)
        return res.status(200).send(entries)
    },
    getSingleEntry: async(req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const entry = await db.get_single_entry(id)
        return res.status(200).send(entry)
    },
    createEntry: async(req,res) => {
        const db = req.app.get('db');
        const {tbd} = req.body;
        const {user_id} = req.session.user;
        const entry = await db.create_entry(tbd);
        // res.status(200).send(entry[0])
    },
    deleteEntry: async(req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.delete_entry(id);
        res.status(200).send('Delete successful');
    }
}

