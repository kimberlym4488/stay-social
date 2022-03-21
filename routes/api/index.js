const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

router.use("/user", userRoutes);
// router.use("/thought", thoughtRoutes);

// it only cares about the parameters build into your final router objects. It won't understand that you have a userid to work with. So you need to separate this by building out the paramter id's going forward

module.exports = router;
