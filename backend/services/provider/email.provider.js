const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html, idempotencyKey }) => {
  const { data, error } = await resend.emails.send(
    {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    },
    {
      idempotencyKey,
    },
  );

  if (error) {
    throw new Error(error.message || "Email provider failed");
  }

  return data;
};

module.exports = {
  sendEmail,
};
