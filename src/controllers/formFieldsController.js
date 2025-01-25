const formFieldsConfig = require("../utils/formFields");

const getFormFields = (req, res) => {
  const { type } = req.params;

  // Validate property type
  const allowedTypes = ['land', 'flats', 'villas', 'apartments'];
  if (!allowedTypes.includes(type.toLowerCase())) {
    return res.status(400).json({ message: "Invalid property type." });
  }

  const formFields = formFieldsConfig[type.toLowerCase()];

  if (!formFields) {
    return res.status(404).json({ message: "Form fields not defined for the specified property type." });
  }

  res.json({ formFields });
};

module.exports = { getFormFields };
