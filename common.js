import multer from "multer";
import jwt from 'jsonwebtoken';
const secret_key = "secret_key";

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json('Access denied. No token provided');
    }
    const user = token.split(" ");
    const xx = user[1];
    try {
      const decoded = jwt.verify(xx, secret_key); // Replace 'secret_key' with your own secret key
  
      // Attach the decoded user information to the request object
      req.user = decoded;
      console.log(req.user);
  
      next(); // Call the next middleware or route handler
    } catch (err) {
      res.status(401).json('Invalid token');
    }
  };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'); // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename
    }
  });
  
  // Create a Multer upload middleware
  export const upload = multer({ storage });