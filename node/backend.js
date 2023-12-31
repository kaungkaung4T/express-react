



let express = require("express")
let mysql = require("mysql")

let app = express()

app.use(express.json())

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "backend_item"
})


app.get("/item", item)
function item (request, response) {
    let item = "SELECT * FROM item WHERE name=?"
    db.query(item, ["eeee"], (error, data) => {
        if (error) {response.json(error)}
        response.json(data)
    })
}


app.post("/create_item", create_item)
function create_item (request, response) {
    let name = request.body.name
    let price = request.body.price
    let create = "INSERT INTO item (name, price) VALUES (?)"
    values = [
        name,
        price
    ]
    db.query(create, [values], (error, data) => {
        if (error) {response.json(error)}
        response.json(data)
    })
}


app.put("/update/:id", update_item)
function update_item (request, response) {
    let id = request.params.id
    let name = request.body.name
    let price = request.body.price
    let update = "UPDATE item SET name=?, price=? WHERE id=?"
    values = [
        name,
        price
    ]
    db.query(update, [...values, id], (error, data) => {
        if (error) {response.json(error)}
        response.json(data)
    })
}


app.post("/delete/:id", delete_item)
function delete_item (request, response) {
    let id = request.params.id

    let delete_query = "DELETE FROM item WHERE id=?"

    db.query(delete_query, [id], (error, data) => {
        if (error) {response.json(error)}
        response.json(data)
    })
}

app.listen(5000)
