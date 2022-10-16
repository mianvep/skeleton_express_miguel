const { comparePassword } = require("../tools/crypto");
const { getUserByEmail } = require("../users/users.controllers");

const loginUser = async (email, password) => {
	// Este controlador tiene 2 posibles respuestas
	// 1 Las credenciales son validas y retornamos el usuario
	// 2 Las credenciales son invalidas y retornamos false
	try {
		const user = await getUserByEmail(email);
		//? user.password contiene la contraseña encriptada de mi base de datos
		const verifyPassword = comparePassword(password, user.password);
		if (verifyPassword) {
			return user;
		}
		return false;
	} catch (err) {
		return false;
	}
};

module.exports = {
	loginUser,
};
