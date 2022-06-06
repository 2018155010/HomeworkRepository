`
<!DOCTYPE html>
<html>
    <head>
        <meta charset = "utf-8">
        <title>Product Info</title>
    </head>
    <body>
        <div class="section">
            <div class = "col1-1 centerText">
                <h1>${myproduct_title}</h1>
                <h2>Accelerate for new start.</h2>
                <img class="banner" src = "img/main.png" width="300px" height="300px">
                <br>
                <p class="centerText">Get up, and Get Ready.</p>
                <a>Find out more details</a>
                <br>
            </div>
        </div>
        <form action="/write-file" method="POST">
            <input type="text" name="commment">
            <button type="submit">Submit</button>
        </form>
    </body>
</html>`;