const Product = require('../Models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const ApiFeatures = require('../utils/apiFeatures')


//get all product
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
    const products = await apiFeature.query
    res.status(200).json({
        success: true,
        products,
        productCount
    })
})

//get product details
exports.getPrductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", "404"))
    }

    res.status(201).json({
        success: true,
        product
    })
})

//create product : Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id
    
    const product = await Product.create(req.body)  

    res.status(201).json({
        success: true,
        product
    })
})


//update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", "404"))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})


//delete product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", "404"))
    }

    await product.deleteOne()

    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })
})