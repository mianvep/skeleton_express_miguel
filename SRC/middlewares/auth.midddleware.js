// Middleware para proteger rutas

const { jwtSecret } = require("../config");
const { getUsersById } = require("../users/users.controllers");

const ExtractJwt = require("passport-jwt").ExtractJwt; //Maneja estrategias para las diferentes autenticaciones

const jwtStrategy = require("passport-jwt").Strategy; // Extrae los header de la peticion

module.exports = (passport) => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
		secretOrKey: jwtSecret,
	};

	passport.use(
		new jwtStrategy(options, async (decoded, done) => {
			// done recibe error y decoded
			try {
				const response = await getUsersById(decoded.id);
				console.log("decoded JWT", decoded);
				if (!response) {
					return done(null, false);
				}

				return done(null, decoded);
			} catch (error) {
				return done(error, false);
			}
		})
	);
};
