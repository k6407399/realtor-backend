// src/controllers/propertyController.js
const { Op, Sequelize } = require('sequelize');
const { Land, Flats, Villas, Apartments } = require('../../models');

// Helper to dynamically determine the model based on property type
const getPropertyModel = (type) => {
  const models = {
    land: Land,
    flats: Flats,
    villas: Villas,
    apartments: Apartments,
  };
  return models[type.toLowerCase()] || null;
};

// Filters API: Filter properties by type and price range
const filterProperties = async (req, res) => {
  try {
    const { propertyType, minPrice, maxPrice } = req.query;

    // Validate property type
    const model = getPropertyModel(propertyType);
    if (!model) {
      return res.status(400).json({ message: 'Invalid property type' });
    }

    // Build dynamic filter conditions
    const filter = { status: 'Available', approvalStatus: 'Approved' };
    if (minPrice && maxPrice) {
      filter.totalPrice = { [Op.between]: [Number(minPrice), Number(maxPrice)] };
    }

    // Fetch filtered properties
    const properties = await model.findAll({ where: filter });
    res.status(200).json({ properties });
  } catch (error) {
    console.error('Error filtering properties:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Search API: Search properties by multiple criteria
const searchProperties = async (req, res) => {
  const { query } = req.query;

  // Validate that the query exists
  if (!query) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    // Normalize the query to lowercase for case-insensitive search
    const normalizedQuery = `%${query.toLowerCase()}%`;

    // Helper function to account for pluralized property types
    const handlePluralization = (value) => {
      const singularForms = {
        lands: "land",
        flats: "flat",
        villas: "villa",
        apartments: "apartment",
      };
      return singularForms[value.toLowerCase()] || value.toLowerCase();
    };

    const singularQuery = handlePluralization(query);

    // Helper function to dynamically create WHERE clauses
    const buildWhereClause = (model) => ({
      [Op.and]: [
        {
          [Op.or]: [
            Sequelize.where(Sequelize.fn("LOWER", Sequelize.col(`${model}.location`)), {
              [Op.like]: normalizedQuery,
            }),
            Sequelize.where(Sequelize.fn("LOWER", Sequelize.col(`${model}.city`)), {
              [Op.like]: normalizedQuery,
            }),
            Sequelize.where(Sequelize.fn("LOWER", Sequelize.col(`${model}.state`)), {
              [Op.like]: normalizedQuery,
            }),
            Sequelize.where(Sequelize.fn("LOWER", Sequelize.col(`${model}.pinCode`)), {
              [Op.like]: normalizedQuery,
            }),
            Sequelize.where(Sequelize.fn("LOWER", Sequelize.col(`${model}.propertyType`)), {
              [Op.like]: `%${singularQuery}%`,
            }),
          ],
        },
        { status: "Available" },
        { approvalStatus: "Approved" },
      ],
    });

    // Fetch results from all property types concurrently
    const [lands, flats, villas, apartments] = await Promise.all([
      Land.findAll({ where: buildWhereClause("Land") }),
      Flats.findAll({ where: buildWhereClause("Flats") }),
      Villas.findAll({ where: buildWhereClause("Villas") }),
      Apartments.findAll({ where: buildWhereClause("Apartments") }),
    ]);

    // Combine all results into a single array
    const results = [...lands, ...flats, ...villas, ...apartments];

    // Return results or handle the case where no properties match the query
    if (results.length === 0) {
      return res.status(404).json({ message: "No properties found." });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error("Error searching properties:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { filterProperties, searchProperties };
