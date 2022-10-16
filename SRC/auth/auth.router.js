const { registerUser } = require("../users/users.services");
const { login } = require("./auth.services");

const router = require("express").Router();

//? Auth va a contener las rutas de autorizacion y autenticacion
//* Login
//* Register
//* Recovery Password
//* Verify User

//? /api/v1/auth

router.post("/register", registerUser);

router.post("/login", login);

module.exports = router;
