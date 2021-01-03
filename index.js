const app = require('express')();

// // express app
// const app = express();

app.listen(6969, () => {
    console.log("listening on http://localhost:6969");
});

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.send("<p>about page</p>");
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./public/404.html', { root: __dirname });
});