// Vercel Serverless Function — proxies Fleet Procure enquiries to Web3Forms
// so the access key lives only in a server-side env var, never in page source.
//
// Required env var (set in Vercel project settings, not committed):
//   WEB3FORMS_ACCESS_KEY

const REQUIRED_FIELDS = ['name', 'phone', 'email'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
  name: 100,
  company: 100,
  phone: 30,
  email: 254,
  brand: 50,
  vehicle: 100,
  fleet_size: 20,
  message: 2000
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  // Same-origin check: reject requests whose Origin doesn't exactly match this
  // deployment's own host. Blocks other sites from riding on this endpoint to
  // spam through it.
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin && host && origin !== `https://${host}` && origin !== `http://${host}`) {
    res.status(403).json({ success: false, message: 'Forbidden' });
    return;
  }

  const body = req.body || {};

  // Honeypot: bots that fill the hidden "website" field get a fake success
  // response so they don't learn to avoid it, but nothing gets sent onward.
  if (body.website) {
    res.status(200).json({ success: true });
    return;
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
      res.status(400).json({ success: false, message: `Missing required field: ${field}` });
      return;
    }
  }

  if (!EMAIL_RE.test(body.email.trim())) {
    res.status(400).json({ success: false, message: 'Invalid email address' });
    return;
  }

  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = body[field];
    if (value !== undefined && value !== null) {
      if (typeof value !== 'string') {
        res.status(400).json({ success: false, message: `Invalid field: ${field}` });
        return;
      }
      if (value.length > max) {
        res.status(400).json({ success: false, message: `Field too long: ${field}` });
        return;
      }
    }
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error('WEB3FORMS_ACCESS_KEY is not set');
    res.status(500).json({ success: false, message: 'Server misconfiguration' });
    return;
  }

  const lead = {
    access_key: accessKey,
    subject: `Fleet Procure enquiry — ${body.brand || 'General'}`,
    from_name: 'FleetPro TCO',
    name: body.name,
    company: body.company || '',
    phone: body.phone,
    email: body.email,
    brand: body.brand || '',
    vehicle: body.vehicle || '',
    fleet_size: body.fleet_size || '',
    message: body.message || '',
    assigned_to: body.assigned_to || 'Unassigned'
  };

  try {
    const upstream = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(lead)
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    console.error('Web3Forms submission failed', err);
    res.status(502).json({ success: false, message: 'Upstream submission failed' });
  }
};
