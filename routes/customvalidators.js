// Custom validation middleware for email
const validateEmail = (req, res, next) => {
    const email = req.body.email;
    const errors = [];
 
    if (!isValidEmail(email)) {
      errors.push({ msg: 'Invalid email address' });
    }
 
    // Assign the errors to req.validationErrors
    req.validationErrors = req.validationErrors || [];
    req.validationErrors.push(...errors);
 
    next();
  };
  const ValidateTime = (req, res, next) => {
    const expiry = req.body.expirydate;
    console.log(expiry,"expiry")
    var currentdate=new Date().toISOString().slice(0,10)
    const errors = [];
 
    if(expiry<currentdate) {
      errors.push({ msg: 'Date expired' });
      console.log("date expired")
    }
 
    // Assign the errors to req.validationErrors
    req.validationErrors = req.validationErrors || [];
    req.validationErrors.push(...errors);
 
    next();
  };
  
  const ValidateConfirmpassword = (req,res,next) =>{
    const confirm=req.body.confirmpassword;
    const password = req.body.password;
    const errors=[];
    console.log(password,confirm)

    if(!isvalidConfirmpassword(confirm,password))
      {
        errors.push({msg:"password and confirm password doesn't match"})
      }
    req.validationErrors = req.validationErrors || [];
    req.validationErrors.push(...errors);
    next();
  }
 
  // Custom validation middleware for password
  const validatePassword = (req, res, next) => {
    const password = req.body.password;
    console.log('password not get',password)
    const errors = [];
 
    if (!isValidPassword(password)) {
      errors.push({ msg: 'Password must meet certain criteria' });
    }
 
    // Assign the errors to req.validationErrors
    req.validationErrors = req.validationErrors || [];
    req.validationErrors.push(...errors);
 
    next();
    console.log(req.validationErrors,"hi")
  };
 


// Custom email validation logic
const isValidEmail = (email) => {
  // Implement your custom email validation logic here
  // Example: Check if the email follows a specific format using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


// Custom password validation logic
const isValidPassword = (password) => {
  // Implement your custom password validation logic here
  // Example: Check if the password is at least 8 characters long
  return password.length >= 8;
};

const  isvalidConfirmpassword = (confirm,password) =>
  {
    return password==confirm;
  }
const isAuthenticated = (req,res,next) =>{
  if(req.session && req.session.userEmail)
    {
      return next();
    }
    res.redirect('/')
}
const isAuthenticateddomain = (allowedDomain) => (req,res,next) =>{
    if(req.session && req.session.userEmail)
      {
        const userEmail = req.session.userEmail;
        console.log('User Email :',userEmail);
        if(!allowedDomain || userEmail.endsWith(allowedDomain))
          {
            return next();
          }else{
            return res.status(403).send('unauthorized')
          }
      }
      console.log('user email not found in session',req.session);
      res.redirect('/')
}
module.exports = { validateEmail, validatePassword,ValidateConfirmpassword,isAuthenticated,isAuthenticateddomain ,ValidateTime};