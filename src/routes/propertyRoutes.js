const express = require("express");
const {
  createLand,
  getLands,
  getLandById,
  updateLand,
  deleteLand,
} = require("../controllers/landController");
const {
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
} = require("../controllers/flatsController");
const {
  createVilla,
  getVillas,
  getVillaById,
  updateVilla,
  deleteVilla,
} = require("../controllers/villasController");
const {
  createApartment,
  getApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
} = require("../controllers/apartmentController");
const {
  getPendingApprovals,
  updateApprovalStatus,
} = require("../controllers/approvalsController");
const { getFormFields } = require("../controllers/formFieldsController");
const upload = require("../middlewares/uploadMiddleware");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { filterProperties, searchProperties } = require('../controllers/propertyController');

const router = express.Router();

// Allowed property types for validation
const allowedPropertyTypes = ["land", "flats", "villas", "apartments"];

// Form-fields endpoint
router.get("/:type/form-fields", (req, res, next) => {
  const { type } = req.params;

  if (!allowedPropertyTypes.includes(type.toLowerCase())) {
    return res.status(400).json({ message: "Invalid property type." });
  }

  next();
}, getFormFields);

// Routes for property type Land
router.post(
  "/land",
  authenticateUser,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "videos", maxCount: 2 },
  ]),
  createLand
);
router.get("/land", getLands);
router.get("/land/:id", getLandById);
router.put("/land/:id", updateLand);
router.delete("/land/:id", deleteLand);

// Routes for property type Flats
router.post(
  "/flats",
  authenticateUser,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "videos", maxCount: 2 },
  ]),
  createFlat
);
router.get("/flats", getFlats);
router.get("/flats/:id", getFlatById);
router.put("/flats/:id", updateFlat);
router.delete("/flats/:id", deleteFlat);

// Routes for property type Villas
router.post(
  "/villas",
  authenticateUser,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "videos", maxCount: 2 },
  ]),
  createVilla
);
router.get("/villas", getVillas);
router.get("/villas/:id", getVillaById);
router.put("/villas/:id", updateVilla);
router.delete("/villas/:id", deleteVilla);

// Routes for property type Apartments
router.post(
  "/apartments",
  authenticateUser,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "videos", maxCount: 2 },
  ]),
  createApartment
);
router.get("/apartments", getApartments);
router.get("/apartments/:id", getApartmentById);
router.put("/apartments/:id", updateApartment);
router.delete("/apartments/:id", deleteApartment);

/**
 * GET /api/v1/properties/filter
 * Endpoint to filter properties by type and price range
 * Query Parameters:
 * - propertyType: "Land", "Flats", "Villas", "Apartments"
 * - minPrice: Minimum price range
 * - maxPrice: Maximum price range
 */
router.get('/filter', filterProperties);

/**
 * GET /api/v1/properties/search
 * Endpoint to search properties by query string
 * Query Parameters:
 * - query: Search text for location, city, state, pin code, or property type
 */
router.get('/search', searchProperties);

// Fetch pending approvals
router.get("/approvals", getPendingApprovals);

// Update approval status dynamically based on property type
router.put("/:type/:id/approve", (req, res, next) => {
  const { type } = req.params;

  if (!allowedPropertyTypes.includes(type.toLowerCase())) {
    return res.status(400).json({ message: "Invalid property type for approval." });
  }

  next();
}, updateApprovalStatus);

module.exports = router;
