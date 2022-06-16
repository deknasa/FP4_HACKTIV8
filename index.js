require("dotenv").config();

const express = require("express");
const app = express();

const userRouter = require('./routes/user')
const photoRouter = require('./routes/photo')
const commentRouter = require('./routes/comment')
const socialMediaRouter = require('./routes/social_media')

const port = process.env.PORT || 9490;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRouter)
app.use('/photos', photoRouter)
app.use('/comments', commentRouter)
app.use('/socialmedias', socialMediaRouter)

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

module.exports = app