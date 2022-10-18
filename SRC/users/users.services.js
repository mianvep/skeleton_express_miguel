const userControllers = require("./users.controllers");

const getAllUsers = (req, res) => {
	userControllers
		.getAllUsers()
		.then((response) => res.status(200).json(response))
		.catch((err) => res.status(400).json({ message: err.message }));
};

const getUsersById = (req, res) => {
	const id = req.params.id;
	userControllers
		.getUsersById(id)
		.then((response) => res.status(200).json(response))
		.catch((err) => res.status(404).json({ message: err.message }));
};

const registerUser = (req, res) => {
	const {
		firstName,
		lastName,
		email,
		password,
		phone,
		birthday,
		gender,
		country,
	} = req.body;
	if (
		firstName &&
		lastName &&
		email &&
		password &&
		phone &&
		birthday &&
		gender &&
		country
	) {
		userControllers
			.createUser({
				firstName,
				lastName,
				email,
				password,
				phone,
				birthday,
				gender,
				country,
			})
			.then((data) => {
				res.status(201).json(data);
			})
			.catch((err) => {
				res.status(400).json(err.message);
			});
	} else {
		res.status(400).json({
			message: "All fields must be completed",
			fields: {
				firstName: "string",
				lastName: "string",
				email: "example@example.com",
				password: "string",
				phone: "+521231231231",
				birthday: "YYYY/MM/DD",
				gender: "string",
				country: "string",
			},
		});
	}
};

const patchUser = (req, res) => {
	const id = req.params.id;
	const { firstName, lastName, email, phone, gender, country } = req.body;
	userControllers
		.updateUser(id, { firstName, lastName, email, phone, gender, country })
		.then((response) => {
			if (response[0]) {
				res
					.status(200)
					.json({ message: `User with id: ${id}, edited succesfully` });
			} else {
				res.status(400).json({ message: "Invalid ID" });
			}
		})
		.catch((err) => res.status(400).json({ message: err.message }));
};

const deleteUser = (req, res) => {
	const id = req.params.id;
	userControllers
		.deleteUser(id)
		.then((response) => {
			if (response) {
				res.status(204).json();
			} else {
				res.status(400).json({ message: "Invalid ID" });
			}
		})
		.catch((err) => res.status(400).json({ message: err.message }));
};

//? services of individual users

const getMyUser = (req, res) => {
	const id = req.user.id;
	userControllers
		.getUsersById(id)
		.then((response) => res.status(200).json(response))
		.catch((err) => res.status(400).json({ message: err.message }));
};

const patchMyUser = (req, res) => {
	const id = req.user.id;
	const {
		firstName,
		lastName,
		email,
		password,
		phone,
		birthday,
		gender,
		country,
	} = req.body;
	userControllers
		.updateUser(id, {
			firstName,
			lastName,
			email,
			password,
			phone,
			birthday,
			gender,
			country,
		})
		.then((response) => {
			res
				.status(200)
				.json({ message: `User with id: ${id}, was successfully updated` });
		})
		.catch((err) => res.status(400).json({ message: err.message }));
};

const deleteMyUser = (req, res) => {
	const id = req.user.id;
	userControllers
		.deleteUser(id)
		.then((response) => {
			if (response) {
				res.status(204).json();
			} else {
				res.status(400).json({ message: "Invalid id" });
			}
		})
		.catch((err) => res.status(400).json({ message: err.message }));
};

module.exports = {
	getAllUsers,
	getUsersById,
	registerUser,
	patchUser,
	deleteUser,
	getMyUser,
	patchMyUser,
	deleteMyUser,
};
