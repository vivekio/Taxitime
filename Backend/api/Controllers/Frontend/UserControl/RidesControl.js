
const RidesModel = require("../../../Models/Frontend/UserModel/RidesModel")
const {getIO} = require("../../../socket_io");
// const rideupdate = (userid) =>{
//     const io = getIO();
//     RidesModel.getRides(userid, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err });
//         }
//         console.log("this is results",results);
//         io.emit("rideupdate" , results);
// })
// }
const getRides = (req, res ) =>{
    const userid = req.userID ;
    RidesModel.getRides(userid, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
// rideupdate(userid)
        return res.status(200).json(results)
    })
}
const cancelrides = (req, res) =>{
    const data = req.body ;

    const cancelled_by = "USER"
    const {id} = req.params ;
    const status = "CANCELLED";
    RidesModel.cancelrides(data , id , status, cancelled_by, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.status(200).json(results)
    })
}
const submitrating= (req,res) =>{
console.log(req.body);
RidesModel.rating(req.body ,(err , result) =>{
    if (err) {
        return res.status(500).json({ error: err });
    }
    return res.status(200).json(result)
})

}

module.exports = {getRides , cancelrides , submitrating}
