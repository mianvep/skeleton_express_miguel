const { DataTypes } = require("sequelize");
const db = require("../tools/database");

const Users = db.define("users", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: "firs_name",
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: "last_name",
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		validate: {
			isEmail: true,
		},
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	birthday: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	gender: {
		type: DataTypes.STRING,
	},
	role: {
		type: DataTypes.STRING,
		defaultValue: "normal",
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "active",
	},
	isVerified: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		field: "is_verified",
		defaultValue: false,
	},
});

module.exports = Users;
