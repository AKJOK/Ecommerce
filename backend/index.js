const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection with MongoDB
const mongoURI = 'mongodb+srv://chaamankumar0007:chaamankumar0007@cluster0.zcbje.mongodb.net/';
mongoose
    .connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Define port
const port = 4000;

// Ensure the 'upload/images' directory exists
const uploadDir = path.join(__dirname, 'upload/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files for uploaded images
app.use('/images', express.static(uploadDir));

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
});

// Schema for Products
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Express App is running');
});

// Upload endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'File upload failed' });
    }
    res.json({
        success: 1,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
});

// Add product endpoint
app.post('/addproduct', async (req, res) => {
    try {
        const products = await Product.find({});
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Remove product endpoint
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get all products endpoint
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Schema creating for User model

 const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object, 
    },
    date:{
        type:Date,
        default:Date.now,
    }
 })

 //Creating Endpoint for registering
app.post('/signup',async (req,res)=>{

   let check =await Users.findOne({email:req.body.email});
   if(check){
     return res.status(400).json({success:false,errors:"existing users found with same email address"})
   }
   
   let cart = {};
   for(let i=0;i<300;i++){
      cart[i]=0;
   }
   const user = new Users({
     name:req.body.username,
     email:req.body.email,
     password:req.body.password,
     cartData:cart,
   })

   await user.save();

   const data = {
     user:{
         id:user.id
     }
   }
   
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
