module.exports = {
    getAllEntries: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {search} = req.query;
        let entries = await db.get_entries(user_id)
        entries.forEach( el => {
            return el.date = [el.date.toDateString(), el.date.toLocaleString()]
        })
        if(search){
            const filteredEntries = entries.filter( el =>{
                return el.title.toLowerCase().includes(search.toLowerCase())
            })
        return res.status(200).send(filteredEntries)
        }
        return res.status(200).send(entries)
    },
    getSingleEntry: async(req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        // console.log(id)
        const entry = await db.get_single_entry(id)
        entry.forEach( el => {
            return el.date = el.date.toLocaleString().split(',')
        })
        console.log(entry)
        res.status(200).send(entry[0])
    },
    createEntry: async(req,res) => {
        const db = req.app.get('db');
        const {title, date, img, content} = req.body;
        const {user_id} = req.session.user;
        await db.create_entry(title, date, img, content, user_id);
        res.sendStatus(200)
    },
    deleteEntry: (req,res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        db.delete_entry(id);
        res.sendStatus(200)
    },
    updateEntry: async(req,res) => {
        const db = req.app.get('db');
        const {title, fnlDate, img, content} = req.body;
        const {id} = req.params;
        await db.update_entry(title, fnlDate, img, content, id);
        res.sendStatus(200)
    }
}

