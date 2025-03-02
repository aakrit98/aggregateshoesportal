// const  {v4: uuidv4} = require("uuid");
// const User = require("../models/userModel");
// const {setUser} = require("../service/auth");

// async function handleUserSignup(req,res) {
//   const{name,email,password} = req.body;
//   await User.createUser({
//     name,
//     email,
//     password,
//   });
//   return res.redirect("/")
// }

// async function handleUserLogin(req,res) {
//   const {email,password} = req.body;
//   const user = await User.findOne({email,password});

//   if(!user)
//     return res.render("login" , {
//   error: "Invalid Username or Password",
// });

// const toekn = setUser(user) ;
// res.cookie("uid" , token);
// return res.redirect("/");
// }

// module.exports = {
//   handleUserLogin,
//   handleUserSignup
// }

const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.createUser({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  // Use findUserByEmail instead of findOne
  const user = await User.findUserByEmail(email);

  if (!user || user.password !== password)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  handleUserLogin,
  handleUserSignup,
};
