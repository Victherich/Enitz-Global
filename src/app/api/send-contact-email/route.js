



// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { name, email, phone, message } = body;

//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { success: false, message: 'Please provide name, email, and message.' },
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
//             .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5eaf2; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
//             .header { background: linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%); padding: 25px; text-align: center; color: #ffffff; }
//             .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
//             .header p { margin: 5px 0 0; font-size: 13px; color: #fdf2f8; opacity: 0.95; }
//             .content { padding: 20px; }
//             .info-box { background: #f8fafc; border-left: 4px solid #06b6d4; padding: 12px 15px; border-radius: 4px; margin-bottom: 20px; font-size: 13px; line-height: 1.6; }
//             .message-box { background: #f1f5f9; padding: 15px; border-radius: 6px; font-size: 14px; color: #0f172a; line-height: 1.6; margin-top: 15px; }
//             .footer { background: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #e5eaf2; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>KINGS WORD BAG CRAFT</h1>
//               <p>New Contact Form Submission</p>
//             </div>
//             <div class="content">
//               <div class="info-box">
//                 <strong>Name:</strong> ${name} <br/>
//                 <strong>Email:</strong> ${email} <br/>
//                 <strong>Phone:</strong> ${phone || 'N/A'}
//               </div>
//               <h3 style="font-size: 14px; color: #ec4899; margin-bottom: 5px;">Message:</h3>
//               <div class="message-box">
//                 ${message.replace(/\n/g, '<br/>')}
//               </div>
//             </div>
//             <div class="footer">
//               &copy; ${new Date().getFullYear()} Kings Word Bag Craft. All rights reserved.
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     const mailOptions = {
//       // Must use process.env.SMTP_USER as the actual email to avoid spam flags, 
//       // but you can prepend the customer's name in the display string safely:
//       from: `"${name} via Kings Word Bag Craft" <${process.env.SMTP_USER}>`,
//       //  to: 'beesinterior@gmail.com', // The inbox receiving the leads
//        to: 'victherich@gmail.com',
//       replyTo: email,            // Clicking "Reply" will reply straight to the customer
//       subject: `New Contact Inquiry: ${name}`,
//       html: htmlContent,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ success: true, message: 'Contact email sent successfully.' }, { status: 200 });
//   } catch (error) {
//     console.error('Error sending contact email:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }




import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide name, email, and message.' },
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
            .info-box { background: #f8fafc; border-left: 4px solid #00AEEF; padding: 12px 15px; border-radius: 4px; margin-bottom: 20px; font-size: 13px; line-height: 1.6; }
            .message-box { background: #f8fafc; padding: 15px; border-radius: 6px; font-size: 14px; color: #0f172a; line-height: 1.6; margin-top: 15px; border: 1px solid #cbd5e1; }
            .footer { background: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #475569; border-top: 1px solid #cbd5e1; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ENITZ GLOBAL LIMITED</h1>
              <p>New Contact Form Submission</p>
            </div>
            <div class="content">
              <div class="info-box">
                <strong>Name:</strong> ${name} <br/>
                <strong>Email:</strong> ${email} <br/>
                <strong>Phone:</strong> ${phone || 'N/A'}
              </div>
              <h3 style="font-size: 14px; color: #0B1B48; margin-bottom: 5px;">Message:</h3>
              <div class="message-box">
                ${message.replace(/\n/g, '<br/>')}
              </div>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Enitz Global Limited. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      // Must use process.env.SMTP_USER as the actual email to avoid spam flags, 
      // but you can prepend the customer's name in the display string safely:
      from: `"${name} via Enitz Global Limited" <${process.env.SMTP_USER}>`,
      // to: 'enitzglobal@gmail.com', // The inbox receiving the leads
      to: 'victorndu393@gmail.com',
      replyTo: email,           // Clicking "Reply" will reply straight to the customer
      subject: `New Contact Inquiry: ${name}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Contact email sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}