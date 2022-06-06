const express = require('express');
const app = express();
const sqlite3 = require('sqlite');
const sqlite = require('sqlite');

app.use(express.static("public"));

app.get("/", function(req,res){res.send("/public/index.html")});
app.get("/login.html", function(req,res){res.send("/public/login.html")});
app.get("/signup.html", function(req,res){res.send("/public/signup.html")});
app.get("/product/:product_id", function(req,res){res.send("/public/product.html")})

const fs= require("fs");

async function getDBConnection(){
    const db = await sqlite.open({
        filename: 'product.db',
        driver: sqlite3.Database
    });
    return db;
}

app.get('/', async function(req,res){
    let db = await getDBConnection();
    let rows = await db.all('select * from products');
    await db.close();
    myproduct_list = '';
    for (var i=0; i<rows.length; i++){
        myproduct_list+='<div class="itemBox"><div class="imageBox"><img src="'+rows[i][product_image]+'" width = "100%"></div><div><product>'+rows[i][product_title]+'</product><price>'+rows[i][product_price]+'</price></div></div>'
    }
    console.log(myproduct_list)
    var output = 
    `<!DOCTYPE html>
    <html>
        <head>
            <meta charset = "utf-8">
            <link rel="stylesheet" type="text/css" href = "./public/main.css">
            <title>Sprint</title>
        </head>
        <body>
            <header>
                <h3 class="slide forHeader"><em>Sprint</em></h3>
                <div class="nav">
                    <a href="#">Best Items</a>
                    <a href="#">Daily Meal</a>
                    <a href="#">Well-Balanced</a>
                    <a href="#">Skin-wellness</a>
                    <a href="#">MD Picks</a>
                    <a href="#">Life Goods</a>
                    <a href="login.html">Log In</a>
                    <a href="signup.html">Sign Up</a>
                </nav>         
            </header>
            <div class="section">
                <div class = "col1-1 centerText">
                    <h1>Spring Up Your Energy!</h1>
                    <h2>Accelerate for new start.</h2>
                    <img class="banner" src = "img/main.png" width="300px" height="300px">
                    <br>
                    <p class="centerText">Get up, and Get Ready.</p>
                    <a>Find out more details</a>
                    <br>
                </div>
            </div>
            <div class="section">
                <h2>Never Miss Your Chance to Get these for Lower Price.</h2>
                <div class="itemlist flex-container">
                    ${myproduct_list}
                </div>
            </div>
            <footer class="infoColor centerText">
                <h3>For more, contact us</h3>
                <a href="commerce@sprint.com">commerce@sprint.com</a>
            </footer>
        </body>
    </html>
    `;
    res.send(output)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/product/:product_id", function(req,res){
    console.log(req.body);

    if(!req,body?.content){
        res.status(400).send("400에러! content가 postbody에 없습니다");
        return;
    }

    fs.readFile("comment.json", "utf-8", async function (error, data){
        if(error){
            if(error.code === "ENOENT"){
                res.status(404).send(`${req.query.file}이 없습니다`);
            } else {
                res.status(500).send("500 서버 에러");
            }
        } else {
            const comment = JSON.parse(data);
            comment.push(req.body)
            fs.writeFile('comment.json', JSON.stringify(comment), function (error, data) {
                if(error){
                    res.status(500).send("500서버 에러");
                } else {
                    res.status(201).send("파일 생성 성공");
                }
            });
        }
    });

});




app.get('/product/:product_id', async function(req,res){
    let db = await getDBConnection();
    await db.run(`insert into products(,) values()`);
    let rows = await db.all('select * from products');
    await db.close();

    console.log(myproduct)
    var output = 
 
    res.send(output)
});

var port = 3000;
app.listen(port, function(){
    console.log('server on! http://localhost:'+port);
});