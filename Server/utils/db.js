import mysql from 'mysql'

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestemploye'
})

con.connect((err)=>{
    if (err) {
        console.log("Erreur de connection à la base de donée");
    } else {
        console.log("Base de donnée connectée avec Succès");
    }
})

export default con;