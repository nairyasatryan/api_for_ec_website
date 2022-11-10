import express from "express";
import bodyParser from "body-parser";
import client from "./conection.js";

const app = express();
const PORT = 2356;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Go to port '/mangas' to see data");
});
app.get("/mangas", (req, res) => {
  client.query("SELECT * FROM mangas", (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

app.get("/mangas/:id", (req, res) => {
  client.query(
    `SELECT * FROM mangas WHERE id =${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
  client.end;
});

app.post("/mangas", (req, res) => {
  const manga = req.body;
  let insertQuery = `INSERT INTO mangas (id, mangaName, mangaAuthor)
                        values(${manga.id}, '${manga.manganame}', '${manga.mangaauthor}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send(JSON.stringify({ message: "Data added successfully" }));
    } else {
      res.send(JSON.stringify(err.message));
    }
  });
  client.end;
});

app.put("/mangas/:id", (req, res) => {
  let manga = req.body;
  let updateQuery = `update mangas set 
                      manganame = '${manga.manganame}',
                      mangaauthor ='${manga.mangaauthor}'
                      where id = ${manga.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send(JSON.stringify({ message: "Update was succesfull" }));
    } else {
      res.send(JSON.stringify(err.message));
    }
  });
  
});

app.delete("/mangas/:id", (req, res) => {
  const deleteQuery = `delete from mangas where id=${req.params.id}`;
  client.query(deleteQuery, (err, result)=>{
    if(!err){
      res.send(JSON.stringify({message:"Data was deleted succesfully"}))
    }else{
      res.send(JSON.stringify(err.message))
    }
  })
  client.end
})

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

client.connect();
