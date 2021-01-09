const app = require('express')();

app.set('view engine', 'ejs');

app.listen(6969, () => {
    console.log("listening on http://localhost:6969");
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});
