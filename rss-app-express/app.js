const express = require('express');
const Parser = require('rss-parser');
const path = require('path');
const app = express();
const parser = new Parser();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const rssURL = req.query.url || 'https://vnexpress.net/rss/tin-moi-nhat.rss';
    const feed = await parser.parseURL(rssURL);
    res.render('index', { items: feed.items });
  } catch (error) {
    console.error('Error fetching RSS data:', error);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000/');
});
