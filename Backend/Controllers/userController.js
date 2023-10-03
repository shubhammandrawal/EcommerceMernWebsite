const ErrorHandler = require("../utils/errorHandler");
const User = require("../Models/userModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail.js")
const crypto = require('crypto')

//register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    avatar: {
      public_id: "sample",
      url: "sample",
    },
  });

  sendToken(user, 201, res);
});

//login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password"));
  }
  sendToken(user, 200, res);
});

//logout user

exports.loggingOutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `your password reset token is :- \n\n ${resetPasswordUrl} 
    \n\n If you have not requested this email then please ignore it`;

    try {
        await sendMail({
            email: user.email,
            subject: "Ecommerce password recovery",
            message 
        })        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 501))
    }
});

//reset password
exports.resetPassword = catchAsyncError(async(req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user){
      return next(new ErrorHandler(`Reset password is invalid or expired`, 400))
    }

    if(req.body.password !== req.body.confirmPassword){
      return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.password
    resetPasswordToken = undefined
    resetPasswordExpire = undefined

    await user.save()
    sendToken(user, 200, res)
})

