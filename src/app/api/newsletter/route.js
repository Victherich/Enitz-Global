// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { email } = body;

//     if (!email) {
//       return NextResponse.json(
//         { success: false, message: 'Please provide an email address.' },
//         { status: 400 }
//       );
//     }

//     // Basic email validation regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { success: false, message: 'Please provide a valid email address.' },
//         { status: 400 }
//       );
//     }

//     // Configure Nodemailer transporter using your SMTP provider
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST || 'smtp.gmail.com',
//       port: Number(process.env.SMTP_PORT) || 465,
//       secure: Number(process.env.SMTP_PORT) === 465,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <style>
//             body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
//             .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
//             .header { background: linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%); padding: 25px; text-align: center; color: #ffffff; }
//             .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
//             .header p { margin: 5px 0 0; font-size: 13px; color: #e2e8f0; opacity: 0.95; }
//             .content { padding: 20px; }
//             .info-box { background: #f8fafc; border-left: 4px solid #00AEEF; padding: 15px; border-radius: 4px; margin-bottom: 20px; font-size: 14px; line-height: 1.6; }
//             .footer { background: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #475569; border-top: 1px solid #cbd5e1; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>ENITZ</h1>
//               <p>New Newsletter Subscription</p>
//             </div>
//             <div class="content">
//               <div class="info-box">
//                 <strong>New Subscriber Email:</strong> <a href="mailto:${email}" style="color: #00AEEF; text-decoration: none;">${email}</a>
//               </div>
//               <p style="font-size: 13px; color: #475569; line-height: 1.5;">
//                 This user just signed up to receive updates from your website's newsletter section.
//               </p>
//             </div>
//             <div class="footer">
//               &copy; ${new Date().getFullYear()} Enitz Global Limited. All rights reserved.
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     const mailOptions = {
//       from: `"Newsletter Signup via Enitz" <${process.env.SMTP_USER}>`,
//       to: 'victherich@gmail.com', // The inbox receiving the leads
//     //   to: 'enitzglobal@gmail.com',
//       replyTo: email,               // Clicking "Reply" will reply straight to the subscriber
//       subject: `New Newsletter Subscriber: ${email}`,
//       html: htmlContent,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ success: true, message: 'Newsletter subscription email sent successfully.' }, { status: 200 });
//   } catch (error) {
//     console.error('Error sending newsletter email:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validate both name and email
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Please provide both your name and email address.' },
        { status: 400 }
      );
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter using your SMTP provider
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
            .header { background: linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%); padding: 25px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 5px 0 0; font-size: 13px; color: #e2e8f0; opacity: 0.95; }
            .content { padding: 20px; }
            .info-box { background: #f8fafc; border-left: 4px solid #00AEEF; padding: 15px; border-radius: 4px; margin-bottom: 20px; font-size: 14px; line-height: 1.6; }
            .info-box p { margin: 6px 0; }
            .footer { background: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #475569; border-top: 1px solid #cbd5e1; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ENITZ</h1>
              <p>New Newsletter Subscription</p>
            </div>
            <div class="content">
              <div class="info-box">
                <p><strong>Subscriber Name:</strong> ${name}</p>
                <p><strong>Subscriber Email:</strong> <a href="mailto:${email}" style="color: #00AEEF; text-decoration: none;">${email}</a></p>
              </div>
              <p style="font-size: 13px; color: #475569; line-height: 1.5;">
                This user just signed up to receive updates from your website's newsletter section.
              </p>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Enitz Global Limited. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: `"Newsletter Signup via Enitz" <${process.env.SMTP_USER}>`,
    //   to: 'victherich@gmail.com', // The inbox receiving the leads (change to enitzglobal@gmail.com when ready)
        to: 'enitzglobal@gmail.com',
      replyTo: email,              // Clicking "Reply" will reply straight to the subscriber
      subject: `New Newsletter Subscriber: ${name} (${email})`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Newsletter subscription email sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending newsletter email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}