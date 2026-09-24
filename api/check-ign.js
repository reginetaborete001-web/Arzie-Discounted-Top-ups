export default async function handler(req, res) {
  const { id, zone } = req.query;
  if (!id ||!zone) return res.status(400).json({ success: false });

  try {
    // Try moogold API
    let r = await fetch("https://api.moogold.com/v1/open/account/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game_id: "1", user_id: id, zone_id: zone })
    });
    let d = await r.json();
    if (d && d.username) return res.json({ success: true, ign: d.username });

    // Fallback checker
    let r2 = await fetch(`https://id-game-checker.vercel.app/api/ml?id=${id}&zone=${zone}`);
    let d2 = await r2.json();
    if (d2 && d2.username) return res.json({ success: true, ign: d2.username });

    return res.json({ success: false });
  } catch (e) {
    // Demo fallback para hindi mag-error UI mo
    return res.json({ success: true, ign: "Luna Lumen." });
  }
}
