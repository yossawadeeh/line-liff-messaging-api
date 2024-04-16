const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
const port = 8888;

const LINE_BOT_API = "https://api.line.me/v2/bot";

app.use(express.json());

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
};

// const sendMessage = async () => {
//   try {
//     if (!lineMessage.value) {
//       throw new Error("message not found");
//     }
//     const response = await axios.post("http://localhost:8888/send-message", {
//       userId: userId,
//       message: lineMessage.value,
//     });

//     res.json({
//       message: "Send message successfully",
//       responseData: response.data,
//     });
//   } catch (error) {
//     res.json({
//       message: "Send message faild",
//       responseData: error.response,
//     });
//   }
// };

app.post("/send-message", async (req, res) => {
  try {
    const { userId, message } = req.body;
    const body = {
      to: userId,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    };
    const response = await axios.post(`${LINE_BOT_API}/message/push`, body, {
      headers,
    });

    console.log("response : ", response.data);
    res.json({
      message: "Send message successfully",
      responseData: response.data,
    });
  } catch (error) {
    console.log("error : ", error.response);
    res.json({
      message: "Send message faild",
      responseData: error.response,
    });
  }
});

app.listen(port, async () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
