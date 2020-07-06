const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Admin = require("../models/adminModel");

const { validateEmail } = require("../validation/valBody");

const route = express.Router();

// PATCH /api/auth/forgot
// send email to reset password
route.patch("/forgot", validateEmail, (req, res) => {
  const { email } = req.body;

  // check if admin with that email exist in the datbase
  Admin.findBy({ email })
    .then(([admin]) => {
      if (!admin) {
        res.status(404).json({ errMessage: "wrong admin email." });
      } else {
        // if it does, then update resetLink with  a new token
        const token = jwt.sign({ admin: admin.email }, process.env.RESET_PASS, {
          expiresIn: "10m",
        });

        const id = admin.id;

        // update resetLink and send email with link
        Admin.updateAdmin(id, { resetLink: token })
          .then((adm) => {
            async function main() {
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                  user: process.env.GMAIL_USER, // generated ethereal user
                  pass: process.env.GMAIL_PASS, // generated ethereal password
                },
              });

              // send mail with defined transport object
              let info = await transporter.sendMail({
                from: `${process.env.NAME} <${process.env.GMAIL_USER}>`, // sender address
                to: email, // list of receivers
                subject: "noreplay", // Subject line
                text: "Account Activation Link", // plain text body
                html: `
                <h2>Please click on given link to resest your password</2>
                <a href=${process.env.SECRET_URL}/api/auth/resetpassword/${token}>${process.env.SECRET_URL}/api/auth/resetpassword/${token}</a>
                `, // html body
              });

              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            }

            // call this function to send email.
            main();
            res.status(200).json({ message: "reset link has been sent." });
          })
          .catch((err) => {
            res.status(500).json({
              errMessage: "there was an error sending the reset link.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errMessage: "there was an error in the server." });
    });
});

// PATCH /api/auth/resetpassword/:token
// email comfirmation
route.patch("/resetpassword/:token", (req, res) => {
  const resetLink = req.params.token;
  let credentials = req.body;

  // veryfy token
  if (resetLink) {
    jwt.verify(resetLink, process.env.RESET_PASS, (error, decodedToken) => {
      if (error) {
        res
          .status(401)
          .json({ errMessage: "Incorrect token or it is expired." });
      }
    });
  }

  // check if the resetLink token exist in database
  Admin.findBy({ resetLink })
    .then(([link]) => {
      if (!link) {
        res
          .status(400)
          .json({ errMessage: "Admin with this token does not exist." });
      }

      // hash new password
      const hash = bcrypt.hashSync(credentials.password, 8);
      credentials.password = hash;

      // we need admin id in order to update admin account.
      const id = link.id;

      const newCredentials = {
        password: credentials.password,
        resetLink: "",
      };

      // update new password, empty resetLink and send succesfull email
      Admin.updateAdmin(id, newCredentials)
        .then((admin) => {
          async function main() {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: process.env.GMAIL_USER, // generated ethereal user
                pass: process.env.GMAIL_PASS, // generated ethereal password
              },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: `${process.env.NAME} <${process.env.GMAIL_USER}>`, // sender address
              to: link.email, // list of receivers
              subject: "noreplay", // Subject line
              text: "activities", // plain text body
              html: `
                <h2>thank you</2>
                <p>your password was successfully updated</p>
                `, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          }
          main();
          res
            .status(200)
            .json({ message: "password has been updated successfully!" });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ errMessage: "there was an error updating the password." });
        });
    })
    .catch((err) => {
      res.status(500).json({ errMessage: "there was an error finding admin." });
    });
});

module.exports = route;
