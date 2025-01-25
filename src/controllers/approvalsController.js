const { Land, Flats, Villas, Apartments } = require('../../models');

// Helper function to validate property type
const getPropertyModel = (type) => {
  const models = {
    land: Land,
    flat: Flats,
    villa: Villas,
    apartment: Apartments,
  };
  return models[type.toLowerCase()] || null;
};

// Fetch all pending approvals
const getPendingApprovals = async (req, res) => {
  try {
    const lands = await Land.findAll({ where: { approvalStatus: 'Pending' } });
    const flats = await Flats.findAll({ where: { approvalStatus: 'Pending' } });
    const villas = await Villas.findAll({ where: { approvalStatus: 'Pending' } });
    const apartments = await Apartments.findAll({ where: { approvalStatus: 'Pending' } });

    res.status(200).json({
      message: 'Pending approvals fetched successfully',
      pendingApprovals: { lands, flats, villas, apartments },
    });
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update the approval status of a property
const updateApprovalStatus = async (req, res) => {
  try {
    const { id, type } = req.params; // ID is now `propertyId`
    const { approvalStatus, reason } = req.body;

    // Validate approval status
    if (!['Approved', 'Rejected'].includes(approvalStatus)) {
      return res.status(400).json({ message: 'Invalid approval status' });
    }

    // Get the model based on property type
    const propertyModel = getPropertyModel(type);
    if (!propertyModel) {
      return res.status(400).json({ message: 'Invalid property type' });
    }

    // Find property by ID
    const property = await propertyModel.findOne({ where: { propertyId: id } });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update approval status and reason (if rejected)
    property.approvalStatus = approvalStatus;
    if (approvalStatus === 'Rejected') {
      property.reason = reason || 'No reason provided';
    }
    await property.save();

    res.status(200).json({
      message: `Property ${approvalStatus.toLowerCase()} successfully`,
      property,
    });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getPendingApprovals,
  updateApprovalStatus,
};
