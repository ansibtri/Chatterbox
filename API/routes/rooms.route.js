const RoomsRouter = require("express").Router();
const Room = require("../model/Rooms.model")
// create room
RoomsRouter.post('/',async (req,res)=>{
      
});

// get room
RoomsRouter.get('/', async(req,res)=>{

});

// delete room
RoomsRouter.delete('/', async (req,res)=>{

})

// update rooms last message
RoomsRouter.patch('/',async (req,res)=>{

})

module.exports = RoomsRouter;