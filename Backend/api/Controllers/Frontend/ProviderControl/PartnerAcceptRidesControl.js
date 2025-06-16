const PartnerAcceptRideModel = require("../../../Models/Frontend/Providermodel/PartnerAcceptRideModel");
const RidesModel = require("../../../Models/Frontend/UserModel/RidesModel")
const {getIO} = require("../../../socket_io");
const getallridesdetilas = (req, res) => {
    const id = req.params.id;
    PartnerAcceptRideModel.getallridesdetilas(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message || "Database error" });
        }
        res.json(results);
    });
};
const rideupdate = (userid) =>{
    const io = getIO();
    RidesModel.getRides(userid, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        console.log("this is results",results);
        io.to(`user_${userid}`).emit("rideupdate" , results);
})
}


const updateStatus = (req, res) => {
    const id = req.params.id;
    const provider_id = req.partnerID;
    const status = "ACCEPTED";

    PartnerAcceptRideModel.updateAcceptStatus(id , provider_id , status, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message || "Database error" });
        }
            const otp = Math.floor(1000 + Math.random() * 9000);
            console.log( "this is otp  " , otp);
            
            PartnerAcceptRideModel.updateotp(id, otp, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err.message || "Database error" });
            }
            });
            const userid = results[0].user_id
            rideupdate(userid)
        res.json(results);
    })
}
const ridesstart = (req, res) => {
    const id = req.params.id;
    const provider_id = req.partnerID;
    const status = "STARTED";
    PartnerAcceptRideModel.updatestartStatus(id ,provider_id, status, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message || "Database error" });
        }
        const userid = results[0].user_id
        rideupdate(userid)
        res.status(200).json({message:"ride started"});
    })
}
const ridesdrop = (req, res) => {
    const id = req.params.id;
    const provider_id = req.partnerID;
    const status = "DROPPED";
    PartnerAcceptRideModel.updatedropStatus(id ,provider_id, status, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message || "Database error" });
        }
        const userid = results[0].user_id
        rideupdate(userid)
        res.status(200).json({message:"ride dropped"});
    })
}
const ridescomplete = (req, res) => {
    const id = req.params.id;
    const provider_id = req.partnerID;
    const status = "COMPLETED";
    PartnerAcceptRideModel.updatefinishStatus(id ,provider_id, status, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message || "Database error" });
        }
        const userid = results[0].user_id
        rideupdate(userid)
        res.status(200).json({message:"ride dropped"});
    })
}

const verifyridesotp = (req, res) => {
    const id = req.params.id;

    
    const otp = req.body.otp;
    console.log("this is otp",otp);
    
    PartnerAcceptRideModel.getotp(id , (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message || "Database error" });
        }

        console.log("this is results",results[0].otp);
        

        if (results[0].otp == otp) {
            const status = "PICKEDUP";
            PartnerAcceptRideModel.updatestauspickup(id , status, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: err.message || "Database error" });
                }
            });
            console.log("this is otp",results[0].user_id);
            const userid = results[0].user_id
            rideupdate(userid)
          return  res.status(200).json({message:"otp verified"});
        }
        else{
           return  res.status(400).json({message:"otp not verified"});
        }
        
    })
}

const cancelridebyprovider = (req, res) =>{
    const data = req.body ;

    const cancelled_by = "PROVIDER"
    const {id} = req.params ;
    const status = "CANCELLED";
    RidesModel.cancelrides(data , id , status, cancelled_by, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.status(200).json(results)
    })
}

module.exports = { getallridesdetilas , updateStatus  , verifyridesotp , ridesstart ,ridesdrop ,ridescomplete ,cancelridebyprovider};