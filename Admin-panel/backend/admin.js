const router=require("express").Router();
const bcrypt=require('bcrypt');
const Joi = require("joi");
const{User,validate}=require('./Models/user');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const multer = require('multer');
const upload = multer();
const validate1 = (data) => {
	const schema = Joi.object({
		Email: Joi.string().email().required().label("Email"),
		Password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};


router.post("/Login1", async (req, res) => {
	try {
    console.log(req.body);
		const { error } = validate1(req.body);
    console.log(error);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ Email: req.body.Email });
    console.log(user)
		if (!user)
    
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.Password,
			user.Password
		);
    console.log(validPassword)
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
		const token = user.generateAuthToken();
    console.log(token)
		
		res.status(200).send({ data: token, message: "logged in successfully" }
		);
		
	
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});



let storedOTP='';

router.post('/sign1',async(req,res)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sales@hubhawks.com',
      pass: 'rkcknmtciawqanpq'
    }
  });
  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false });
storedOTP=otp
  // Create the email message
  const mailOptions = {
    from: 'sales@hubhawks.com',
    to: req.body.Email, // Assuming the email is sent in the request body
    subject: 'OTP Verification',
    text: `Your OTP code is: ${otp}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'OTP sent successfully' });
    }
  });

})

router.post('/Otp1',async(req,res)=>{
  const userOTP = req.body.Otp; // Assuming the OTP is sent in the request body

  // Assuming you have stored the generated OTP in a variable or database
  if (userOTP === storedOTP) {
    res.status(200).json({ message: 'OTP verification successful' });
  } else {
    res.status(400).json({ error: 'OTP verification failed' });
  }

})

router.post('/slush',async(req,res)=>{
  const { Name, Email,Password,confirmPassword,  } = req.body;
  try {
    console.log(req.body);
  

    const { error } = validate({Name, Email,Password,confirmPassword });
    console.log(error, "checking");

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    console.log(User)
    const user = await User.findOne({ Email: req.body.Email });
    console.log(user, "1st");

    if (user) {
      return res.status(409).send({ message: "User with given email already exists!" });
    }

    console.log("No user found in the database");

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    console.log("Salt generated");

    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    console.log("Password hashed");

    const newUser = new User({ ...req.body, Password: hashedPassword });
    await newUser.save();

    console.log("User created successfully");

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/user/:userId', async (req, res) => {
	try {
	  const userId = req.params.userId; //dynamic value ati h
    
      console.log(userId)
	  // Fetch the user data from MongoDB based on the provided user ID
	  const user = await User.findById(userId);
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  // Return the user data as the API response
	  res.json(user);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  });




 router.get('/users/photo/:id', async (req, res) => {
	try {
		console.log(req.body);
		const id = req.params.id;
		const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Send the user photo data back as a response
    res.send(user.photo);
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  });


router.post('/users/photo', upload.single('photo'), async (req, res) => {
	try {
		console.log(req.body);
		console.log(req.file);
		console.log(req.body.userId,);
	  const user = await User.findById(req.body.userId);
  
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  user.photo = req.file.buffer;
		console.log(user.photo);
		console.log('yesss')
	  await user.save();
  
	  res.json(user);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  });

  router.post("/update-password", async (req, res) => {
    const password = req.body.newPassword;

    const email = req.body.user.Email;
    console.log(password,email)
    try {
      const user = await User.findOne({ email }); 
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Update the password
      await User.updateOne({ email: user }, { $set: { Password: hashedPassword } });
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });


module.exports=router