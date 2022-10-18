const adminValidate = (req, res, next) => {
	const role = req.user.rol;
	if (role === "admin") {
		return next();
	}
	return res.status(401).json({ message: "Access denegated" });
};

module.exports = {
	adminValidate,
};
