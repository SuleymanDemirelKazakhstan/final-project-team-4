const express = require("express");
const router = express.Router();

router.use("/", require("./temp"));
router.use("/getdoctors", require("./getdoctors"));
router.use("/getanalysis", require("./getanalysis"));
router.use("/gettodayconfirmedvisit", require("./gettodayconfirmedvisit"));
router.use("/gettodaydonevisit", require("./gettodaydonevisit"));
router.use("/changetodone", require("./changetodone"));
router.use("/changetocancel", require("./changetocancel"));
router.use("/savevisit", require("./savevisit"));
router.use("/confirmvisit", require("./confirmvisit"));


module.exports = router;