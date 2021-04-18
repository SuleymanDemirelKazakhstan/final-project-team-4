const express = require("express");
const router = express.Router();

router.use("/", require("./temp"));
router.use("/getdoctors", require("./getdoctors"));

// router.use("/webhook/farsh", require("./farshwebhook"));
// router.use("/webhook/nasha", require("./nashawebhook"));

module.exports = router;