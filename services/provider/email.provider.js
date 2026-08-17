const sendEmail = async ({ to, subject, text }) => {
  console.log("EMAIL PREVIEW");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Message:", text);

  return {
    success: true,
  };
};

module.exports = {
  sendEmail,
};
