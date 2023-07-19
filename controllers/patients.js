const Patient = require("../models/patients");

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json({ patients });
  } catch (error) {
     res.status(501).json({ Message: `${error.message}` });
  }
};

const getPatient = async (req, res) => {
  try {
    const { identityNumber: patientIdentityNumber } = req.params;

    if (isNaN(patientIdentityNumber)) {
      return res.status(404).json({
        Message: `There is no patient with identity number: ${patientIdentityNumber}`,
      });
    }

    const patient = await Patient.findOne({
      identityNumber: patientIdentityNumber,
    });

    if (!patient) {
      return res.status(404).json({
        Message: `There is no patient with identity number: ${patientIdentityNumber}`,
      });
    }

    res.status(200).json({ patient });
  } catch (error) {
    res.status(501).json({ Message: `${error.message}` });
  }
};

const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({ patient });
  } catch (error) {
    res.status(501).json({Message: `${error.message}`});
  }
};

const updatePatient = async (req, res) => {
  try {
    const { identityNumber: patientIdentityNumber } = req.params;
    const patient = await Patient.findOneAndUpdate(
      { identityNumber: patientIdentityNumber },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!patient) {
      return res.status(404).json({
        Message: `There is no patient with identity number: ${patientIdentityNumber}`,
      });
    }

    res.status(200).json({
      Message: `Patient with itentity number ${patientIdentityNumber} has been updated!`,
    });
  } catch (error) {
    res.status(501).json({ Message: `${error.message}` });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { identityNumber: patientIdentityNumber } = req.params;
    const patient = await Patient.findOneAndDelete({
      identityNumber: patientIdentityNumber,
    });

    if (!patient) {
      return res.status(404).json({
        Message: `There is no patient with identity number: ${patientIdentityNumber}`,
      });
    }

    res.status(200).json({
      Message: `Patient with itentity number ${patientIdentityNumber} has been deleted!`,
    });
  } catch (error) {
     res.status(501).json({ Message: `${error.message}` });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatient,
  deletePatient,
  updatePatient,
};
