const db = require("../utils/db");
exports.addController = (req, res, next) => {
    console.log(req.body);
    let sql_query = `INSERT INTO todo ( id, text) VALUES ('${req.body.id}', '${req.body.text}')`;
    db.query(sql_query, (err, result) => {
        if (!err) {
            console.log(result);
        } else {
            console.log(err);
        }
        res.status(200);
    });
};

exports.deleteController = (req, res, next) => {
    console.log(req.body, "16");
    let sql_query = `delete from todo where id = '${req.body.taskId}'`;
    db.query(sql_query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400);
        }
        console.log(result);
        res.send(result);
    });
};

exports.fetchController = (req, res, next) => {
    let sql_query = `SELECT * from todo`;
    db.query(sql_query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400);
        }
        res.send(result);
    });
};

exports.updateController = (req, res, next) => {
    console.log(req.body);
    let sql_query = `UPDATE todo SET text = '${req.body.text}' WHERE id = '${req.body.id}'`;
    db.query(sql_query, (err, result) => {
        if(err){
            console.log(err);
            return res.status(400)
        }
        console.log(result);
        res.send(result)
    });
};
