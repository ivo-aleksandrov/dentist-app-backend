const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  getPatient,
  deletePatient,
  updatePatient,
  createPatient,
} = require("../controllers/patients");

router.route("/patients").get(getAllPatients).post(createPatient);

router
  .route("/patients/:identityNumber")
  .get(getPatient)
  .delete(deletePatient)
  .patch(updatePatient);

module.exports = router;
