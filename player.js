export default async function handler(req, res) {
  // ==============================
  // CORS TOTAL
  // ==============================
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ==============================
  // VALIDAR ID
  // ==============================
  const { id } = req.query;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      error: true,
      message: "Use ?id=12345678"
    });
  }

  // ==============================
  // ENDPOINT
  // ==============================
  const url = "https://recargajogo.com.br/api/auth/player_id_login";

  // ==============================
  // BODY JSON
  // ==============================
  const payload = {
    app_id: 100067,
    login_id: String(id)
  };

  // ==============================
  // COOKIES (ATUALIZE QUANDO EXPIRAR)
  // ==============================
  const cookie =
    "region=BR; language=pt; mspid2=7f019507f4f9f7717414f8925abfd28d; _fbp=fb.2.1769278609035.326003590453365383; _ga=GA1.1.16467812.1769278610; cc=true; source=mb; datadome=892Jwv3UZRobIK7bREfNpQyRDylq1LCxqlG8HqGHVx3VLufwwQGiw5DjSm5ILTgYJxMvPxBk83HZZWxvou6EzxssXdGdSRedtaDkGTY4U3IJ1yLzx4AqlRB66HraYgYR; _ga_9TMTW7BN3E=GS2.1.s1769486189$o6$g1$t1769486554$j52$l0$h0";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // Básicos
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Accept-Language": "pt-BR,pt;q=0.9",

        // Origem
        "Origin": "https://recargajogo.com.br",
        "Referer": "https://recargajogo.com.br/",

        // User-Agent real
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 13; Redmi Note 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",

        // Client Hints
        "Sec-CH-UA":
          `"Chromium";v="120", "Google Chrome";v="120", "Not?A_Brand";v="99"`,
        "Sec-CH-UA-Mobile": "?1",
        "Sec-CH-UA-Platform": `"Android"`,
        "Sec-CH-UA-Arch": `"arm"`,
        "Sec-CH-UA-Model": `"Redmi Note 11"`,
        "Sec-CH-Device-Memory": "8",

        // Cookie
        "Cookie": cookie
      },
      body: JSON.stringify(payload)
    });

    const data = await response.text();

    return res.status(response.status).send(data);

  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Erro ao conectar",
      details: err.message
    });
  }
}