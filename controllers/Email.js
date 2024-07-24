const nodemailer = require('nodemailer');
var myModule = require('./output');
const asynHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

exports.AccountSetupEmail = asynHandler(async (req, res, next) => {
  console.log(req.body.url);
  let newtime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  var today = new Date();
  let transporter = nodemailer.createTransport({
    host: '192.168.0.36',
    port: 25,
  });
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  let body = req.body;
  const output = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Simple Transactional Email</title>
     
    </head>
    <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <div class="">
    <div class="aHl"></div>
    <div id=":32" tabindex="-1"></div>
    <div id=":2r" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
        <div id=":2q" class="a3s aiL ">
            <div style="max-width:700px;background:#fff;border-radius:10px;margin-top:25px;border:2px solid black"><span
                    class="im">
                    <div class="adM">
                    </div>
                    <table style="width:100%;height:100px">
                        <tbody>
                            <tr>
                                <td><img src="https://ci3.googleusercontent.com/proxy/fVyOH2QA9P4EvVeL2rywML7YTB7mbFAiirNURIVlO3RBychyVb89N4QEMFtiXtGH_j9fF6SFFvc1bRH5ZcSl1mr1=s0-d-e1-ft#https://calpay.caleservice.net/images/logo.jpeg"
                                        alt="CalBank Logo" style="max-width:200px;float:right" class="CToWUd"></td>
                            </tr>
                        </tbody>
                    </table>
                    <table
                        style="width:100%;background:#ffd100;padding:10px 10px 10px 40px;font-size:25px;margin-bottom:20px">
                        <tbody>
                            <tr>
                                <td>CalBank App - CalPay</td>
                            </tr>
                        </tbody>
                    </table>
                </span>
                <div style="margin:50px">Your One-Time-Password is 220098
                    Please ignore this message if you did not initiate this request on CalPay. Never share this token
                </div><span class="im">
                    <table style="width:100%;padding:10px 10px 10px 40px;color:#333333">
                        <tbody>
                            <tr>
                                <td>
                                    <p><a href="https://calpay.caleservice.net"
                                            style="border:1px solid #f59334;padding:10px;border-radius:50px;color:#fff;text-decoration:none;background:#f59136"
                                            target="_blank"
                                            data-saferedirecturl="https://www.google.com/url?q=https://calpay.caleservice.net&amp;source=gmail&amp;ust=1645713954140000&amp;usg=AOvVaw0sz9K1hPDAt3TqSiZm0Fg2">
                                            Visit Calpay Web</a></p>
                                    <p></p>
                                </td>
                                <td style="float:right">
                                    CalBank PLC<br>
                                    Independence Avenue,<br>
                                    <a href="mailto:customercare@calbank.net"
                                        target="_blank">customercare@calbank.net</a><br>
                                    0800500500/233302739900<br>
                                    Accra, Ghana<br>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </span>
            </div>
            <p></p><br>
            <hr><img
                src="https://ci3.googleusercontent.com/proxy/fVyOH2QA9P4EvVeL2rywML7YTB7mbFAiirNURIVlO3RBychyVb89N4QEMFtiXtGH_j9fF6SFFvc1bRH5ZcSl1mr1=s0-d-e1-ft#https://calpay.caleservice.net/images/logo.jpeg"
                style="height:50px;width:150px;float:left" class="CToWUd"><img
                src="https://ci6.googleusercontent.com/proxy/1VsJ3tD8ZS4xHwx_8VnQ3R2xBd6NpvaT_7GvJKI-bk9lS2hr0IRF9JzYWcYdCNldpE9_hT8HcDU3mY9pSJOJAxxNqSS_soXdbf3c_FCz=s0-d-e1-ft#https://calpay.caleservice.net/images/landing/calpay-01.jpg"
                style="height:60px;width:120px;margin-left:30px" class="CToWUd">
            <div class="yj6qo"></div>
            <div class="adL">


            </div>
        </div>
    </div>
    <div id=":36" class="ii gt" style="display:none">
        <div id=":37" class="a3s aiL "></div>
    </div>
    <div class="hi"></div>
</div>
    </body>
  </html>
  `;
  let mailOptions = {
    from: 'noreply@calbank.net GODS EYE', // sender address
    to: [
      req.body.to,
      'AutoDevUnit@calbank.net',
      'stamakloe@calbank.net',
      'mis@calbank.net',
    ], // list of receivers
    subject: 'Certificate Log', // Subject line
    text: 'Hello world?', // plain text body
    html: output, // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    console.log('contact', { msg: 'Email has been sent' });
  });

  res.json({ msg: 'Email has been sent', success: true });
});

exports.InStitutionSetupEmail = asynHandler(async (req, res, next) => {
  let to = req.body.to;
  let subject = req.body.subject;
  let text = req.body.text;
  let body = req.body.body;
  let description = req.body.description;
  let currency = req.body.currency;
  let amount = req.body.amount;
  let location = req.body.location;
  let client = req.body.client;
  let type = req.body.type;

  let transporter = nodemailer.createTransport({
    host: '192.168.0.36',
    port: 25,
  });

  const output = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Facility Request</title>
     
    </head>
    <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <div class="">
    <div class="aHl"></div>
    <div id=":32" tabindex="-1"></div>
    <div id=":2r" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
        <div id=":2q" class="a3s aiL ">
            <div style="max-width:700px;background:#fff;border-radius:10px;margin-top:25px;border:2px solid black"><span
                    class="im">
                    <div class="adM">
                    </div>
                    <table style="width:100%;height:100px">
                        <tbody>
                            <tr>
                                <td><img src="https://ci3.googleusercontent.com/proxy/fVyOH2QA9P4EvVeL2rywML7YTB7mbFAiirNURIVlO3RBychyVb89N4QEMFtiXtGH_j9fF6SFFvc1bRH5ZcSl1mr1=s0-d-e1-ft#https://calpay.caleservice.net/images/logo.jpeg"
                                        alt="CalBank Logo" style="max-width:200px;float:right" class="CToWUd"></td>
                            </tr>
                        </tbody>
                    </table>
                    <table
                        style="width:100%;background:#ffd100;padding:10px 10px 10px 40px;font-size:25px;margin-bottom:20px">
                        <tbody>
                            <tr>
                                <td>Credit Tracker -${subject}</td>
                            </tr>
                        </tbody>
                    </table>
                </span>
                <div style="margin:50px">${description}
                <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
<tbody><tr style="height:3.8pt;">
<td valign="top" style="width:94.2pt;height:3.8pt;padding:0 5.4pt;border:1pt solid windowtext;">
<p style="font-size:11pt;font-family:Calibri,sans-serif;margin:0;"><b><span style="font-size:14pt;font-family:Kuro;">Client</span></b><span style="font-size:14pt;font-family:Kuro;"></span></p>
</td>
<td valign="top" style="width:89.9pt;height:3.8pt;padding:0 5.4pt;border-width:1pt;border-style:solid solid solid none;border-color:windowtext;">
<p style="font-size:11pt;font-family:Calibri,sans-serif;margin:0;"><b><span style="font-size:14pt;font-family:Kuro;">Type of Facility </span></b><span style="font-size:14pt;font-family:Kuro;"></span></p>
</td>
<td valign="top" style="width:100.9pt;height:3.8pt;padding:0;border-width:1pt;border-style:solid solid solid none;border-color:windowtext;">
<p style="font-size:11pt;font-family:Calibri,sans-serif;margin:0;"><b><span style="font-size:14pt;">&nbsp;</span></b><b><span style="font-size:14pt;font-family:Kuro;">Amount</span></b><span style="font-size:14pt;font-family:Kuro;"></span></p>
</td>

<td valign="top" style="width:106.9pt;height:3.8pt;padding:0;border-width:1pt;border-style:solid solid solid none;border-color:windowtext;">
<p style="font-size:11pt;font-family:Calibri,sans-serif;margin:0;"><b><span style="font-size:14pt;">&nbsp;</span></b><b><span style="font-size:14pt;font-family:Kuro;">Branch/Dept. </span></b><span style="font-size:14pt;font-family:Kuro;"></span></p>
</td>
</tr>
<tr style="height:39.85pt;">
<td valign="top" style="background-color: rgb(56, 67, 79) !important; width: 94.2pt; height: 39.85pt; padding: 0px 5.4pt; border-width: 1pt; border-style: none solid solid; border-color: windowtext;" data-ogsb="rgb(211, 223, 238)">
<p style="font-size:11pt;font-family:Calibri,sans-serif;margin:0;"><span style="color: rgb(255, 255, 255) !important; font-size: 12pt; font-family: Kuro;" data-ogsc="black">${client}</span><span style="font-size:12pt;font-family:Kuro;"></span></p>
</td>
<td valign="top" style="background-color: rgb(56, 67, 79) !important; width: 89.9pt; height: 39.85pt; padding: 0px 5.4pt; border-style: none solid solid none; border-right-width: 1pt; border-bottom-width: 1pt; border-right-color: windowtext; border-bottom-color: windowtext;" data-ogsb="rgb(211, 223, 238)">
<p style="font-size:11pt;font-family:Calibri,sans-serif;margin:0;"><span style="color: rgb(255, 255, 255) !important; font-size: 12pt; font-family: Kuro;" data-ogsc="black">${type}</span></p>
</td>
<td valign="top" style="background-color: rgb(56, 67, 79) !important; width: 100.9pt; height: 39.85pt; padding: 0px; border-style: none solid solid none; border-right-width: 1pt; border-bottom-width: 1pt; border-right-color: windowtext; border-bottom-color: windowtext;" data-ogsb="rgb(211, 223, 238)">
<p style="font-size:11pt;font-family:Calibri,sans-serif;margin:0;"><span style="color: rgb(255, 255, 255) !important; font-size: 12pt;" data-ogsc="black">&nbsp;</span><span style="color: rgb(255, 255, 255) !important; font-size: 12pt; font-family: Kuro;" data-ogsc="black">${currency} ${amount}</span><span style="font-size:12pt;font-family:Kuro;"></span></p>
</td>

<td valign="top" style="background-color: rgb(56, 67, 79) !important; width: 106.9pt; height: 39.85pt; padding: 0px; border-style: none solid solid none; border-right-width: 1pt; border-bottom-width: 1pt; border-right-color: windowtext; border-bottom-color: windowtext;" data-ogsb="rgb(211, 223, 238)">
<p style="font-size:11pt;font-family:Calibri,sans-serif;margin:0;"><span style="color: rgb(255, 255, 255) !important; font-size: 12pt;" data-ogsc="black">&nbsp;</span><span style="color: rgb(255, 255, 255) !important; font-size: 12pt; font-family: Kuro;" data-ogsc="black">${location}</span><span style="font-size:12pt;font-family:Kuro;"></span></p>
</td>
</tr>
</tbody></table>
                </div><span class="im">
                    <table style="width:100%;padding:10px 10px 10px 40px;color:#333333">
                        <tbody>
                            <tr>
                                <td>
                                    
                                </td>
                                <td style="float:right">
                                    CalBank PLC<br>
                                    Independence Avenue,<br>
                                    <a href="mailto:customercare@calbank.net"
                                        target="_blank">customercare@calbank.net</a><br>
                                    0800500500/233302739900<br>
                                    Accra, Ghana<br>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </span>
            </div>
            <p></p><br>
            <hr><img
                src="https://ci3.googleusercontent.com/proxy/fVyOH2QA9P4EvVeL2rywML7YTB7mbFAiirNURIVlO3RBychyVb89N4QEMFtiXtGH_j9fF6SFFvc1bRH5ZcSl1mr1=s0-d-e1-ft#https://calpay.caleservice.net/images/logo.jpeg"
                style="height:50px;width:150px;float:left" class="CToWUd"><img
                src="https://ci6.googleusercontent.com/proxy/1VsJ3tD8ZS4xHwx_8VnQ3R2xBd6NpvaT_7GvJKI-bk9lS2hr0IRF9JzYWcYdCNldpE9_hT8HcDU3mY9pSJOJAxxNqSS_soXdbf3c_FCz=s0-d-e1-ft#https://calpay.caleservice.net/images/landing/calpay-01.jpg"
                style="height:60px;width:120px;margin-left:30px" class="CToWUd">
            <div class="yj6qo"></div>
            <div class="adL">


            </div>
        </div>
    </div>
    <div id=":36" class="ii gt" style="display:none">
        <div id=":37" class="a3s aiL "></div>
    </div>
    <div class="hi"></div>
</div>
    </body>
  </html>
  `;
  let mailOptions = {
    from: 'noreply@calbank.net CREDIT TRACKER', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html: output, // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    console.log('contact', { msg: 'Email has been sent' });
  });

  res.json({ msg: 'Email has been sent', success: true });
});

exports.GodsEye = asynHandler(async (req, res, next) => {
  console.log(req.body);
  let newtime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  var today = new Date();
  let transporter = nodemailer.createTransport({
    host: '192.168.0.36',
    port: 25,
  });
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  let body = req.body;

  let mailOptions = {
    from: 'noreply@calbank.net BIRDS EYE', // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.text, // plain text body
    html: `<b>System Down! </b><br> Created by : SystemAlert
      </b><br> Title : ${req.body.description}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    console.log('contact', { msg: 'Email has been sent' });
  });

  res.json({ msg: 'Email has been sent', success: true });
});

exports.CustomerUpdate = asynHandler(async (req, res, next) => {

  let subject = 'CalBank Ghana Card Update';
  let user = req.body.user;
  let status = req.body.status
  let declinedReason = req.body.declinedReason
  let email = req.body.email;
  let transporter = nodemailer.createTransport({
    host: '192.168.0.36',
    port: 25,
  });

  let m1 = `<html>

  <head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <style>
          a:hover {
              background: #444 !important;
              border: 1px solid #444 !important;
              color: #fff !important;
          }
  
          @media (max-width: 768px) {
              td.header {
                  font-size: 15px;
              }
  
              table {
                  padding-left: 20px !important;
              }
  
              a.port {
                  width: 70%;
                  float: left;
                  font-size: 14px;
                  text-align: center;
                  padding: 5px !important;
                  margin-bottom: 10px;
              }
  
              .calbanklogo img {
                  max-width: 150px !important;
              }
  
              table.calbanklogo {
                  max-height: 60px;
              }
          }
      </style>
  </head>
  
  <body style='background: #F4F4F7;font-family:Kuro;'>
      <div style='margin-top: 50px !important; margin-bottom: 50px !important'>
          <div
              style='max-width:700px;background: #FFF; margin-left:auto;margin-right:auto;border-radius: 10px;    margin-top: 50px !important; margin-bottom: 50px !important'>
              <table style='width:100%;height:100px;' class='calbanklogo'>
                  <tr>
                      <td><img src='https://calbank.net/wp-content/uploads/2021/06/calbank-logo-color-1.png'
                              alt='CalBank Logo' style='max-width: 200px; float: right;' /></td>
                  </tr>
              </table>
              <table
                  style='width:100%;background: #FFD100;background-image: linear-gradient(to right, #FFD100, #F59037 );padding: 10px 10px 10px 40px;font-size: 25px;margin-bottom: 20px;'>
                  <tr>
                      <td class='header'>CalBank Ghana Card Update</td>
                  </tr>
              </table>
              <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                
                  <td><br><br>
                      Hello ${user},<br />Your request to
                      update your Ghana card on CalBank Banking System has been authorized/approved.
                      Your profile has been updated successfully .
                      <br><br><br><br><br><br><b>Disclaimer</b>
                          <br><br>If you have not accessed CalBank Update Portal on your device, kindly ignore
                          this message or contact our Contact Centre toll free on 0800500500. You can also send us an email at
                          <a href="mailto:customercare@calbank.net" target="_blank">customercare@calbank.net</a> or connect
                          with us on social at <a href="https://www.facebook.com/CalBankPLC" target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw1qnXFnHYMbCJVa1_XbkefE">Facebook</a>,
                          <a href="https://twitter.com/CalBankPLC" target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3G_QykfrhChEQI9_C4ybaT">Twitter</a>,
                          <a href="https://www.instagram.com/calbankltd/" target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/calbankltd/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw36_CLS503Sfkhn4JhPETDe">Instagram</a>
                          and <a href="https://www.linkedin.com/company/calbank-plc/" target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/calbank-plc/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw2mb1EJ_IIvJFVxaYfLaCHC">LinkedIn.</a>
                  </td>
                  <tr>
                      <td><br />
                          <hr />
                      </td>
                  </tr>
              </table>
              <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                  <tr>
                      <td> <span><a href='https://calbank.net/'
                                  style='border: 1px solid #ffcf02; padding:10px; border-radius: 50px; color: #000; text-decoration: none; background: #fece02;'
                                  class='port'> Visit Website</a> <a href="https://mycalnet.net/" style="border:1px solid #f59334;padding:10px;border-radius:50px;color:#fff;text-decoration:none;background:#f59136" class="m_-8389317559783956723port" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://mycalnet.net/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3C9dBhtf0k5mTtOO1aOl5T"> Visit Online Banking</a></span>
                          <p></p>
                      </td>
                      <td style='float:right'>CalBank PLC<br /> 23 Independence Avenue,<br />
                          customercare@calbank.net<br /> 0800500500<br /> Accra-Ghana,<br /> </td>
                  </tr>
              </table>
          </div>
      </div>
  </body>
  
  </html>`
  let m2 = `<html>

  <head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <style>
          a:hover {
              background: #444 !important;
              border: 1px solid #444 !important;
              color: #fff !important;
          }
  
          @media (max-width: 768px) {
              td.header {
                  font-size: 15px;
              }
  
              table {
                  padding-left: 20px !important;
              }
  
              a.port {
                  width: 70%;
                  float: left;
                  font-size: 14px;
                  text-align: center;
                  padding: 5px !important;
                  margin-bottom: 10px;
              }
  
              .calbanklogo img {
                  max-width: 150px !important;
              }
  
              table.calbanklogo {
                  max-height: 60px;
              }
          }
      </style>
  </head>
  
  <body style='background: #F4F4F7;font-family:Kuro;'>
      <div style='margin-top: 50px !important; margin-bottom: 50px !important'>
          <div
              style='max-width:700px;background: #FFF; margin-left:auto;margin-right:auto;border-radius: 10px;    margin-top: 50px !important; margin-bottom: 50px !important'>
              <table style='width:100%;height:100px;' class='calbanklogo'>
                  <tr>
                      <td><img src='https://calbank.net/wp-content/uploads/2021/06/calbank-logo-color-1.png'
                              alt='CalBank Logo' style='max-width: 200px; float: right;' /></td>
                  </tr>
              </table>
              <table
                  style='width:100%;background: #FFD100;background-image: linear-gradient(to right, #FFD100, #F59037 );padding: 10px 10px 10px 40px;font-size: 25px;margin-bottom: 20px;'>
                  <tr>
                      <td class='header'>CalBank Ghana Card Update</td>
                  </tr>
              </table>
              <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                
                  <td><br><br>
                      Hello ${user},<br />Your request to
                      update your Ghana card on CalBank Banking System has been declined.
                      <br><b>Reason:</b>
                     <br><br>${declinedReason}
                      <br><br><br><br><br><br><b>Disclaimer</b>
                          <br><br>If you have not accessed CalBank Update Portal on your device, kindly ignore
                          this message or contact our Contact Centre toll free on 0800500500. You can also send us an email at
                          <a href="mailto:customercare@calbank.net" target="_blank">customercare@calbank.net</a> or connect
                          with us on social at <a href="https://www.facebook.com/CalBankPLC" target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw1qnXFnHYMbCJVa1_XbkefE">Facebook</a>,
                          <a href="https://twitter.com/CalBankPLC" target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3G_QykfrhChEQI9_C4ybaT">Twitter</a>,
                          <a href="https://www.instagram.com/calbankltd/" target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/calbankltd/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw36_CLS503Sfkhn4JhPETDe">Instagram</a>
                          and <a href="https://www.linkedin.com/company/calbank-plc/" target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/calbank-plc/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw2mb1EJ_IIvJFVxaYfLaCHC">LinkedIn.</a>
                  </td>
                  <tr>
                      <td><br />
                          <hr />
                      </td>
                  </tr>
              </table>
              <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                  <tr>
                      <td> <span><a href='https://calbank.net/'
                                  style='border: 1px solid #ffcf02; padding:10px; border-radius: 50px; color: #000; text-decoration: none; background: #fece02;'
                                  class='port'> Visit Website</a> <a href="https://mycalnet.net/" style="border:1px solid #f59334;padding:10px;border-radius:50px;color:#fff;text-decoration:none;background:#f59136" class="m_-8389317559783956723port" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://mycalnet.net/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3C9dBhtf0k5mTtOO1aOl5T"> Visit Online Banking</a></span>
                          <p></p>
                      </td>
                      <td style='float:right'>CalBank PLC<br /> 23 Independence Avenue,<br />
                          customercare@calbank.net<br /> 0800500500<br /> Accra-Ghana,<br /> </td>
                  </tr>
              </table>
          </div>
      </div>
  </body>
  
  </html>`
  let mailOptions = {
    from: 'noreply@calbank.net CUSTOMER GHANA CARD UPDATE', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: subject, // plain text body
    html: status === 1 ? m1 : m2
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    console.log('contact', { msg: 'Email has been sent' });
  });

  res.json({ msg: 'Email has been sent', success: true });
});

exports.OTP = asynHandler(async (req, res, next) => {

    let subject = 'CalBank Ghana Card Update';
    let otp = req.body.otp;
    let email = req.body.email;
    let transporter = nodemailer.createTransport({
      host: '192.168.0.36',
      port: 25,
    });
  
  
 
    let mailOptions = {
      from: 'noreply@calbank.net CUSTOMER GHANA CARD UPDATE', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: subject, // plain text body
      html: `<html>

      <head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>
          <style>
              a:hover {
                  background: #444 !important;
                  border: 1px solid #444 !important;
                  color: #fff !important;
              }
      
              @media (max-width: 768px) {
                  td.header {
                      font-size: 15px;
                  }
      
                  table {
                      padding-left: 20px !important;
                  }
      
                  a.port {
                      width: 70%;
                      float: left;
                      font-size: 14px;
                      text-align: center;
                      padding: 5px !important;
                      margin-bottom: 10px;
                  }
      
                  .calbanklogo img {
                      max-width: 150px !important;
                  }
      
                  table.calbanklogo {
                      max-height: 60px;
                  }
              }
          </style>
      </head>
      
      <body style='background: #F4F4F7;font-family:Kuro;'>
          <div style='margin-top: 50px !important; margin-bottom: 50px !important'>
              <div
                  style='max-width:700px;background: #FFF; margin-left:auto;margin-right:auto;border-radius: 10px;    margin-top: 50px !important; margin-bottom: 50px !important'>
                  <table style='width:100%;height:100px;' class='calbanklogo'>
                      <tr>
                          <td><img src='https://calbank.net/wp-content/uploads/2021/06/calbank-logo-color-1.png'
                                  alt='CalBank Logo' style='max-width: 200px; float: right;' /></td>
                      </tr>
                  </table>
                  <table
                      style='width:100%;background: #FFD100;background-image: linear-gradient(to right, #FFD100, #F59037 );padding: 10px 10px 10px 40px;font-size: 25px;margin-bottom: 20px;'>
                      <tr>
                          <td class='header'>CalBank Ghana Card Update</td>
                      </tr>
                  </table>
                  <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                    
                      <td><br><br>
                        Your One-Time-Password is ${otp}.
                        
                          <br><b>Please ignore this message if you did not initiate this request on the Customer Update Portal. Never share this token</b>
                         
                          <br><br><br><br><br><br><b>Disclaimer</b>
                              <br><br>If you have not accessed CalBank Update Portal on your device, kindly ignore
                              this message or contact our Contact Centre toll free on 0800500500. You can also send us an email at
                              <a href="mailto:customercare@calbank.net" target="_blank">customercare@calbank.net</a> or connect
                              with us on social at <a href="https://www.facebook.com/CalBankPLC" target="_blank"
                                  data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw1qnXFnHYMbCJVa1_XbkefE">Facebook</a>,
                              <a href="https://twitter.com/CalBankPLC" target="_blank"
                                  data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3G_QykfrhChEQI9_C4ybaT">Twitter</a>,
                              <a href="https://www.instagram.com/calbankltd/" target="_blank"
                                  data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/calbankltd/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw36_CLS503Sfkhn4JhPETDe">Instagram</a>
                              and <a href="https://www.linkedin.com/company/calbank-plc/" target="_blank"
                                  data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/calbank-plc/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw2mb1EJ_IIvJFVxaYfLaCHC">LinkedIn.</a>
                      </td>
                      <tr>
                          <td><br />
                              <hr />
                          </td>
                      </tr>
                  </table>
                  <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                      <tr>
                          <td> <span><a href='https://calbank.net/'
                                      style='border: 1px solid #ffcf02; padding:10px; border-radius: 50px; color: #000; text-decoration: none; background: #fece02;'
                                      class='port'> Visit Website</a> <a href="https://mycalnet.net/" style="border:1px solid #f59334;padding:10px;border-radius:50px;color:#fff;text-decoration:none;background:#f59136" class="m_-8389317559783956723port" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://mycalnet.net/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3C9dBhtf0k5mTtOO1aOl5T"> Visit Online Banking</a></span>
                              <p></p>
                          </td>
                          <td style='float:right'>CalBank PLC<br /> 23 Independence Avenue,<br />
                              customercare@calbank.net<br /> 0800500500<br /> Accra-Ghana,<br /> </td>
                      </tr>
                  </table>
              </div>
          </div>
      </body>
      
      </html>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
      console.log('contact', { msg: 'Email has been sent' });
    });
  
    res.json({ msg: 'Email has been sent', success: true });
  });
  exports.StudentUpdate = asynHandler(async (req, res, next) => {

    let subject = 'CalBank Ghana Card Update';
    let user = req.body.user;
    let status = req.body.status
    let declinedReason = req.body.declinedReason
    let email = req.body.email;
    let transporter = nodemailer.createTransport({
      host: '192.168.0.36',
      port: 25,
    });
  
    let m1 = `<html>
  
    <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <style>
            a:hover {
                background: #444 !important;
                border: 1px solid #444 !important;
                color: #fff !important;
            }
    
            @media (max-width: 768px) {
                td.header {
                    font-size: 15px;
                }
    
                table {
                    padding-left: 20px !important;
                }
    
                a.port {
                    width: 70%;
                    float: left;
                    font-size: 14px;
                    text-align: center;
                    padding: 5px !important;
                    margin-bottom: 10px;
                }
    
                .calbanklogo img {
                    max-width: 150px !important;
                }
    
                table.calbanklogo {
                    max-height: 60px;
                }
            }
        </style>
    </head>
    
    <body style='background: #F4F4F7;font-family:Kuro;'>
        <div style='margin-top: 50px !important; margin-bottom: 50px !important'>
            <div
                style='max-width:700px;background: #FFF; margin-left:auto;margin-right:auto;border-radius: 10px;    margin-top: 50px !important; margin-bottom: 50px !important'>
                <table style='width:100%;height:100px;' class='calbanklogo'>
                    <tr>
                        <td><img src='https://calbank.net/wp-content/uploads/2021/06/calbank-logo-color-1.png'
                                alt='CalBank Logo' style='max-width: 200px; float: right;' /></td>
                    </tr>
                </table>
                <table
                    style='width:100%;background: #FFD100;background-image: linear-gradient(to right, #FFD100, #F59037 );padding: 10px 10px 10px 40px;font-size: 25px;margin-bottom: 20px;'>
                    <tr>
                        <td class='header'>CalBank Ghana Card Update</td>
                    </tr>
                </table>
                <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                  
                    <td><br><br>
                        Hello ${user},<br />Your request to
                        convert your Student account on CalBank Banking System has been authorized/approved.
                        Your profile has been updated successfully .
                        <br><br><br><br><br><br><b>Disclaimer</b>
                            <br><br>If you have not accessed CalBank Update Portal on your device, kindly ignore
                            this message or contact our Contact Centre toll free on 0800500500. You can also send us an email at
                            <a href="mailto:customercare@calbank.net" target="_blank">customercare@calbank.net</a> or connect
                            with us on social at <a href="https://www.facebook.com/CalBankPLC" target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw1qnXFnHYMbCJVa1_XbkefE">Facebook</a>,
                            <a href="https://twitter.com/CalBankPLC" target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3G_QykfrhChEQI9_C4ybaT">Twitter</a>,
                            <a href="https://www.instagram.com/calbankltd/" target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/calbankltd/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw36_CLS503Sfkhn4JhPETDe">Instagram</a>
                            and <a href="https://www.linkedin.com/company/calbank-plc/" target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/calbank-plc/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw2mb1EJ_IIvJFVxaYfLaCHC">LinkedIn.</a>
                    </td>
                    <tr>
                        <td><br />
                            <hr />
                        </td>
                    </tr>
                </table>
                <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                    <tr>
                        <td> <span><a href='https://calbank.net/'
                                    style='border: 1px solid #ffcf02; padding:10px; border-radius: 50px; color: #000; text-decoration: none; background: #fece02;'
                                    class='port'> Visit Website</a> <a href="https://mycalnet.net/" style="border:1px solid #f59334;padding:10px;border-radius:50px;color:#fff;text-decoration:none;background:#f59136" class="m_-8389317559783956723port" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://mycalnet.net/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3C9dBhtf0k5mTtOO1aOl5T"> Visit Online Banking</a></span>
                            <p></p>
                        </td>
                        <td style='float:right'>CalBank PLC<br /> 23 Independence Avenue,<br />
                            customercare@calbank.net<br /> 0800500500<br /> Accra-Ghana,<br /> </td>
                    </tr>
                </table>
            </div>
        </div>
    </body>
    
    </html>`
    let m2 = `<html>
  
    <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <style>
            a:hover {
                background: #444 !important;
                border: 1px solid #444 !important;
                color: #fff !important;
            }
    
            @media (max-width: 768px) {
                td.header {
                    font-size: 15px;
                }
    
                table {
                    padding-left: 20px !important;
                }
    
                a.port {
                    width: 70%;
                    float: left;
                    font-size: 14px;
                    text-align: center;
                    padding: 5px !important;
                    margin-bottom: 10px;
                }
    
                .calbanklogo img {
                    max-width: 150px !important;
                }
    
                table.calbanklogo {
                    max-height: 60px;
                }
            }
        </style>
    </head>
    
    <body style='background: #F4F4F7;font-family:Kuro;'>
        <div style='margin-top: 50px !important; margin-bottom: 50px !important'>
            <div
                style='max-width:700px;background: #FFF; margin-left:auto;margin-right:auto;border-radius: 10px;    margin-top: 50px !important; margin-bottom: 50px !important'>
                <table style='width:100%;height:100px;' class='calbanklogo'>
                    <tr>
                        <td><img src='https://calbank.net/wp-content/uploads/2021/06/calbank-logo-color-1.png'
                                alt='CalBank Logo' style='max-width: 200px; float: right;' /></td>
                    </tr>
                </table>
                <table
                    style='width:100%;background: #FFD100;background-image: linear-gradient(to right, #FFD100, #F59037 );padding: 10px 10px 10px 40px;font-size: 25px;margin-bottom: 20px;'>
                    <tr>
                        <td class='header'>CalBank Ghana Card Update</td>
                    </tr>
                </table>
                <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                  
                    <td><br><br>
                        Hello ${user},<br />Your request to
                        convert your Student account on CalBank Banking System has been declined. Kindly visit the any branch near you or call our toll free number 0800 500 500.
                        <br><b>Reason:</b>
                       <br><br>${declinedReason}
                        <br><br><br><br><br><br><b>Disclaimer</b>
                            <br><br>If you have not accessed CalBank Update Portal on your device, kindly ignore
                            this message or contact our Contact Centre toll free on 0800500500. You can also send us an email at
                            <a href="mailto:customercare@calbank.net" target="_blank">customercare@calbank.net</a> or connect
                            with us on social at <a href="https://www.facebook.com/CalBankPLC" target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw1qnXFnHYMbCJVa1_XbkefE">Facebook</a>,
                            <a href="https://twitter.com/CalBankPLC" target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/CalBankPLC&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3G_QykfrhChEQI9_C4ybaT">Twitter</a>,
                            <a href="https://www.instagram.com/calbankltd/" target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/calbankltd/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw36_CLS503Sfkhn4JhPETDe">Instagram</a>
                            and <a href="https://www.linkedin.com/company/calbank-plc/" target="_blank"
                                data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/calbank-plc/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw2mb1EJ_IIvJFVxaYfLaCHC">LinkedIn.</a>
                    </td>
                    <tr>
                        <td><br />
                            <hr />
                        </td>
                    </tr>
                </table>
                <table style='width:100%;padding: 10px 10px 10px 40px;color: #333333;'>
                    <tr>
                        <td> <span><a href='https://calbank.net/'
                                    style='border: 1px solid #ffcf02; padding:10px; border-radius: 50px; color: #000; text-decoration: none; background: #fece02;'
                                    class='port'> Visit Website</a> <a href="https://mycalnet.net/" style="border:1px solid #f59334;padding:10px;border-radius:50px;color:#fff;text-decoration:none;background:#f59136" class="m_-8389317559783956723port" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://mycalnet.net/&amp;source=gmail&amp;ust=1654261198337000&amp;usg=AOvVaw3C9dBhtf0k5mTtOO1aOl5T"> Visit Online Banking</a></span>
                            <p></p>
                        </td>
                        <td style='float:right'>CalBank PLC<br /> 23 Independence Avenue,<br />
                            customercare@calbank.net<br /> 0800500500<br /> Accra-Ghana,<br /> </td>
                    </tr>
                </table>
            </div>
        </div>
    </body>
    
    </html>`
    let mailOptions = {
      from: 'noreply@calbank.net CUSTOMER GHANA CARD UPDATE', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: subject, // plain text body
      html: status == 1 ? m1 : m2
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
      console.log('contact', { msg: 'Email has been sent' });
    });
  
    res.json({ msg: 'Email has been sent', success: true });
  });