const app = require('express')();

app.set('view engine', 'ejs');

app.listen(6969, () => {
    console.log("listening on http://localhost:6969");
});

app.get('/', (req, res) => {
    res.render('index');
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