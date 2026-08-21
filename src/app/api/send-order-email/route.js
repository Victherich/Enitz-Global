





// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { orderId, payload, recipients } = body;

//     if (!payload || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid payload or recipients.' },
//         { status: 400 }
//       );
//     }

//     // Configure Nodemailer transporter using your SMTP provider
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST || 'smtp.gmail.com',
//       port: Number(process.env.SMTP_PORT) || 465,
//       secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
//       auth: {
//         user: process.env.SMTP_USER, // Your verified SMTP email address
//         pass: process.env.SMTP_PASS, // Your app password
//       },
//     });

//     const {
//       orderNumber,
//       items,
//       deliveryAddress,
//       subtotal,
//       deliveryFee,
//       discount,
//       finalTotal,
//       promoCode,
//       currency,
//       accountInfo,
//       paymentType,
//       paymentStatus,
//       orderStatus,
//     } = payload;

//     // Build items HTML table rows
//     const itemsHtml = items
//       .map(
//         (item) => `
//       <tr>
//         <td style="padding: 10px; border-bottom: 1px solid #e5eaf2; font-size: 13px; color: #0f172a;">
//           ${item.name || 'Product'} ${item.selectedColor ? `<br><small style="color: #475569;">Color: ${item.selectedColor}</small>` : ''}
//         </td>
//         <td style="padding: 10px; border-bottom: 1px solid #e5eaf2; font-size: 12px; color: #475569; font-family: monospace;">
//           ${item.id || 'N/A'}
//         </td>
//         <td style="padding: 10px; border-bottom: 1px solid #e5eaf2; text-align: center; font-size: 13px; color: #0f172a;">
//           ${item.quantity || 1}
//         </td>
//         <td style="padding: 10px; border-bottom: 1px solid #e5eaf2; text-align: right; font-size: 13px; color: #0f172a; font-weight: 600;">
//           ₦${Number((item.amount || item.price || 0) * (item.quantity || 1)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//         </td>
//       </tr>
//     `
//       )
//       .join('');

//     // Format delivery address text/HTML
//     const addressHtml = typeof deliveryAddress === 'object' 
//       ? `${deliveryAddress.fullName || accountInfo.name}<br/>${deliveryAddress.street || deliveryAddress.address || ''}, ${deliveryAddress.city || ''}, ${deliveryAddress.state || ''}<br/>Phone: ${deliveryAddress.phone || accountInfo.phone}`
//       : deliveryAddress;

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
//             .info-box { background: #f8fafc; border-left: 4px solid #06b6d4; padding: 12px 15px; border-radius: 4px; margin-bottom: 20px; font-size: 13px; }
//             .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//             .table th { background: #f1f5f9; padding: 10px; text-align: left; font-size: 12px; font-weight: 700; color: #475569; border-bottom: 2px solid #e5eaf2; }
//             .totals { width: 100%; font-size: 13px; margin-bottom: 20px; }
//             .totals td { padding: 6px 10px; }
//             .footer { background: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #e5eaf2; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>KINGSWORD BAG CRAFT</h1>
//               <p>Order Confirmation & Summary</p>
//             </div>
//             <div class="content">
//               <div class="info-box">
//                 <strong>Order Number:</strong> ${orderNumber} <br/>
//                 <strong>Payment Type:</strong> ${paymentType} <br/>
//                 <strong>Payment Status:</strong> ${paymentStatus} <br/>
//                 <strong>Order Status:</strong> ${orderStatus}
//               </div>

//               <h3 style="font-size: 14px; color: #ec4899; margin-bottom: 8px;">Customer Information</h3>
//               <p style="font-size: 13px; margin-top: 0; line-height: 1.5; color: #475569;">
//                 <strong>Name:</strong> ${accountInfo.name}<br/>
//                 <strong>Email:</strong> ${accountInfo.email}<br/>
//                 <strong>Phone:</strong> ${accountInfo.phone}
//               </p>

//               <h3 style="font-size: 14px; color: #ec4899; margin-bottom: 8px;">Delivery Address</h3>
//               <p style="font-size: 13px; margin-top: 0; line-height: 1.5; color: #475569;">
//                 ${addressHtml}
//               </p>

//               <h3 style="font-size: 14px; color: #ec4899; margin-bottom: 8px;">Order Items</h3>
//               <table class="table">
//                 <thead>
//                   <tr>
//                     <th>Item</th>
//                     <th>Product ID</th>
//                     <th style="text-align: center;">Qty</th>
//                     <th style="text-align: right;">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${itemsHtml}
//                 </tbody>
//               </table>

//               <table class="totals">
//                 <tr>
//                   <td style="color: #475569;">Subtotal:</td>
//                   <td style="text-align: right; font-weight: 600;">₦${Number(subtotal || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
//                 </tr>
//                 <tr>
//                   <td style="color: #475569;">Delivery Fee:</td>
//                   <td style="text-align: right; font-weight: 600;">₦${Number(deliveryFee || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
//                 </tr>
//                 ${discount ? `
//                 <tr>
//                   <td style="color: #10b981;">Discount ${promoCode ? `(${promoCode})` : ''}:</td>
//                   <td style="text-align: right; font-weight: 600; color: #10b981;">-₦${Number(discount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
//                 </tr>` : ''}
//                 <tr>
//                   <td style="font-size: 15px; font-weight: 800; color: #0f172a; border-top: 1px solid #e5eaf2; padding-top: 10px;">Final Total:</td>
//                   <td style="text-align: right; font-size: 15px; font-weight: 800; color: #ec4899; border-top: 1px solid #e5eaf2; padding-top: 10px;">₦${Number(finalTotal || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
//                 </tr>
//               </table>
//             </div>
//             <div class="footer">
//               &copy; ${new Date().getFullYear()} Kingsword Bag Craft. All rights reserved.
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     // Loop through each recipient and send individually to prevent delivery drops or SMTP provider blocks
//     const emailPromises = recipients.map(async (recipientEmail) => {
//       const mailOptions = {
//         from: `"Kingsword Bag Craft" <${process.env.SMTP_USER}>`,
//         to: recipientEmail,
//         subject: `Order Confirmation #${orderNumber} - Kingsword Bag Craft`,
//         html: htmlContent,
//       };
//       return transporter.sendMail(mailOptions);
//     });

//     await Promise.all(emailPromises);

//     return NextResponse.json({ success: true, message: 'Emails sent successfully to all recipients.' }, { status: 200 });
//   } catch (error) {
//     console.error('Error sending order email:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }






import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, payload, recipients } = body;

    if (!payload || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid payload or recipients.' },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter using your SMTP provider
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your verified SMTP email address
        pass: process.env.SMTP_PASS, // Your app password
      },
    });

    const {
      orderNumber,
      items,
      deliveryAddress,
      subtotal,
      deliveryFee,
      discount,
      finalTotal,
      promoCode,
      currency,
      accountInfo,
      paymentType,
      paymentStatus,
      orderStatus,
    } = payload;

    // Build items HTML table rows including product image thumbnails
    const itemsHtml = items
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5eaf2; text-align: center; width: 50px;">
          ${item.image || item.imageUrl || item.img ? `
            <img src="${item.image || item.imageUrl || item.img}" alt="${item.name || 'Product'}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #e5eaf2;" />
          ` : `
            <div style="width: 40px; height: 40px; background-color: #f1f5f9; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; color: #64748b;">N/A</div>
          `}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5eaf2; font-size: 13px; color: #0f172a;">
          ${item.name || 'Product'} ${item.selectedColor ? `<br><small style="color: #475569;">Color: ${item.selectedColor}</small>` : ''}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5eaf2; font-size: 12px; color: #475569; font-family: monospace;">
          ${item.id || 'N/A'}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5eaf2; text-align: center; font-size: 13px; color: #0f172a;">
          ${item.quantity || 1}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5eaf2; text-align: right; font-size: 13px; color: #0f172a; font-weight: 600;">
          ₦${Number((item.amount || item.price || 0) * (item.quantity || 1)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </td>
      </tr>
    `
      )
      .join('');

    // Format delivery address text/HTML
    const addressHtml = typeof deliveryAddress === 'object' 
      ? `${deliveryAddress.fullName || accountInfo.name}<br/>${deliveryAddress.street || deliveryAddress.address || ''}, ${deliveryAddress.city || ''}, ${deliveryAddress.state || ''}<br/>Phone: ${deliveryAddress.phone || accountInfo.phone}`
      : deliveryAddress;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5eaf2; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
            .header { background: linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%); padding: 25px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { margin: 5px 0 0; font-size: 13px; color: #fdf2f8; opacity: 0.95; }
            .content { padding: 20px; }
            .info-box { background: #f8fafc; border-left: 4px solid #06b6d4; padding: 12px 15px; border-radius: 4px; margin-bottom: 20px; font-size: 13px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .table th { background: #f1f5f9; padding: 10px; text-align: left; font-size: 12px; font-weight: 700; color: #475569; border-bottom: 2px solid #e5eaf2; }
            .totals { width: 100%; font-size: 13px; margin-bottom: 20px; }
            .totals td { padding: 6px 10px; }
            .footer { background: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #e5eaf2; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>KINGSWORD BAG CRAFT</h1>
              <p>Order Confirmation & Summary</p>
            </div>
            <div class="content">
              <div class="info-box">
                <strong>Order Number:</strong> ${orderNumber} <br/>
                <strong>Payment Type:</strong> ${paymentType} <br/>
                <strong>Payment Status:</strong> ${paymentStatus} <br/>
                <strong>Order Status:</strong> ${orderStatus}
              </div>

              <h3 style="font-size: 14px; color: #ec4899; margin-bottom: 8px;">Customer Information</h3>
              <p style="font-size: 13px; margin-top: 0; line-height: 1.5; color: #475569;">
                <strong>Name:</strong> ${accountInfo.name}<br/>
                <strong>Email:</strong> ${accountInfo.email}<br/>
                <strong>Phone:</strong> ${accountInfo.phone}
              </p>

              <h3 style="font-size: 14px; color: #ec4899; margin-bottom: 8px;">Delivery Address</h3>
              <p style="font-size: 13px; margin-top: 0; line-height: 1.5; color: #475569;">
                ${addressHtml}
              </p>

              <h3 style="font-size: 14px; color: #ec4899; margin-bottom: 8px;">Order Items</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th style="text-align: center;">Image</th>
                    <th>Item</th>
                    <th>Product ID</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <table class="totals">
                <tr>
                  <td style="color: #475569;">Subtotal:</td>
                  <td style="text-align: right; font-weight: 600;">₦${Number(subtotal || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                  <td style="color: #475569;">Delivery Fee:</td>
                  <td style="text-align: right; font-weight: 600;">₦${Number(deliveryFee || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
                ${discount ? `
                <tr>
                  <td style="color: #10b981;">Discount ${promoCode ? `(${promoCode})` : ''}:</td>
                  <td style="text-align: right; font-weight: 600; color: #10b981;">-₦${Number(discount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>` : ''}
                <tr>
                  <td style="font-size: 15px; font-weight: 800; color: #0f172a; border-top: 1px solid #e5eaf2; padding-top: 10px;">Final Total:</td>
                  <td style="text-align: right; font-size: 15px; font-weight: 800; color: #ec4899; border-top: 1px solid #e5eaf2; padding-top: 10px;">₦${Number(finalTotal || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              </table>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Kingsword Bag Craft. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;

    // Loop through each recipient and send individually to prevent delivery drops or SMTP provider blocks
    const emailPromises = recipients.map(async (recipientEmail) => {
      const mailOptions = {
        from: `"Kingsword Bag Craft" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        subject: `Order Confirmation #${orderNumber} - Kingsword Bag Craft`,
        html: htmlContent,
      };
      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ success: true, message: 'Emails sent successfully to all recipients.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending order email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}