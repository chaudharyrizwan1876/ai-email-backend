const Imap = require("imap");
const { simpleParser } = require("mailparser");
const Email = require("../models/Email");

function fetchEmails() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: process.env.IMAP_USER,
      password: process.env.IMAP_PASS,
      host: process.env.IMAP_HOST,
      port: process.env.IMAP_PORT,
      tls: process.env.IMAP_TLS === "true",
      tlsOptions: { rejectUnauthorized: false },
    });

    const emails = [];

    imap.once("ready", () => {
      imap.openBox("INBOX", false, (err, box) => {
        if (err) return reject(err);

        const fetchRange =
          box.messages.total > 50
            ? `${box.messages.total - 49}:*`
            : "1:*";

        const f = imap.seq.fetch(fetchRange, {
          bodies: "",
          struct: true,
        });

        f.on("message", (msg) => {
          let buffer = "";

          msg.on("body", (stream) => {
            stream.on("data", (chunk) => {
              buffer += chunk.toString("utf8");
            });
          });

          msg.once("end", async () => {
            try {
              const parsed = await simpleParser(buffer);

              // ✅ Prefer HTML, fallback to text
              const finalBody =
                parsed.html || parsed.text || "";

              const emailData = {
                from: parsed.from?.text || "Unknown sender",
                subject: parsed.subject || "(No subject)",
                emailBody: finalBody,
                date: parsed.date || new Date(0),
              };

              emails.push(emailData);

              // 🔹 SAVE TO DB (Prevent duplicates)
              await Email.updateOne(
                {
                  from: emailData.from,
                  subject: emailData.subject,
                  date: emailData.date,
                },
                { $setOnInsert: emailData },
                { upsert: true }
              );
            } catch (e) {
              console.error("Email parse error:", e);
            }
          });
        });

        f.once("error", (err) => reject(err));

        f.once("end", () => {
          imap.end();
        });
      });
    });

    imap.once("end", () => {
      emails.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      resolve(emails);
    });

    imap.once("error", (err) => reject(err));

    imap.connect();
  });
}

module.exports = { fetchEmails };
