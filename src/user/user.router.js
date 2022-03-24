const router = require("express").Router({mergeParams: true});
const controller = require("./user.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route('/create').post(controller.create).all(methodNotAllowed);
router.route("/:username").get(controller.read).all(methodNotAllowed);

module.exports = router;