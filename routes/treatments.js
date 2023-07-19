const express = require("express");
const router = express.Router();

const {
  getAllTreatments,
  updateTreatment,
  deleteTreatment,
  createTreatment,
} = require("../controllers/treatments");

router
  .route("/treatments/:identityNumber")
  .get(getAllTreatments)
  .patch(updateTreatment);

router.route("/treatments").post(createTreatment);

router.route("/treatments/:_id").delete(deleteTreatment);

module.exports = router;
