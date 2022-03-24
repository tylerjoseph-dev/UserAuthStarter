const { PORT = 5000} = process.env;
const app = require('./app');

// Router declarations
const userRouter = require("./user/user.router");

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

app.use('/user', userRouter);