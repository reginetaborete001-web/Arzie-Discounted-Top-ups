export default async function handler(req, res) {
  const { id, zone } = req.query;
  if (!id || !zone) return res.status(400).json({ error: "ID and Zone required" });
  try {
    const response = await fetch(`https://api.isan.eu.org/nickname/ml?id=${id}&zone=${zone}`);
    const data = await response.json();
    if (data.name) {
      return res.json({ success: true, ign: data.name, id, zone });
    } else {
      return res.json({ success: false, ign: "IGN not found", id, zone });
    }
  } catch (e) {
    return res.json({ success: false, ign: "Cannot fetch IGN", id, zone });
  }
}
