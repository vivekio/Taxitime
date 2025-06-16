const UserProfilrModel = require("../../../Models/Frontend/UserModel/UserProfileModel");
const bcrypt = require("bcrypt");

const getuserprofile = (req, res) => {
  const id = req.userID;
  UserProfilrModel.getuser(id, (err, result) => {
    if (err) {
      console.error("error getuserprofile ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

// const updateprofile = async (req, res) => {
//   const id = req.userID;
//   console.log(req.body);
//   const { first_name, last_name, email, mobile } = req.body;
//   console.log(id);
//   if (req.body.currentPassword) {
//     UserProfilrModel.getuser(id, async(err, result) => {
//       if (err) {
//         console.error("error getuserprofile ", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       const password = result[0].password;
  
//     const isMatch = await bcrypt.compare(req.body.currentPassword, password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Old password is incorrect" });

//     const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
//     UserProfilrModel.updatepassword(id, hashedNewPassword, (err, result) => {
//       if (err) {
//         console.error("error getuserprofile ", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//      return res.status(200).json({ message: "Profile Update Successfully " });
//     });
//   })};
//   UserProfilrModel.cheackemailexistupdate(email, id, (err, result) => {
//     if (err) {
//       return res
//         .status(err.status || 500)
//         .json({ error: err.message || "Database error" });
//     }

//     UserProfilrModel.updateprofile(
//       id,
//       { first_name, last_name, email, mobile },
//       (err, result) => {
//         if (err) {
//           console.error("Error updating user:", err);
//           return res.status(500).json({ message: "Server error" });
//         }
//         if (result?.affectedRows > 0) {
//           console.log("this is new data ");

//           return res.status(200).json({ message: "User updated successfully" });
//         }
//       }
//     );
//   });
// };
const updateprofile = async (req, res) => {
    const id = req.userID;
    console.log(req.body);
    const { first_name, last_name, email, mobile, currentPassword, newPassword  } = req.body;
    const picture = req.file ? `${req.file.filename}` : null;
    
    console.log(req.file);
    
    console.log("User ID:", id);
  
    try {
      // If user is changing the password
      if (currentPassword) {
        UserProfilrModel.getuser(id, async (err, result) => {
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
          UserProfilrModel.updatepassword(id, hashedNewPassword, (err) => {
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
      UserProfilrModel.cheackemailexistupdate(email, id, (err, result) => {
        if (err) {
          console.error("Error checking email existence:", err);
          return res.status(500).json({ error: "Database error while checking email." });
        }
        if (result && result.length > 0) {
          return res.status(400).json({ error: "Email already exists." });
        }
  
        // Update user profile
        UserProfilrModel.updateprofile(id, { first_name, last_name, email, mobile , picture }, (err, result) => {
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
module.exports = {
  getuserprofile,
  updateprofile,
};
