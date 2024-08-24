const {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
    FRONTEND_URL,
    PORT,
} = require('./config.js');

const express = require("express");
const app = express();
const pg = require('pg');

const cors = require("cors");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
const port = PORT || 3003;

app.use(
    cors({
        origin: FRONTEND_URL,
    })
);


const db = new pg.Pool({
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    ssl: {
        rejectUnauthorized: false // Ajusta esta configuración según las necesidades de tu proveedor
    }
});

app.get("/ping", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");
        res.send({
            pong: result.rows[0].now,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error executing query");
    }
});

app.post('/create', async (req, res) => {
    const { profil, titre, experience, tjm, stack, disponibilite, mobilite, statu, contact } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO profils (profil, titre, experience, tjm, stack, disponibilite, mobilite, statu, contact, isApproved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [profil, titre, experience, tjm, stack, disponibilite, mobilite, statu, contact, false]
        );
        res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting data");
    }
});

app.get("/profils", async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM profils WHERE isApproved = TRUE');
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});

app.put("/update", async (req, res) => {
    const { id, profil, titre, experience, tjm, stack, disponibilite, mobilite, statu, contact } = req.body;
    try {
        const result = await db.query(
            'UPDATE profils SET profil=$1, titre=$2, experience=$3, tjm=$4, stack=$5, disponibilite=$6, mobilite=$7, statu=$8, contact=$9 WHERE id=$10 RETURNING *',
            [profil, titre, experience, tjm, stack, disponibilite, mobilite, statu, contact, id]
        );
        res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating data");
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await db.query('DELETE FROM profils WHERE id=$1', [id]);
        res.send({ message: "Record deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting data");
    }
});

app.get("/findProfil/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query(
            'SELECT * FROM profils INNER JOIN profilsdetails ON profils.id = profilsdetails.id_profil WHERE profils.id = $1',
            [id]
        );
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data");
    }
});

const { Resend } = require('resend');

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
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)',
            [username, email, hashedPassword, role]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Logged in successfully',
            token,
            userName: user.username,
            role: user.role
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
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

app.post('/createDetails', async (req, res) => {
    const { id_profil, nom, anneDebut, anneFin, entreprise, description } = req.body;
    try {
        await db.query(
            'INSERT INTO profilsdetails (id_profil, nom, anneDebut, anneFin, entreprise, description) VALUES ($1, $2, $3, $4, $5, $6)',
            [id_profil, nom, anneDebut, anneFin, entreprise, description]
        );
        res.status(201).send("Details added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting into profilsdetails");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});