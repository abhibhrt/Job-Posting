const nodemailer = require('nodemailer');
const Subscriber = require('../models/Subscribe');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "bhartiabhishek760@gmail.com",
    pass: "qifj wjzo qoqk tqdj",
  },
});

/**
 * Send job post to all subscribers in a clean format
 */
const sendToSubs = async (jobData) => {
  try {
    const subscribers = await Subscriber.find({});
    if (!subscribers.length) return console.log('📭 No subscribers to notify.');

    const {
      companyName,
      jobRole,
      location,
      salary,
      jobType,
      workingHours,
      openings,
      logo,
      _id
    } = jobData;

    const jobLink = `https://job-posting-mu.vercel.app/jobs/${_id}`;

    for (const sub of subscribers) {
      const mailOptions = {
        from: "NaukriLo <bhartiabhishek760@gmail.com>",
        to: sub.email,
        subject: `🚀 New Job at ${companyName}: ${jobRole}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; border: 1px solid #eee; background: #f9f9f9;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${logo}" alt="${companyName} Logo" width="50" height="50" style="border-radius: 8px;"/>
              <h2 style="margin: 0;">${companyName}</h2>
            </div>
            <hr/>
            <p><strong>Job Role:</strong> ${jobRole}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Salary:</strong> ₹${salary}</p>
            <p><strong>Job Type:</strong> ${jobType}</p>
            <p><strong>Working Hours:</strong> ${workingHours}</p>
            <p><strong>Openings:</strong> ${openings}</p>
            <br/>
            <a href="${jobLink}" target="_blank" style="padding: 10px 20px; background-color: #007bff; color: white; border-radius: 5px; text-decoration: none;">
              🔎 View Job Details
            </a>
            <br/><br/>
            <small style="color: gray;">If you don't want to receive these emails, please ignore this message.</small>
          </div>
        `
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Mail sent to ${sub.email}: ${info.response}`);
      } catch (err) {
        console.error(`❌ Error sending to ${sub.email}:`, err.message);
      }
    }

  } catch (err) {
    console.error("❌ Mailer error:", err.message);
  }
};

module.exports = sendToSubs;
