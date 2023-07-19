const express = require("express");
const router = express.Router();

const { getEvent, createEvent, deleteEvent } = require("../controllers/events");

router.route("/events").post(createEvent);
router.route("/events/:date").get(getEvent);
router.route("/events/:_id").delete(deleteEvent);


module.exports = router;
