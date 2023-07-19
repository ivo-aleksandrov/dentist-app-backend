const Event = require("../models/events");

const getEvent = async (req, res) => {
  try {
    const { date: eventDate } = req.params;

    const events = await Event.find({
      date: eventDate,
    });

    if (!events) {
      return res.status(404).json({
        Message: `There is no events for this date`,
      });
    }

    res.status(200).json({ events });
  } catch (error) {
     res.status(501).json({ Message: `${error.message}` });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ event });
  } catch (error) {
     res.status(501).json({ Message: `${error.message}` });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { _id: eventId } = req.params;
    const event = await Event.findOneAndDelete({
      _id: eventId,
    });

    if (!event) {
      return res.status(404).json({
        Message: `There is no event with id: ${eventId}`,
      });
    }

    res.status(200).json({
      Message: `Event with id ${eventId} has been deleted!`,
    });
  } catch (error) {
     res.status(501).json({ Message: `${error.message}` });
  }
};

module.exports = {
  createEvent,
  getEvent,
  deleteEvent,
};
