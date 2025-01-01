const { Land, Flats, Villas, Apartments } = require('../../models');

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
    const { id, type } = req.params;
    const { approvalStatus, reason } = req.body;

    if (!['Approved', 'Rejected'].includes(approvalStatus)) {
      return res.status(400).json({ message: 'Invalid approval status' });
    }

    let propertyModel;
    switch (type) {
      case 'land':
        propertyModel = Land;
        break;
      case 'flat':
        propertyModel = Flats;
        break;
      case 'villa':
        propertyModel = Villas;
        break;
      case 'apartment':
        propertyModel = Apartments;
        break;
      default:
        return res.status(400).json({ message: 'Invalid property type' });
    }

    const property = await propertyModel.findByPk(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    property.approvalStatus = approvalStatus;
    if (approvalStatus === 'Rejected') {
      property.reason = reason;
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
