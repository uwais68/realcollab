import User from "../models/User.js"; // Make sure the User model is correctly imported

// ✅ Controller to Update User Profile
 async function updateProfile   (req, res)  {
    console.log("Decode user:", req.user);
  try {
    const { firstName, lastName, email, profilePicture } = req.body;

    // Find user by ID (from JWT token)
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update user details
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save(); // Save the updated user to the database

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default updateProfile