import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());




if (process.env.NODE_ENV === "production") {
  console.log("App is running in production mode");
  // Additional production optimizations (e.g., disable logging, caching)
} else {
  console.log("App is running in development mode");
}


// 🔥 Serve uploaded files statically
app.use("/upload", express.static(path.join(__dirname, "../client/public/upload")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  if (!req.file) {
    console.error("Upload error: No file received");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(5000, () => {
  console.log("Connected!");
});
