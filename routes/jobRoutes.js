const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const {
  createJob,
  getJobPage,
  getJobByNumber,
  getUsersJob,
  getJobById,
  deleteJob,
} = require("../controller/jobController");
const router = express.Router();

router.use(validateToken);
router.route("/job").get(getJobPage).post(createJob);
// router.route("/:ejobNumber").get(getJobByNumber);

router.route("/job/:jobId").get(getJobById);
router.route("/joblist").get(getUsersJob);
router.route("/delete").post(deleteJob);

module.exports = router;
