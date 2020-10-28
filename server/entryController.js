module.exports = {
    getAllEntries: async (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        console.log('request hit')
        const entries = await db.get_entries(user_id)
        return res.status(200).send(entries)
    },
    getSingleEntry: async(req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        console.log(id)
        const entry = await db.get_single_entry(id)
        return res.status(200).send(entry[0])
    },
    createEntry: async(req,res) => {
        const db = req.app.get('db');
        const {title, fmtDate, img, content} = req.body;
        const {user_id} = req.session.user;
        const entry = await db.create_entry(title, fmtDate, img, content, user_id);
        console.log('Entry created')
        return res.status(200).send("Entry created")
    },
    deleteEntry: async(req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.delete_entry(id);
        console.log('Delete  successful')
        res.status(200).send('Delete successful');
    },
    updateEntry: async(req,res) => {
        const db = req.app.get('db');
        const {title, fmtDate, img, content} = req.body;
        const {id} = req.params;
        const updatedEntry = db.update_entry(title, fmtDate, img, content, id);
        console.log('Update successful')
        return res.status(200).send('Update successful');
    }
}

