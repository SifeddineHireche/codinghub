const express = require("express");
const app = express();
const mysql= require("mysql");

const cors = require("cors");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
const port = 3003;

const db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "workers_crud"
});


app.post('/create',(request,response)=>{
    const profil=request.body.profil;
    const titre=request.body.titre;
    const experience=request.body.experience;
    const tjm=request.body.tjm;
    const stack=request.body.stack;
    const disponibilite=request.body.disponibilite;
    const mobilite=request.body.mobilite;
    const statu=request.body.statu;
    const contact=request.body.contact;
   
     result = db.query('INSERT INTO profils(profil,titre,experience,tjm,stack,disponibilite,mobilite,statu,contact) VALUES (?,?,?,?,?,?,?,?,?)',
        [profil,titre,experience,tjm,stack,disponibilite,mobilite,statu,contact],
        (err,result)=> {if(err){
            console.log(err);
        }else{
            response.send(result);
        }
    });
});

app.get("/profils",(request,response)=>{
    db.query('SELECT * FROM profils',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            response.send(result);
        }
    }
);
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });
  
  // Middleware
app.use(bodyParser.json());
const { Resend } = require('resend');

app.use(bodyParser.json()); // Para manejar JSON en el cuerpo de la solicitud

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
app.put("/update",(request,response)=>{
    const id = request.body.id;
    const profil=request.body.profil;
    const titre=request.body.titre;
    const experience=request.body.experience;
    const tjm=request.body.tjm;
    const stack=request.body.stack;
    const disponibilite=request.body.disponibilite;
    const mobilite=request.body.mobilite;
    const statu=request.body.statu;
    const contact=request.body.contact;

    db.query('UPDATE profils SET profil=?,titre=?,experience=?,tjm=?,stack=?,disponibilite=?,mobilite=?,statu=?,contact=? Where id=?'
        ,[profil,titre,experience,tjm,stack,disponibilite,mobilite,statu,contact,id],
        (err,result)=> {if(err){
            console.log(err);
        }else{
            response.send(result);
        }
    });
});

app.delete("/delete/:id",(request,response)=>{
    const id = request.params.id;
    db.query('DELETE FROM profils  Where id=?',id,
        (err,result)=> {
        if(err){
            console.log(err);
        }else{
            response.send(result);
        }
    });
});

app.get("/findProfil/:id",(request,response)=>{
   
    const id = request.params.id;
    db.query('SELECT * FROM profils INNER JOIN profilsdetails ON profils.id = profilsdetails.id_profil Where id_profil=? ',id,
        (err,result)=> {
        if(err){
            console.log(err);
        }else{
            response.send(result);
        }
    });
});

const resend = new Resend('re_ZRKKytdg_6AieSQhoTULm3QsBybePTugE'); // Reemplaza con tu API Key de Resend

app.post('/send-email', async (req, res) => {
  const { profileId } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['hireche8@gmail.com'],
      subject: `Profile numero  ${profileId} clické on CodingHub`,
      html: `<strong>Someone clicked on the profile with ID: ${profileId}</strong>`,
    });
    res.status(200).json(response);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', details: error.message });
  }
});


app.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, role], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error registering user' });
            res.status(201).json({ message: 'User registered successfully' });
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error logging in' });

        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = results[0];
        console.log("user : " + user);
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });

        // Enviar el token y el nombre del usuario
        res.status(200).json({
            message: 'Logged in successfully',
            token,
            userName: user.username,
            role: user.role
        });
    });
});
// Middleware de autenticación y autorización
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}

// Rutas protegidas
app.get('/admin-data', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'This is admin data' });
});

app.get('/user-data', authenticateToken, (req, res) => {
    res.json({ message: `This is user data for ${req.user.role}` });
});

app.post('/createDetails', (req, res) => {
    const { id_profil, nom, anneDebut, anneFin, entreprise, description } = req.body;
  
    const sqlInsertProfilDetails = "INSERT INTO profilsdetails (id_profil, nom, anneDebut, anneFin, entreprise, description) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sqlInsertProfilDetails, [id_profil, nom, anneDebut, anneFin, entreprise, description], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting into profilsdetails");
      } else {
        res.status(201).send("Details added successfully");
      }
    });
  });



app.listen(3001,()=>{
    console.log("express loading 3001")
})
