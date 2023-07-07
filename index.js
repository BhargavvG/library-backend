const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const books = require("./books.json");
dotenv.config();
app.use(cors());
app.use(express.json());
app.get("/books", (req, res) => {
  const {skip, limit, author, genre, title} = req.query;
    const resBooks = [];
    books.forEach((book) =>{
        let check = true;
        if(author && !book.author.toLocaleLowerCase().includes(author.toLocaleLowerCase())){
            check = false;
        }
        if(genre && !book.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase())){
            check = false;
        }
        if(title && !book.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())){
            check = false;
        }
        if(check){
            resBooks.push(book);
        }
    })
    res.json({books: limit ? resBooks.slice(skip||0, limit) : resBooks.slice(skip||0)})
});

const port = process.env.PORT || 8080;
try {
  app.listen(port, () => {
    console.log(`server is runing on port ${port} ...`);
  });
} catch (err) {
  console.log(err);
}
module.exports = app;
