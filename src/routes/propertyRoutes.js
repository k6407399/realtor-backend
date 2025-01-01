const express = require('express');
const {
    createLand,
    getLands,
    getLandById,
    updateLand,
    deleteLand,
  } = require('../controllers/landController');
const {
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
} = require('../controllers/flatsController');
const {
    createVilla,
    getVillas,
    getVillaById,
    updateVilla,
    deleteVilla,
  } = require('../controllers/villasController');
const {
    createApartment,
    getApartments,
    getApartmentById,
    updateApartment,
    deleteApartment,
  } = require('../controllers/apartmentController');
const { getPendingApprovals, updateApprovalStatus } = require('../controllers/approvalsController');
//const { authenticateAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
const { getFormFields } = require("../controllers/formFieldsController");

// form-fields endpoint
router.get("/:type/form-fields", getFormFields);

// Routes for property type Land
router.post('/land', createLand); // Create
router.get('/land', getLands); // Fetch All
router.get('/land/:id', getLandById); // Fetch by ID
router.put('/land/:id', updateLand); // Update
router.delete('/land/:id', deleteLand); // Delete

// Routes for property type Flats
router.post('/flats', createFlat); // Create
router.get('/flats', getFlats); // Fetch All
router.get('/flats/:id', getFlatById); // Fetch by ID
router.put('/flats/:id', updateFlat); // Update
router.delete('/flats/:id', deleteFlat); // Delete

// Routes for property type Villas
router.post('/villas', createVilla); // Create
router.get('/villas', getVillas); // Fetch All
router.get('/villas/:id', getVillaById); // Fetch by ID
router.put('/villas/:id', updateVilla); // Update
router.delete('/villas/:id', deleteVilla); // Delete

// Routes for property type Apartments
router.post('/apartments', createApartment); // Create
router.get('/apartments', getApartments); // Fetch All
router.get('/apartments/:id', getApartmentById); // Fetch by ID
router.put('/apartments/:id', updateApartment); // Update
router.delete('/apartments/:id', deleteApartment); // Delete

// Fetch pending approvals
router.get('/approvals', getPendingApprovals);

// Update approval status
router.put('/:type/:id/approve', updateApprovalStatus);

module.exports = router;
