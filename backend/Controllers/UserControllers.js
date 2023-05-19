const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const Session = require("../Models/SessionModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the Fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  //   201 means success
  if (user) {
    // Create a new session document with the user ID
    const session = await Session.create({ userID: user._id });
    // Return the session ID and user information in the response

    res.status(201).json({
      sessionId: session._id,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // console.log({ email }, { password });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    // Create a new session document with the user ID
    const session = await Session.create({ userID: user._id });
    // Return the session ID and user information in the response
    res.json({
      sessionId: session._id,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// const sessionUser = asyncHandler(async (req, res) => {
//   const session = await Session.create({
//     userID,
//   });
//   //   201 means success
//   if (session) {
//     res.status(201).json({
//       _id: session._id,
//       sessionID: session.userID,
//     });
//   } else {
//     res.status(400);
//     throw new Error("Failed to create the user");
//   }
// });

module.exports = { registerUser, authUser };
