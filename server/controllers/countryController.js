import Country from '../models/Country.js';

export const getCountries = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.public === 'true') filter.status = 'active';

    const countries = await Country.find(filter).sort({ name: 1 });
    res.json({ success: true, count: countries.length, data: countries });
  } catch (error) {
    next(error);
  }
};

export const getCountry = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ success: false, message: 'Country not found' });
    }
    res.json({ success: true, data: country });
  } catch (error) {
    next(error);
  }
};

export const createCountry = async (req, res, next) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json({ success: true, message: 'Country created', data: country });
  } catch (error) {
    next(error);
  }
};

export const updateCountry = async (req, res, next) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!country) {
      return res.status(404).json({ success: false, message: 'Country not found' });
    }
    res.json({ success: true, message: 'Country updated', data: country });
  } catch (error) {
    next(error);
  }
};

export const deleteCountry = async (req, res, next) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) {
      return res.status(404).json({ success: false, message: 'Country not found' });
    }
    res.json({ success: true, message: 'Country deleted' });
  } catch (error) {
    next(error);
  }
};
