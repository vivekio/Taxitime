const PartnerProfilrModel = require("../../../Models/Frontend/Providermodel/PartnerProfileModel");


const getPartnerprofile = (req, res) => {
  const id = req.partnerID;
  PartnerProfilrModel.getpartner(id, (err, result) => {
    if (err) {
      console.error("error getuserprofile ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

const getDocumentslist = (req, res ) =>{
  PartnerProfilrModel.getDocumentslist((err, result) => {
    if (err) {
      console.error("error getuserprofile ", err);
      return res.status(500).json({ error: "Database error" });
    }
    // console.log("this is documents list ", result);
    
    res.json(result);
  });
}

const Updatepartnerprofile = async (req, res) => {
    const id = req.partnerID;
    console.log(req.body);
    const { first_name, last_name, email, mobile, currentPassword, newPassword  } = req.body;
    const picture = req.file ? `${req.file.filename}` : null;
    
    console.log(req.file);
    
    console.log("User ID:", id);
  
    try {
      // If user is changing the password
      if (currentPassword) {
        PartnerProfilrModel.getpartner(id, async (err, result) => {
          if (err) {
            console.error("Error fetching user profile:", err);
            return res.status(500).json({ error: "Database error while fetching user." });
          }
          if (!result || result.length === 0) {
            return res.status(400).json({ error: "User not found." });
          }
  
          const password = result[0].password;
  
          const isMatch = await bcrypt.compare(currentPassword, password);
          if (!isMatch) {
            return res.status(400).json({ error : "Old password is incorrect." });
          }
  
          const hashedNewPassword = await bcrypt.hash(newPassword, 10);
          PartnerProfilrModel.updatepassword(id, hashedNewPassword, (err) => {
            if (err) {
              console.error("Error updating password:", err);
              return res.status(500).json({ error: "Database error while updating password." });
            }
            return res.status(200).json({ message: "Password updated successfully." });
          });
        });
        return; // ✅ Ensure function exits after password update
      }
  
      // Check if email already exists
      PartnerProfilrModel.cheackemailexistupdate(email, id, (err, result) => {
        if (err) {
          console.error("Error checking email existence:", err);
          return res.status(500).json({ error: "Database error while checking email." });
        }
        if (result && result.length > 0) {
          return res.status(400).json({ error: "Email already exists." });
        }
  
        // Update user profile
        PartnerProfilrModel.updateprofile(id, { first_name, last_name, email, mobile , picture }, (err, result) => {
          if (err) {
            console.error("Error updating user profile:", err);
            return res.status(500).json({ message: "Database error while updating profile." });
          }
          if (result?.affectedRows > 0) {
            console.log("Profile updated successfully.");
            return res.status(200).json({ message: "Profile updated successfully." });
          } else {
            return res.status(400).json({ message: "No changes were made to the profile." });
          }
        });
      });
  
    } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
module.exports ={getPartnerprofile , getDocumentslist , Updatepartnerprofile}