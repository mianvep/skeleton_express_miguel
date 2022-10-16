const router = require("express").Router();
const passport = require("passport");
const userServices = require("./users.services");

//Middlewares
require("../middlewares/auth.midddleware")(passport);

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	userServices.getAllUsers
);

router
	.route("/me")
	.get(passport.authenticate("jwt", { session: false }), userServices.getMyUser)
	.patch(
		passport.authenticate("jwt", { session: false }),
		userServices.patchMyUser
	)
	.delete(
		passport.authenticate("jwt", { session: false }),
		userServices.deleteMyUser
	);

router
	.route("/:id")
	.get(userServices.getUsersById)
	.patch(userServices.patchUser)
	.delete(userServices.deleteUser);

module.exports = router;
