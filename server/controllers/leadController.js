import Lead from '../models/Lead.js';

export const createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully.',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (_req, res, next) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (_req, res, next) => {
  try {
    const [leads, services, countries, testimonials, media] = await Promise.all([
      Lead.countDocuments(),
      (await import('../models/Service.js')).default.countDocuments(),
      (await import('../models/Country.js')).default.countDocuments(),
      (await import('../models/Testimonial.js')).default.countDocuments(),
      (await import('../models/Media.js')).default.countDocuments(),
    ]);

    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        counts: { leads, services, countries, testimonials, media },
        recentLeads,
      },
    });
  } catch (error) {
    next(error);
  }
};
