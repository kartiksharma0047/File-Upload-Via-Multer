import express from 'express';
import { config } from 'dotenv';
import multer from 'multer';
import path from 'path';
import { console } from 'inspector';

config(); 
const app = express();

const storage=multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,"./uploads");
  },
  filename: function(req,file,cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload=multer({storage})

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route
app.get("/", (req, res) => {
  res.render("homepage"); // Ensure you have views/homepage.ejs
});

app.post('/upload', upload.single('profileImage'),(req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

// Set a default port in case .env is missing or PORT is undefined
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
