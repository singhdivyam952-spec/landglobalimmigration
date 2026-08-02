import Content from '../models/Content.js';

const getOrCreateContent = async () => {
  let content = await Content.findOne();
  if (!content) {
    content = await Content.create({});
  }
  return content;
};

export const getContent = async (_req, res, next) => {
  try {
    const content = await getOrCreateContent();
    res.json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req, res, next) => {
  try {
    const content = await getOrCreateContent();

    if (req.body.home) {
      const currentHome = content.home?.toObject?.() || content.home || {};
      content.set('home', { ...currentHome, ...req.body.home });
    }
    if (req.body.about) {
      const currentAbout = content.about?.toObject?.() || content.about || {};
      content.set('about', { ...currentAbout, ...req.body.about });
    }
    if (req.body.contact) {
      const currentContact = content.contact?.toObject?.() || content.contact || {};
      content.set('contact', {
        ...currentContact,
        ...req.body.contact,
        socialLinks: {
          ...(currentContact.socialLinks || {}),
          ...(req.body.contact.socialLinks || {}),
        },
      });
    }

    await content.save();

    res.json({ success: true, message: 'Content updated successfully', data: content });
  } catch (error) {
    next(error);
  }
};
