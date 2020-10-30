module.exports = {
    getAllEntries: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {search} = req.query;
        console.log(search)
        let entries = await db.get_entries(user_id)
        if(search){
            const filteredEntries = entries.filter( el =>{
                return el.title.toLowerCase().includes(search.toLowerCase())
            })
        return res.status(200).send(filteredEntries)
        }
        console.log('hit')
        return res.status(200).send(entries)
    },
    getSingleEntry: async(req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        console.log(id)
        const entry = await db.get_single_entry(id)
        res.status(200).send(entry[0])

    },
    createEntry: async(req,res) => {
        const db = req.app.get('db');
        const {title, fmtDate, img, content} = req.body;
        const {user_id} = req.session.user;
        await db.create_entry(title, fmtDate, img, content, user_id);
        console.log('Entry created')
        res.sendStatus(200)
    },
    deleteEntry: (req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.delete_entry(id);
        console.log('Delete  successful')
        res.sendStatus(200)
    },
    updateEntry: async(req,res) => {
        const db = req.app.get('db');
        const {title, fmtDate, img, content} = req.body;
        const {id} = req.params;
        await db.update_entry(title, fmtDate, img, content, id);
        console.log('Update successful')
        res.sendStatus(200)
    }
}

