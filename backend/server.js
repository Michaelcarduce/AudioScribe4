const express = require("express");
require("dotenv").config();
const connectDB = require("./Config/db");
const http = require("http");
const helmet = require("helmet");
const mongoose = require("mongoose");
const colors = require("colors");
const userRoutes = require("./Routes/UserRoutes");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { exec } = require("child_process");
const bodyparser = require("body-parser");
const gtts = require("gtts");
const Sentiment = require("sentiment");

const app = express();
const sentiment = new Sentiment();

app.use(helmet());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "http://localhost:5000"],
      mediaSrc: ["'self'", "http://localhost:5000", "blob:"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "ws://localhost:5000"],
    },
  })
);

const server = http.createServer(app);

connectDB();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/Public/Uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({ storage: storage });
var uploadMultiple = upload.fields([{ name: "video" }, { name: "audio" }]);
var uploadVideo = upload.single("video");

app.use("/api/user", userRoutes);

app.post("/convert", (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      output =
        "backend/Public/Uploads/" +
        Date.now() +
        "output" +
        path.extname(req.files.video[0].path);

      exec(
        `ffmpeg -i ${req.files.video[0].path} -stream_loop -1 -i ${req.files.audio[0].path} -map 0:v -map 1:a -c copy -shortest ${output}`,
        (err, stderr, setdout) => {
          if (err) {
            console.log(err);
          } else {
            // console.log("conversion completed");
            const readStream = fs.createReadStream(output);

            res.set({
              "Content-Type": "video/mp4",
              "Content-Disposition": `attachment; filename="modified-${req.files.video[0].originalname}"`,
            });

            // console.log(req.files.video[0].path);
            // console.log(req.files.audio[0].path);
            console.log(output);
            readStream.pipe(res).on("finish", () => {
              fs.unlinkSync(req.files.video[0].path);
              fs.unlinkSync(req.files.audio[0].path);
              fs.unlinkSync(output);
              console.log("files deleted");
            });
          }
        }
      );
    }
  });
});

app.post("/convert/single", (req, res) => {
  uploadVideo(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      output =
        "backend/Public/Uploads/" +
        Date.now() +
        "output" +
        path.extname(req.file.originalname);

      exec(
        `ffmpeg -i ${req.file.path} -an -c:v copy ${output}`,
        (err, stderr, setdout) => {
          if (err) {
            console.log(err);
          } else {
            // console.log("conversion completed");
            const readStream = fs.createReadStream(output);

            res.set({
              "Content-Type": "video/mp4",
              "Content-Disposition": `attachment; filename="modified-${req.file.originalname}"`,
            });

            // console.log(req.file.path);
            console.log(output);
            readStream.pipe(res).on("finish", () => {
              fs.unlinkSync(req.file.path);
              fs.unlinkSync(output);
              console.log("files deleted");
            });
          }
        }
      );
    }
  });
});

app.post("/texttospeech", async (req, res) => {
  try {
    if (!req) {
      throw new Error("Request not found");
    }
    const { text, language } = req.body;
    // const outputFilePath = `backend/Public/UploadsTTS/${Date.now()}output.mp3`;
    const outputFilePath = path.resolve(
      `backend/Public/UploadsTTS/${Date.now()}output.mp3`
    );
    const voice = new gtts(text, language);
    await Promise.race([
      new Promise((resolve, reject) => {
        voice.save(outputFilePath, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Timeout error"));
        }, 60000); // Timeout after 60 seconds
      }),
    ]);

    res.sendFile(outputFilePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Unable to send audio file");
      }
      fs.unlinkSync(outputFilePath);
    });
  } catch (error) {
    console.error(error);
    // fs.unlinkSync(outputFilePath);
    res.status(500).send("Unable to convert to audio");
  }
});

// app.post("/sentiment", async (req, res) => {
//   const { text } = req.body;
//   // console.log(text);
//   try {
//     // const correctedText = spellCorrector.correct(text);
//     // const processedText = stopword
//     //   .removeStopwords(correctedText.split(" "))
//     //   .join(" ");
//     //   const result = sentiment.analyze(processedText);

//     const result = sentiment.analyze(text);
//     res.json(result);
//     // const sentiments = result.score; // Assuming 'result.score' represents the sentiment score
//     // res.json({ sentiments });
//     console.log(result);
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

// --------------------Deployment------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is not running on deployment");
  });
}

// --------------------Deployment------------------

app.use(async (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    error: "Server error",
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

mongoose.connection.on("error", (error) => {
  console.error(`Error connecting to database: ${error.message}`.red.bold);
  process.exit(1);
});

//  origin: "http://165.22.76.202:3000",
//  origin: "http://localhost:3000",
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    if (userData && userData.user && userData.user._id) {
      socket.join(userData.user._id);
      console.log(userData.user._id);
      socket.emit("connected");
    }
  });
});
