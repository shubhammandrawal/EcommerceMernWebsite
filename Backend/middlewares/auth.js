const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../Models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource"))
    }

    const decodedData = jwt.verify(token, process.env.JWT_Secret_Code)

    req.user = await User.findById(decodedData.id)
    next()
})

exports.authorizedRoles = (...roles) => {
   return (req, res, next) => {
        if(!roles.includes(req.user.role)){
        return next(
            new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource`, 403
            )
        )
        }
        next() 
    }
}