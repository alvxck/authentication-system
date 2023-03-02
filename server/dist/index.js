"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const user_1 = require("./models/user");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const secret = process.env.TOLKEN_SECRET;
const allowedOrigins = ['http://localhost:5173'];
const options = {
    origin: allowedOrigins
};
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// Connect to MongoDB server
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/login_system');
        console.log('Connected to database');
    }
    catch (err) {
        console.log('Connection to database failed. Error: ' + err);
    }
}))();
// Register
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hash email and password before saving to DB
        let hashEmail = crypto_js_1.default.SHA256(req.body.email).toString(crypto_js_1.default.enc.Base64);
        let hashPassword = crypto_js_1.default.SHA256(req.body.password).toString(crypto_js_1.default.enc.Base64);
        yield user_1.User.create({
            name: req.body.name,
            email: hashEmail,
            password: hashPassword
        });
        res.status(201).json({ message: 'account created' });
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(409).json({ error: 'account exists already' });
    }
}));
// Login
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        // Hash requested email before checking DB
        const user = yield user_1.User.findOne({
            email: crypto_js_1.default.SHA256(req.body.email).toString(crypto_js_1.default.enc.Base64),
        });
        // Hash requested password and compare with password in DB
        let isPasswordValid = crypto_js_1.default.SHA256(req.body.password).toString(crypto_js_1.default.enc.Hex) == user.password;
        // Create jwt if requested email and password are valid 
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({
                name: user.name,
                email: user.email
            }, secret, {
                expiresIn: '24h'
            });
            res.status(200).json({ message: 'account found', user: token, username: user.name.toLowerCase() });
        }
        else {
            res.status(400).json({ error: 'incorrect password', user: false });
        }
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(404).json({ error: 'account does not exist' });
    }
}));
// User Token Verification Middleware
function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'].split(' ');
        jsonwebtoken_1.default.verify(authHeader[1], secret);
        next();
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(401).json({ error: 'unathorized token' });
    }
}
// Home
app.get('/api/:id', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'].split(' ');
        const user = yield user_1.User.findOne({ email: jsonwebtoken_1.default.decode(authHeader[1]).email });
        res.status(200).json({ username: user.name });
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(404).json({ error: 'user not found' });
    }
}));
// Delete User
app.delete('/api/:id/delete_account', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'].split(' ');
        yield user_1.User.deleteOne({ email: jsonwebtoken_1.default.decode(authHeader[1]).email });
        res.status(200).json({ message: 'account deleted successfully' });
    }
    catch (err) {
        console.log('Error: ' + err);
        res.status(500);
    }
}));
