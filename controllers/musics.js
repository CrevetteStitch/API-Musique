//const data = require('./../models/data.json')
const { OPEN_READWRITE } = require('sqlite3');
const Music = require('./../models/music')
const controllerMusic = 
{
    find: async (req, res) =>{
        if(req.query.search){
                const query = req.query.search;
                const result = data.filter(song => song.title.toLowerCase().includes(query.toLowerCase()));
                if (result.length === 0) {
                    return res.status(404).json({ error: "No matching songs found." });
                }
                res.status(200).json({ result });
                console.log(result);
        }else{
        const data = await Music.findAll()
        res.status(200).json({result: data })
        }
    },

    findById: (req, res) => {
        const id = req.params.id
        if(isNaN(id)){
            return res.status(400).json({error : "Don't use text for id"}) 
        }
        if(id > data.length){
            return res.status(404).json({error : "ID not found ..."}) 
        }

        return res.status(200).json({result : data[id-1]})
    },

    create: async (req, res) => {
        console.log(req.body)
        const data = await Music.create(req.body);
        res.status(201).json({message : "Music created", data : req.body})
        
    },

    random: (req, res)=>{
        const random = Math.floor(Math.random() * data.length);
        res.status(200).json({result : data[random]})
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const data = await Music.destroy({
            where: {
                id:idMusic;
            }
        });
    res.status(200).json({message : "Music deleted"})
 
    }
}

module.exports = controllerMusic