// "use client";

// import React, { useState } from "react";
// import styled, { keyframes } from "styled-components";
// import { 
//   MapPin, 
//   Phone, 
//   Mail, 
//   Send, 
//   Sparkles, 
//   Building2,
//   Camera
// } from "lucide-react";
// import Swal from "sweetalert2";

// // Animations
// const floatAnimation = keyframes`
//   0% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(-4px) rotate(1deg); }
//   100% { transform: translateY(0px) rotate(0deg); }
// `;

// // Styled Components (Completely Redesigned Light Mode Split-Hero Pattern with Unsplash Craft Imagery & Generous Spacing)
// const ContactPageWrapper = styled.div`
//   min-height: 100vh;
//   background-color: #f8fafc;
//   color: #0f172a;
//   padding: 40px 20px 80px 20px;
//   position: relative;
//   overflow: hidden;

//   @media (min-width: 768px) {
//     padding: 60px 40px 100px 40px;
//   }

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: radial-gradient(circle at 10% 20%, rgba(236, 72, 153, 0.05) 0%, transparent 40%),
//                 radial-gradient(circle at 90% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 40%);
//     pointer-events: none;
//     z-index: 1;
//   }
// `;

// const HeaderContainer = styled.div`
//   max-width: 50rem;
//   margin: 0 auto 40px auto;
//   text-align: center;
//   position: relative;
//   z-index: 2;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const Badge = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 8px;
//   padding: 8px 18px;
//   border-radius: 9999px;
//   background: #fdf2f8;
//   border: 1px solid rgba(236, 72, 153, 0.3);
//   color: #db2777;
//   font-size: 0.85rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.08em;
//   margin: 0 auto;
//   animation: ${floatAnimation} 4s ease-in-out infinite;
// `;

// const MainTitle = styled.h1`
//   font-size: 2.5rem;
//   font-weight: 800;
//   letter-spacing: -0.03em;
//   color: #0f172a;
//   line-height: 1.15;
//   margin: 0;

//   @media (min-width: 640px) {
//     font-size: 3.5rem;
//   }
// `;

// const HighlightSpan = styled.span`
//   background: linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;

// const Subtitle = styled.p`
//   font-size: 1.1rem;
//   color: #475569;
//   line-height: 1.6;
//   margin: 0 auto;
//   max-width: 40rem;
// `;

// const ContentGrid = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 32px;
//   position: relative;
//   z-index: 2;

//   @media (min-width: 1024px) {
//     grid-template-columns: 1.1fr 1fr;
//     gap: 40px;
//   }
// `;

// const InfoColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 24px;
// `;

// // Image Showcase Banner utilizing Unsplash Craft Imagery
// const ImageShowcaseCard = styled.div`
//   position: relative;
//   height: 240px;
//   border-radius: 20px;
//   overflow: hidden;
//   border: 1px solid #e2e8f0;
//   box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.08);

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.6s ease;
//   }

//   &:hover img {
//     transform: scale(1.05);
//   }

//   &::after {
//     content: '';
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0.75) 100%);
//   }

//   @media (min-width: 768px) {
//     height: 280px;
//   }
// `;

// const ImageOverlayText = styled.div`
//   position: absolute;
//   bottom: 24px;
//   left: 24px;
//   right: 24px;
//   z-index: 2;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   div {
//     display: flex;
//     flex-direction: column;
//     gap: 4px;

//     span:first-child {
//       font-size: 0.85rem;
//       color: #f472b6;
//       font-weight: 700;
//       text-transform: uppercase;
//       letter-spacing: 0.05em;
//     }

//     span:last-child {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: #ffffff;
//     }
//   }
// `;

// const ImageBadgeTag = styled.div`
//   background: rgba(255, 255, 255, 0.2);
//   backdrop-filter: blur(8px);
//   padding: 6px 12px;
//   border-radius: 8px;
//   font-size: 0.8rem;
//   color: #ffffff;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   border: 1px solid rgba(255, 255, 255, 0.3);
// `;

// const InfoCard = styled.div`
//   background: #ffffff;
//   border: 1px solid #e2e8f0;
//   border-radius: 20px;
//   padding: 32px;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
//   transition: all 0.3s ease;

//   &:hover {
//     border-color: #ec4899;
//     transform: translateY(-4px);
//     box-shadow: 0 15px 30px rgba(236, 72, 153, 0.08);
//   }
// `;

// const InfoCardTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 700;
//   color: #0f172a;
//   margin-bottom: 24px;
//   display: flex;
//   align-items: center;
//   gap: 12px;

//   svg {
//     color: #ec4899;
//     width: 1.25rem;
//     height: 1.25rem;
//   }
// `;

// const ContactDetailItem = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 16px;
//   margin-bottom: 20px;

//   &:last-child {
//     margin-bottom: 0;
//   }
// `;

// const IconWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 2.5rem;
//   height: 2.5rem;
//   border-radius: 10px;
//   background: #fdf2f8;
//   color: #db2777;
//   flex-shrink: 0;
//   border: 1px solid rgba(236, 72, 153, 0.2);

//   svg {
//     width: 1.15rem;
//     height: 1.15rem;
//   }
// `;

// const DetailContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;

//   span:first-child {
//     font-size: 0.8rem;
//     color: #64748b;
//     font-weight: 600;
//     text-transform: uppercase;
//     letter-spacing: 0.05em;
//   }

//   span:last-child {
//     font-size: 1rem;
//     color: #334155;
//     font-weight: 500;
//   }
// `;

// const FormColumn = styled.div`
//   background: #ffffff;
//   border: 1px solid #e2e8f0;
//   border-radius: 24px;
//   padding: 32px;
//   box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.05);

//   @media (min-width: 640px) {
//     padding: 40px;
//   }
// `;

// const FormTitle = styled.h3`
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: #0f172a;
//   margin-bottom: 8px;
// `;

// const FormSubtitle = styled.p`
//   font-size: 0.95rem;
//   color: #475569;
//   margin-bottom: 24px;
//   line-height: 1.5;
// `;

// const FormGrid = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const InputGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const Label = styled.label`
//   font-size: 0.85rem;
//   font-weight: 600;
//   color: #334155;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 12px 16px;
//   border-radius: 10px;
//   background-color: #f8fafc !important;
//   color: #0f172a !important;
//   border: 1px solid #cbd5e1;
//   font-size: 1rem;
//   outline: none;
//   transition: all 0.2s ease;

//   &::placeholder {
//     color: #94a3b8;
//   }

//   &:focus {
//     border-color: #ec4899;
//     background-color: #ffffff !important;
//     box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
//   }
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 12px 16px;
//   border-radius: 10px;
//   background-color: #f8fafc !important;
//   color: #0f172a !important;
//   border: 1px solid #cbd5e1;
//   font-size: 1rem;
//   outline: none;
//   min-height: 140px;
//   resize: vertical;
//   transition: all 0.2s ease;

//   &::placeholder {
//     color: #94a3b8;
//   }

//   &:focus {
//     border-color: #ec4899;
//     background-color: #ffffff !important;
//     box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
//   }
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;
//   padding: 14px 24px;
//   border-radius: 12px;
//   background: linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%);
//   color: #ffffff;
//   font-weight: 700;
//   font-size: 1rem;
//   border: none;
//   cursor: pointer;
//   box-shadow: 0 4px 16px rgba(236, 72, 153, 0.25);
//   transition: all 0.3s ease;
//   margin-top: 8px;

//   &:hover {
//     opacity: 0.92;
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(236, 72, 153, 0.35);
//   }

//   &:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//     transform: none;
//   }
// `;

// export default function ContactUsPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('/api/send-contact-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         Swal.fire({
//           title: "Message Sent Successfully!",
//           text: "Thank you for connecting with Kingsword Couture. We appreciate your interest and are dedicated to delivering exceptional craftsmanship and service, ensuring a lasting and meaningful relationship with every customer.",
//           icon: "success",
//           confirmButtonText: "Done",
//           confirmButtonColor: "#ec4899",
//           background: "#ffffff",
//           color: "#0f172a"
//         });
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           message: ""
//         });
//       } else {
//         throw new Error(data.error || 'Failed to send message.');
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       Swal.fire({
//         title: "Error!",
//         text: "Something went wrong while sending your message. Please try again later.",
//         icon: "error",
//         confirmButtonText: "Okay",
//         confirmButtonColor: "#ec4899",
//         background: "#ffffff",
//         color: "#0f172a"
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <ContactPageWrapper>
//       {/* Page Header */}
//       <HeaderContainer>
//         <Badge>
//           <Sparkles className="w-4 h-4 text-pink-600" />
//           <span>Get In Touch With Us</span>
//         </Badge>
//         <MainTitle>
//           Contact <HighlightSpan>Us</HighlightSpan>
//         </MainTitle>
//         <Subtitle>
//           We’d love to hear from you. Whether you have questions, enquiries, custom bag requests, or need assistance with an order, our team is here to help.
//         </Subtitle>
//       </HeaderContainer>

//       {/* Grid Content */}
//       <ContentGrid>
//         {/* Left Column: Image Banner & Contact Details */}
//         <InfoColumn>
//           {/* Unsplash Visual Craft Card */}
//           <ImageShowcaseCard>
//             <img 
//               src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop" 
//               alt="Leather craftsmanship and luxury bags workshop" 
//             />
//             <ImageOverlayText>
//               <div>
//                 <span>Kingsword Atelier</span>
//                 <span>Handcrafted Excellence</span>
//               </div>
//               <ImageBadgeTag>
//                 <Camera className="w-3.5 h-3.5 text-pink-300" />
//                 <span>Showroom</span>
//               </ImageBadgeTag>
//             </ImageOverlayText>
//           </ImageShowcaseCard>

//           {/* Direct Contacts Card */}
//           <InfoCard>
//             <InfoCardTitle>
//               <Building2 />
//               Headquarters & Showroom
//             </InfoCardTitle>

//             <ContactDetailItem>
//               <IconWrapper>
//                 <MapPin />
//               </IconWrapper>
//               <DetailContent>
//                 <span>Location</span>
//                 <span>Oluku/Ugbowo, Benin City, Edo State</span>
//               </DetailContent>
//             </ContactDetailItem>

//             <ContactDetailItem>
//               <IconWrapper>
//                 <Phone />
//               </IconWrapper>
//               <DetailContent>
//                 <span>Direct Line</span>
//                 <span>0813 237 1949</span>
//               </DetailContent>
//             </ContactDetailItem>

//             <ContactDetailItem>
//               <IconWrapper>
//                 <Mail />
//               </IconWrapper>
//               <DetailContent>
//                 <span>Email Support</span>
//                 <span>admin@kingswordcraft.com</span>
//               </DetailContent>
//             </ContactDetailItem>
//           </InfoCard>
//         </InfoColumn>

//         {/* Right Column: Interactive Consultation & Message Form */}
//         <FormColumn>
//           <FormTitle>Send Message</FormTitle>
//           <FormSubtitle>
//             Your information is safe and will only be used to respond to your enquiry.
//           </FormSubtitle>

//           <FormGrid onSubmit={handleSubmit}>
//             <InputGroup>
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//               />
//             </InputGroup>

//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
//               <InputGroup>
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input
//                   type="email"
//                   id="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="name@example.com"
//                 />
//               </InputGroup>

//               <InputGroup>
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   required
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="0813..."
//                 />
//               </InputGroup>
//             </div>

//             <InputGroup>
//               <Label htmlFor="message">Your Message</Label>
//               <TextArea
//                 id="message"
//                 name="message"
//                 required
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Describe your enquiry, custom bag request, or order assistance..."
//               />
//             </InputGroup>

//             <SubmitButton type="submit" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 "Sending Message..."
//               ) : (
//                 <>
//                   <Send className="w-4 h-4" />
//                   Send Message
//                 </>
//               )}
//             </SubmitButton>
//           </FormGrid>
//         </FormColumn>
//       </ContentGrid>
//     </ContactPageWrapper>
//   );
// }





"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Sparkles, 
  Building2,
  Camera
} from "lucide-react";
import Swal from "sweetalert2";

// --- ENITZ GLOBAL THEME & STYLES ---
const brandCyan = '#00aeef';
const brandDarkNavy = '#0b1b48';
const brandGradient = 'linear-gradient(135deg, #00aeef 0%, #0b1b48 100%)';

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const ContactPageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  color: #0f172a;
  padding: 40px 20px 80px 20px;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 60px 40px 100px 40px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 10% 20%, rgba(0, 174, 239, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(11, 27, 72, 0.05) 0%, transparent 40%);
    pointer-events: none;
    z-index: 1;
  }
`;

const HeaderContainer = styled.div`
  max-width: 50rem;
  margin: 0 auto 40px auto;
  text-align: center;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: rgba(0, 174, 239, 0.08);
  border: 1px solid rgba(0, 174, 239, 0.3);
  color: ${brandCyan};
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 auto;
  animation: ${floatAnimation} 4s ease-in-out infinite;
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  line-height: 1.15;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 3.5rem;
  }
`;

const HighlightSpan = styled.span`
  background: ${brandGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.6;
  margin: 0 auto;
  max-width: 40rem;
`;

const ContentGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  position: relative;
  z-index: 2;

  @media (min-width: 1024px) {
    grid-template-columns: 1.1fr 1fr;
    gap: 40px;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ImageShowcaseCard = styled.div`
  position: relative;
  height: 240px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0.75) 100%);
  }

  @media (min-width: 768px) {
    height: 280px;
  }
`;

const ImageOverlayText = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span:first-child {
      font-size: 0.85rem;
      color: #38bdf8;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    span:last-child {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
    }
  }
`;

const ImageBadgeTag = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const InfoCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${brandCyan};
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0, 174, 239, 0.08);
  }
`;

const InfoCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: ${brandCyan};
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ContactDetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background: rgba(0, 174, 239, 0.08);
  color: ${brandCyan};
  flex-shrink: 0;
  border: 1px solid rgba(0, 174, 239, 0.2);

  svg {
    width: 1.15rem;
    height: 1.15rem;
  }
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 0.8rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  span:last-child {
    font-size: 1rem;
    color: #334155;
    font-weight: 500;
  }
`;

const FormColumn = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.05);

  @media (min-width: 640px) {
    padding: 40px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
`;

const FormSubtitle = styled.p`
  font-size: 0.95rem;
  color: #475569;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const FormGrid = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: #f8fafc !important;
  color: #0f172a !important;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: ${brandCyan};
    background-color: #ffffff !important;
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: #f8fafc !important;
  color: #0f172a !important;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  outline: none;
  min-height: 140px;
  resize: vertical;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: ${brandCyan};
    background-color: #ffffff !important;
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: 12px;
  background: ${brandGradient};
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 174, 239, 0.25);
  transition: all 0.3s ease;
  margin-top: 8px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 174, 239, 0.35);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Message Sent Successfully!",
          text: "Thank you for connecting with Enitz Global Limited. We appreciate your interest and are dedicated to delivering exceptional merchandise and service, ensuring a lasting and meaningful relationship with every customer.",
          icon: "success",
          confirmButtonText: "Done",
          confirmButtonColor: "#00aeef",
          background: "#ffffff",
          color: "#0f172a"
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        throw new Error(data.error || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while sending your message. Please try again later.",
        icon: "error",
        confirmButtonText: "Okay",
        confirmButtonColor: "#00aeef",
        background: "#ffffff",
        color: "#0f172a"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactPageWrapper>
      {/* Page Header */}
      <HeaderContainer>
        <Badge>
          <Sparkles className="w-4 h-4 text-cyan-500" />
          <span>Get In Touch With Us</span>
        </Badge>
        <MainTitle>
          Contact <HighlightSpan>Us</HighlightSpan>
        </MainTitle>
        <Subtitle>
          We’d love to hear from you. Whether you have questions, enquiries, or need assistance with an order, our support team is here to help.
        </Subtitle>
      </HeaderContainer>

      {/* Grid Content */}
      <ContentGrid>
        {/* Left Column: Image Banner & Contact Details */}
        <InfoColumn>
          {/* Visual Showcase Card */}
          <ImageShowcaseCard>
            <img 
              src="./contact.png" 
              alt="Customer support and retail showroom excellence" 
            />
            <ImageOverlayText>
              <div>
                <span>Enitz Global</span>
                <span>Customer Support Center</span>
              </div>
              <ImageBadgeTag>
                <Camera className="w-3.5 h-3.5 text-cyan-300" />
                <span>HQ</span>
              </ImageBadgeTag>
            </ImageOverlayText>
          </ImageShowcaseCard>

          {/* Direct Contacts Card */}
          <InfoCard>
            <InfoCardTitle>
              <Building2 />
              Headquarters & Showroom
            </InfoCardTitle>

            <ContactDetailItem>
              <IconWrapper>
                <MapPin />
              </IconWrapper>
              <DetailContent>
                <span>Location</span>
                <span>116 Mushin Road, Isolo, Lagos, Nigeria</span>
              </DetailContent>
            </ContactDetailItem>
<ContactDetailItem as="a" href="tel:09047103037" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <IconWrapper>
                <Phone />
              </IconWrapper>
              <DetailContent>
                <span>Direct Line</span>
                <span>09047103037 / 08160801538</span>
              </DetailContent>
            </ContactDetailItem>

            <ContactDetailItem as="a" href="mailto:enitzglobal@gmail.com" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <IconWrapper>
                <Mail />
              </IconWrapper>
              <DetailContent>
                <span>Email Support</span>
                <span>enitzglobal@gmail.com</span>
              </DetailContent>
            </ContactDetailItem>
            
          </InfoCard>
        </InfoColumn>

        {/* Right Column: Interactive Consultation & Message Form */}
        <FormColumn>
          <FormTitle>Send Message</FormTitle>
          <FormSubtitle>
            Your information is safe and will only be used to respond to your enquiry.
          </FormSubtitle>

          <FormGrid onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </InputGroup>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <InputGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0813..."
                />
              </InputGroup>
            </div>

            <InputGroup>
              <Label htmlFor="message">Your Message</Label>
              <TextArea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your enquiry, product question, or order assistance..."
              />
            </InputGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                "Sending Message..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </SubmitButton>
          </FormGrid>
        </FormColumn>
      </ContentGrid>
    </ContactPageWrapper>
  );
}