import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { contentService } from '../../services';
import ImageUpload from '../../components/ImageUpload';
import Loader from '../../components/Loader';

const emptyWhyItem = { title: '', description: '', icon: 'FaShieldAlt' };
const emptyVisaClassification = { title: '', description: '' };
const emptyFaq = { question: '', answer: '' };
const emptyStat = { label: '', value: 0, suffix: '+' };
const emptyValue = { title: '', description: '' };
const emptyTeam = { name: '', role: '', bio: '', image: '' };
const emptyTimeline = { year: '', title: '', description: '' };

const ContentManager = () => {
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await contentService.get();
        setContent(JSON.parse(JSON.stringify(data.data)));
      } catch {
        toast.error('Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateHome = (path, value) => {
    setContent((prev) => {
      const next = { ...prev, home: { ...prev.home } };
      const keys = path.split('.');
      let ref = next.home;
      for (let i = 0; i < keys.length - 1; i += 1) {
        ref[keys[i]] = Array.isArray(ref[keys[i]])
          ? [...ref[keys[i]]]
          : { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateAbout = (path, value) => {
    setContent((prev) => {
      const next = { ...prev, about: { ...prev.about } };
      const keys = path.split('.');
      let ref = next.about;
      for (let i = 0; i < keys.length - 1; i += 1) {
        ref[keys[i]] = Array.isArray(ref[keys[i]])
          ? [...ref[keys[i]]]
          : { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateContact = (path, value) => {
    setContent((prev) => {
      const next = { ...prev, contact: { ...prev.contact } };
      if (path.includes('.')) {
        const [parent, child] = path.split('.');
        next.contact[parent] = { ...next.contact[parent], [child]: value };
      } else {
        next.contact[path] = value;
      }
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await contentService.update({
        home: content.home,
        about: content.about,
        contact: content.contact,
      });
      setContent(data.data);
      toast.success('Content saved successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) return <Loader />;

  const home = content.home;
  const about = content.about;
  const contact = content.contact;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Content Manager</h2>
          <p className="text-muted">Edit homepage, about page, and contact details.</p>
        </div>
        <button type="button" onClick={save} disabled={saving} className="btn-primary !rounded-xl">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['home', 'about', 'contact'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
              tab === t ? 'bg-primary text-white' : 'bg-white text-ink ring-1 ring-black/10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        {tab === 'home' && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="admin-label">Main Heading</label>
                <input
                  className="admin-input"
                  value={home.heading || ''}
                  onChange={(e) => updateHome('heading', e.target.value)}
                />
              </div>
              <div>
                <label className="admin-label">CTA Text</label>
                <input
                  className="admin-input"
                  value={home.ctaText || ''}
                  onChange={(e) => updateHome('ctaText', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="admin-label">Sub Heading</label>
              <textarea
                className="admin-input"
                rows={3}
                value={home.subHeading || ''}
                onChange={(e) => updateHome('subHeading', e.target.value)}
              />
            </div>
            <ImageUpload
              label="Hero Image"
              value={home.heroImage || ''}
              onChange={(v) => updateHome('heroImage', v)}
            />

            <h3 className="text-lg font-semibold">Introduction</h3>
            <div>
              <label className="admin-label">Title</label>
              <input
                className="admin-input"
                value={home.introduction?.title || ''}
                onChange={(e) => updateHome('introduction.title', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Description</label>
              <textarea
                className="admin-input"
                rows={4}
                value={home.introduction?.description || ''}
                onChange={(e) => updateHome('introduction.description', e.target.value)}
              />
            </div>
            <ImageUpload
              label="Introduction Image"
              value={home.introduction?.image || ''}
              onChange={(v) => updateHome('introduction.image', v)}
            />

            <h3 className="text-lg font-semibold">Why Choose Us</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="admin-label">Section Title</label>
                <input
                  className="admin-input"
                  value={home.whyChooseUs?.title || ''}
                  onChange={(e) => updateHome('whyChooseUs.title', e.target.value)}
                />
              </div>
              <div>
                <label className="admin-label">Subtitle</label>
                <input
                  className="admin-input"
                  value={home.whyChooseUs?.subtitle || ''}
                  onChange={(e) => updateHome('whyChooseUs.subtitle', e.target.value)}
                />
              </div>
            </div>
            {(home.whyChooseUs?.items || []).map((item, index) => (
              <div key={index} className="rounded-xl border border-black/5 p-4">
                <div className="mb-3 flex justify-between">
                  <p className="font-medium">Item {index + 1}</p>
                  <button
                    type="button"
                    className="text-sm text-red-500"
                    onClick={() => {
                      const items = [...home.whyChooseUs.items];
                      items.splice(index, 1);
                      updateHome('whyChooseUs.items', items);
                    }}
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    className="admin-input"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => {
                      const items = [...home.whyChooseUs.items];
                      items[index] = { ...items[index], title: e.target.value };
                      updateHome('whyChooseUs.items', items);
                    }}
                  />
                  <input
                    className="admin-input"
                    placeholder="Icon (e.g. FaShieldAlt)"
                    value={item.icon}
                    onChange={(e) => {
                      const items = [...home.whyChooseUs.items];
                      items[index] = { ...items[index], icon: e.target.value };
                      updateHome('whyChooseUs.items', items);
                    }}
                  />
                  <input
                    className="admin-input"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => {
                      const items = [...home.whyChooseUs.items];
                      items[index] = { ...items[index], description: e.target.value };
                      updateHome('whyChooseUs.items', items);
                    }}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn-outline !rounded-xl !py-2 !text-sm"
              onClick={() =>
                updateHome('whyChooseUs.items', [...(home.whyChooseUs?.items || []), emptyWhyItem])
              }
            >
              Add Why Choose Us Item
            </button>

            <h3 className="border-t border-black/5 pt-6 text-lg font-semibold">
              Visa Classification Types
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="admin-label">Section Title</label>
                <input
                  className="admin-input"
                  value={home.visaClassifications?.title || ''}
                  onChange={(e) => updateHome('visaClassifications.title', e.target.value)}
                />
              </div>
              <div>
                <label className="admin-label">Subtitle</label>
                <input
                  className="admin-input"
                  value={home.visaClassifications?.subtitle || ''}
                  onChange={(e) => updateHome('visaClassifications.subtitle', e.target.value)}
                />
              </div>
            </div>
            {(home.visaClassifications?.items || []).map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="grid gap-3 rounded-xl border border-black/5 p-4 md:grid-cols-[1fr_2fr_auto]"
              >
                <input
                  className="admin-input"
                  placeholder="Visa classification title"
                  value={item.title}
                  onChange={(e) => {
                    const items = [...home.visaClassifications.items];
                    items[index] = { ...items[index], title: e.target.value };
                    updateHome('visaClassifications.items', items);
                  }}
                />
                <textarea
                  className="admin-input"
                  rows={2}
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => {
                    const items = [...home.visaClassifications.items];
                    items[index] = { ...items[index], description: e.target.value };
                    updateHome('visaClassifications.items', items);
                  }}
                />
                <button
                  type="button"
                  className="rounded-xl bg-red-50 px-3 text-sm text-red-600"
                  onClick={() => {
                    const items = [...home.visaClassifications.items];
                    items.splice(index, 1);
                    updateHome('visaClassifications.items', items);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-outline !rounded-xl !border-navy !py-2 !text-sm !text-navy hover:!bg-navy hover:!text-white"
              onClick={() =>
                updateHome('visaClassifications.items', [
                  ...(home.visaClassifications?.items || []),
                  emptyVisaClassification,
                ])
              }
            >
              Add Visa Classification
            </button>

            <h3 className="border-t border-black/5 pt-6 text-lg font-semibold">
              Frequently Asked Questions
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="admin-label">Section Title</label>
                <input
                  className="admin-input"
                  value={home.faqs?.title || ''}
                  onChange={(e) => updateHome('faqs.title', e.target.value)}
                />
              </div>
              <div>
                <label className="admin-label">Subtitle</label>
                <input
                  className="admin-input"
                  value={home.faqs?.subtitle || ''}
                  onChange={(e) => updateHome('faqs.subtitle', e.target.value)}
                />
              </div>
            </div>
            {(home.faqs?.items || []).map((item, index) => (
              <div key={index} className="space-y-3 rounded-xl border border-black/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">FAQ {index + 1}</p>
                  <button
                    type="button"
                    className="text-sm text-red-500"
                    onClick={() => {
                      const items = [...home.faqs.items];
                      items.splice(index, 1);
                      updateHome('faqs.items', items);
                    }}
                  >
                    Remove
                  </button>
                </div>
                <input
                  className="admin-input"
                  placeholder="Question"
                  value={item.question}
                  onChange={(e) => {
                    const items = [...home.faqs.items];
                    items[index] = { ...items[index], question: e.target.value };
                    updateHome('faqs.items', items);
                  }}
                />
                <textarea
                  className="admin-input"
                  rows={3}
                  placeholder="Answer"
                  value={item.answer}
                  onChange={(e) => {
                    const items = [...home.faqs.items];
                    items[index] = { ...items[index], answer: e.target.value };
                    updateHome('faqs.items', items);
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn-outline !rounded-xl !border-navy !py-2 !text-sm !text-navy hover:!bg-navy hover:!text-white"
              onClick={() =>
                updateHome('faqs.items', [...(home.faqs?.items || []), emptyFaq])
              }
            >
              Add FAQ
            </button>

            <h3 className="text-lg font-semibold">Statistics</h3>
            {(home.statistics || []).map((stat, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-4">
                <input
                  className="admin-input"
                  placeholder="Label"
                  value={stat.label}
                  onChange={(e) => {
                    const statistics = [...home.statistics];
                    statistics[index] = { ...statistics[index], label: e.target.value };
                    updateHome('statistics', statistics);
                  }}
                />
                <input
                  type="number"
                  className="admin-input"
                  placeholder="Value"
                  value={stat.value}
                  onChange={(e) => {
                    const statistics = [...home.statistics];
                    statistics[index] = { ...statistics[index], value: Number(e.target.value) };
                    updateHome('statistics', statistics);
                  }}
                />
                <input
                  className="admin-input"
                  placeholder="Suffix"
                  value={stat.suffix}
                  onChange={(e) => {
                    const statistics = [...home.statistics];
                    statistics[index] = { ...statistics[index], suffix: e.target.value };
                    updateHome('statistics', statistics);
                  }}
                />
                <button
                  type="button"
                  className="rounded-xl bg-red-50 text-sm text-red-600"
                  onClick={() => {
                    const statistics = [...home.statistics];
                    statistics.splice(index, 1);
                    updateHome('statistics', statistics);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-outline !rounded-xl !py-2 !text-sm"
              onClick={() => updateHome('statistics', [...(home.statistics || []), emptyStat])}
            >
              Add Statistic
            </button>

            <h3 className="text-lg font-semibold">Contact CTA</h3>
            <input
              className="admin-input"
              placeholder="CTA Title"
              value={home.contactCta?.title || ''}
              onChange={(e) => updateHome('contactCta.title', e.target.value)}
            />
            <textarea
              className="admin-input"
              rows={2}
              placeholder="CTA Description"
              value={home.contactCta?.description || ''}
              onChange={(e) => updateHome('contactCta.description', e.target.value)}
            />
            <input
              className="admin-input"
              placeholder="Button Text"
              value={home.contactCta?.buttonText || ''}
              onChange={(e) => updateHome('contactCta.buttonText', e.target.value)}
            />
          </div>
        )}

        {tab === 'about' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Company Story</h3>
            <input
              className="admin-input"
              value={about.companyStory?.title || ''}
              onChange={(e) => updateAbout('companyStory.title', e.target.value)}
            />
            <textarea
              className="admin-input"
              rows={4}
              value={about.companyStory?.description || ''}
              onChange={(e) => updateAbout('companyStory.description', e.target.value)}
            />
            <ImageUpload
              value={about.companyStory?.image || ''}
              onChange={(v) => updateAbout('companyStory.image', v)}
            />

            <h3 className="text-lg font-semibold">Founder</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="admin-input"
                placeholder="Name"
                value={about.founder?.name || ''}
                onChange={(e) => updateAbout('founder.name', e.target.value)}
              />
              <input
                className="admin-input"
                placeholder="Title"
                value={about.founder?.title || ''}
                onChange={(e) => updateAbout('founder.title', e.target.value)}
              />
            </div>
            <textarea
              className="admin-input"
              rows={4}
              value={about.founder?.bio || ''}
              onChange={(e) => updateAbout('founder.bio', e.target.value)}
            />
            <ImageUpload
              value={about.founder?.image || ''}
              onChange={(v) => updateAbout('founder.image', v)}
            />

            <h3 className="text-lg font-semibold">Mission & Vision</h3>
            <textarea
              className="admin-input"
              rows={3}
              placeholder="Mission"
              value={about.mission?.description || ''}
              onChange={(e) => updateAbout('mission.description', e.target.value)}
            />
            <textarea
              className="admin-input"
              rows={3}
              placeholder="Vision"
              value={about.vision?.description || ''}
              onChange={(e) => updateAbout('vision.description', e.target.value)}
            />

            <h3 className="text-lg font-semibold">Values</h3>
            {(about.values || []).map((value, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
                <input
                  className="admin-input"
                  value={value.title}
                  onChange={(e) => {
                    const values = [...about.values];
                    values[index] = { ...values[index], title: e.target.value };
                    updateAbout('values', values);
                  }}
                />
                <input
                  className="admin-input"
                  value={value.description}
                  onChange={(e) => {
                    const values = [...about.values];
                    values[index] = { ...values[index], description: e.target.value };
                    updateAbout('values', values);
                  }}
                />
                <button
                  type="button"
                  className="rounded-xl bg-red-50 px-3 text-red-600"
                  onClick={() => {
                    const values = [...about.values];
                    values.splice(index, 1);
                    updateAbout('values', values);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-outline !rounded-xl !py-2 !text-sm"
              onClick={() => updateAbout('values', [...(about.values || []), emptyValue])}
            >
              Add Value
            </button>

            <h3 className="text-lg font-semibold">Team Members</h3>
            {(about.team || []).map((member, index) => (
              <div key={member._id || index} className="space-y-3 rounded-xl border p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="admin-input"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => {
                      const team = [...about.team];
                      team[index] = { ...team[index], name: e.target.value };
                      updateAbout('team', team);
                    }}
                  />
                  <input
                    className="admin-input"
                    placeholder="Role"
                    value={member.role}
                    onChange={(e) => {
                      const team = [...about.team];
                      team[index] = { ...team[index], role: e.target.value };
                      updateAbout('team', team);
                    }}
                  />
                </div>
                <textarea
                  className="admin-input"
                  rows={2}
                  placeholder="Bio"
                  value={member.bio}
                  onChange={(e) => {
                    const team = [...about.team];
                    team[index] = { ...team[index], bio: e.target.value };
                    updateAbout('team', team);
                  }}
                />
                <ImageUpload
                  value={member.image}
                  onChange={(v) => {
                    const team = [...about.team];
                    team[index] = { ...team[index], image: v };
                    updateAbout('team', team);
                  }}
                />
                <button
                  type="button"
                  className="text-sm text-red-500"
                  onClick={() => {
                    const team = [...about.team];
                    team.splice(index, 1);
                    updateAbout('team', team);
                  }}
                >
                  Remove Member
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-outline !rounded-xl !py-2 !text-sm"
              onClick={() => updateAbout('team', [...(about.team || []), emptyTeam])}
            >
              Add Team Member
            </button>

            <h3 className="text-lg font-semibold">Timeline</h3>
            {(about.timeline || []).map((item, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-4">
                <input
                  className="admin-input"
                  placeholder="Year"
                  value={item.year}
                  onChange={(e) => {
                    const timeline = [...about.timeline];
                    timeline[index] = { ...timeline[index], year: e.target.value };
                    updateAbout('timeline', timeline);
                  }}
                />
                <input
                  className="admin-input"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => {
                    const timeline = [...about.timeline];
                    timeline[index] = { ...timeline[index], title: e.target.value };
                    updateAbout('timeline', timeline);
                  }}
                />
                <input
                  className="admin-input"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => {
                    const timeline = [...about.timeline];
                    timeline[index] = { ...timeline[index], description: e.target.value };
                    updateAbout('timeline', timeline);
                  }}
                />
                <button
                  type="button"
                  className="rounded-xl bg-red-50 text-red-600"
                  onClick={() => {
                    const timeline = [...about.timeline];
                    timeline.splice(index, 1);
                    updateAbout('timeline', timeline);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-outline !rounded-xl !py-2 !text-sm"
              onClick={() => updateAbout('timeline', [...(about.timeline || []), emptyTimeline])}
            >
              Add Timeline Item
            </button>
          </div>
        )}

        {tab === 'contact' && (
          <div className="space-y-4">
            <div>
              <label className="admin-label">Address</label>
              <textarea
                className="admin-input"
                rows={2}
                value={contact.address || ''}
                onChange={(e) => updateContact('address', e.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="admin-label">Phone</label>
                <input
                  className="admin-input"
                  value={contact.phone || ''}
                  onChange={(e) => updateContact('phone', e.target.value)}
                />
              </div>
              <div>
                <label className="admin-label">Email</label>
                <input
                  className="admin-input"
                  value={contact.email || ''}
                  onChange={(e) => updateContact('email', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="admin-label">WhatsApp Number</label>
              <input
                className="admin-input"
                value={contact.whatsapp || ''}
                onChange={(e) => updateContact('whatsapp', e.target.value)}
              />
            </div>
            <div>
              <label className="admin-label">Google Maps Embed URL</label>
              <input
                className="admin-input"
                value={contact.mapEmbedUrl || ''}
                onChange={(e) => updateContact('mapEmbedUrl', e.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {['facebook', 'instagram'].map((network) => (
                <div key={network}>
                  <label className="admin-label capitalize">{network}</label>
                  <input
                    className="admin-input"
                    value={contact.socialLinks?.[network] || ''}
                    onChange={(e) => updateContact(`socialLinks.${network}`, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManager;
