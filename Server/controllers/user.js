var Loginvalidate = require('../utils/validate')
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
UserSignup: async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
},
userLogin:  async (req, res) => {
  try {
    var { error } = Loginvalidate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    var user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    var validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    var token = user.generateAuthToken();
    res
      .status(200)
      .json({ token, user });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }


},
verifyToken: async (req, res) => {
  try {
    const Token = req.body.Token;
    const decoded = jwt.verify(Token, process.env.JWTPRIVATEKEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (user.image) user.image = `http://localhost:9000/${user.image}`;
    else
      user.image = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
    return res.status(200).json({ message: "token valid", user });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
},




}