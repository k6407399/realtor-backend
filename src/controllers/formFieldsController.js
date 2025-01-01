// src/controllers/formFieldsController.js
const formFieldsConfig = require("../utils/formFields");

const getFormFields = (req, res) => {
  const { type } = req.params;
  const formFields = formFieldsConfig[type];

  if (!formFields) {
    return res.status(404).json({ message: "Invalid property type or form fields not defined." });
  }

  res.json({ formFields });
};

module.exports = { getFormFields };
