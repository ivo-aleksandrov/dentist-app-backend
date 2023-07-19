const Treatments = require("../models/treatments");


const getAllTreatments = async (req, res) => {
  try {
    const { identityNumber: patientIdentityNumber } = req.params;

    if (isNaN(patientIdentityNumber)) {
      return res.status(404).json({
        Message: `There is no treatments for patient with identity number: ${patientIdentityNumber}`,
      });
    }

    const treatment = await Treatments.find({
      identityNumber: patientIdentityNumber,
    });

    if (!treatment) {
      return res.status(404).json({
        Message: `There is no treatments for patient with identity number: ${patientIdentityNumber}`,
      });
    }

    res.status(200).json({ treatment });
  } catch (error) {
     res.status(501).json({ Message: `${error.message}` });
  }
};


const createTreatment = async (req, res) => {
  try {
    const treatment = await Treatments.create(req.body);
    res.status(201).json({ treatment });
  } catch (error) {
     res.status(501).json({ Message: `${error.message}` });
  }
};

const updateTreatment = async (req, res) => {
  try {
    const { identityNumber: patientIdentityNumber } = req.params;
    const treatment = await Treatments.findOneAndUpdate(
      { identityNumber: patientIdentityNumber },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!treatment) {
      return res.status(404).json({
        Message: `There is no treatment for patient with identity number: ${patientIdentityNumber}`,
      });
    }

    res.status(200).json({
      Message: `Treatment for patient with itentity number ${patientIdentityNumber} has been updated!`,
    });
  } catch (error) {
    res.status(501).json({ Message: `${error.message}` });
  }
};

const deleteTreatment = async (req, res) => {
  try {
    const { _id: id } = req.params;
    const treatment = await Treatments.findOneAndDelete({
      _id: id,
    });

    if (!treatment) {
      return res.status(404).json({
        Message: `There is no treatment with id: ${id}`,
      });
    }

    res.status(200).json({
      Message: `Treatment with id ${id} has been deleted!`,
    });
  } catch (error) {
    res.status(501).json({ Message: `${error.message}` });
  }
};

module.exports = {
  getAllTreatments,
  createTreatment,
  deleteTreatment,
  updateTreatment,
};
