const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Product name"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Please enter Product description"]        
    },

    price: {
        type: Number,
        required: [true, "Please enter Product price"],
        maxLength: [8, "Price do not exceed more than 8 characters"]
    },

    ratings: {
        type: Number,
        default: 0     
    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    category: {
        type: String,
        required: [true, "Please enter product category"]
    },

    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "stock can not exceed more than 4 characters"],
        default: 1
    },

    numOfReviews: {
        type: Number,
        default: 0
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },

    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true
            },

            name: {
                type : String,
                required: true
            },

            rating: {
                type: Number,
                required: true
            },

            comment: {
                type: String,
                required: true
            }
        }
    ],
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)