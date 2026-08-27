


// "use client";

// import styled from "styled-components";
// import Link from "next/link";
// import Image from "next/image";

// /* ================= COLORS (KINGSWORD BAG CRAFT THEME) ================= */

// const ThemeGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";
// const Dark = "#0f172a";
// const Border = "#334155";
// const White = "#ffffff";
// const TextMuted = "#94a3b8";
// const PinkAccent = "#ec4899";
// const CyanAccent = "#06b6d4";

// /* ================= FOOTER STYLES ================= */

// const FooterContainer = styled.footer`
//   background: ${Dark};
//   color: ${White};
//   border-top: 1px solid ${Border};
//   font-family: inherit;
//   position: relative;
// `;

// const FooterInner = styled.div`
//   max-width: 1200px;
//   margin: auto;
//   padding: 3rem 1.5rem 1.5rem 1.5rem;

//   display: grid;
//   grid-template-columns: 2fr 1fr 1fr 1.5fr;
//   gap: 2rem;

//   @media (max-width: 968px) {
//     grid-template-columns: 1fr 1fr;
//     gap: 2rem;
//   }

//   @media (max-width: 576px) {
//     grid-template-columns: 1fr;
//     gap: 2rem;
//   }
// `;

// const FooterCol = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const Logo = styled.div`
//   font-size: 1.4rem;
//   font-weight: 800;
//   color: ${White};
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   span {
//     background: ${ThemeGradient};
//     background-size: 200% auto;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;

// const FooterText = styled.p`
//   color: ${TextMuted};
//   font-size: 0.95rem;
//   line-height: 1.7;
// `;

// const ColTitle = styled.h4`
//   font-size: 1.1rem;
//   font-weight: 700;
//   color: ${White};
//   letter-spacing: 0.05em;
//   text-transform: uppercase;
//   margin-bottom: 0.25rem;
// `;

// const FooterLink = styled(Link)`
//   color: ${TextMuted};
//   text-decoration: none;
//   font-size: 0.95rem;
//   transition: all 0.2s ease;
//   width: fit-content;

//   &:hover {
//     color: ${PinkAccent};
//     padding-left: 4px;
//   }
// `;

// const ContactInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
//   color: ${TextMuted};
//   font-size: 0.95rem;

//   p {
//     margin: 0;
//     line-height: 1.5;
//   }

//   span {
//     color: ${White};
//   }
// `;

// const SocialIconsContainer = styled.div`
//   display: flex;
//   gap: 12px;
//   margin-top: 0.5rem;
// `;

// const SocialIconLink = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background: #1e293b;
//   border: 1px solid ${Border};
//   color: ${TextMuted};
//   transition: all 0.3s ease;

//   &:hover {
//     background: ${ThemeGradient};
//     color: ${White};
//     border-color: transparent;
//     transform: translateY(-3px);
//   }

//   svg {
//     width: 18px;
//     height: 18px;
//     fill: currentColor;
//   }
// `;

// const BottomBarWrapper = styled.div`
//   max-width: 1200px;
//   margin: auto;
//   padding: 0 1.5rem;
// `;

// const BottomBar = styled.div`
//   padding: 2rem 0;
//   border-top: 1px solid ${Border};

//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 1rem;
//     text-align: center;
//   }
// `;

// const Copyright = styled.p`
//   color: ${TextMuted};
//   font-size: 0.85rem;
//   margin: 0;
// `;

// const LegalLinks = styled.div`
//   display: flex;
//   gap: 1.5rem;

//   a {
//     color: ${TextMuted};
//     text-decoration: none;
//     font-size: 0.85rem;
//     transition: color 0.2s ease;

//     &:hover {
//       color: ${White};
//     }
//   }
// `;

// /* ================= FLOATING WHATSAPP ================= */

// const WhatsAppFloat = styled.a`
//   position: fixed;
//   bottom: 2rem;
//   right: 2rem;
//   z-index: 300;
//   background-color: #25d366;
//   color: white;
//   width: 55px;
//   height: 55px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: scale(1.1);
//     box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
//   }
// `;

// /* ================= COMPONENT ================= */

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <>
//       <FooterContainer>
//         <FooterInner>
//           {/* Col 1: Brand Info */}
//           <FooterCol>
//             <Link href="/" style={{ textDecoration: 'none' }}>
//             <img src='./logo1.png' alt='logo' style={{width:'100px'}}/>
//               <Logo>
//                 KINGSWORD <span>BAG CRAFT</span>
//               </Logo>
//             </Link>
//             <FooterText>
//               Blending rich African heritage and modern everyday elegance into exquisite, handcrafted statement bags built to empower your style.
//             </FooterText>
//           </FooterCol>

//           {/* Col 2: Quick Links */}
//           <FooterCol>
//             <ColTitle>Quick Links</ColTitle>
//             <FooterLink href="/">Home</FooterLink>
//             <FooterLink href="/about">Our Artisan Story</FooterLink>
//             <FooterLink href="/services">Services</FooterLink>
//             <FooterLink href="/store">Shop</FooterLink>
//             <FooterLink href="/pricing">Pricing</FooterLink>
//             <FooterLink href="/contact">Contact Us</FooterLink>
//           </FooterCol>

//           {/* Col 3: Contact & Support */}
//           <FooterCol>
//             <ColTitle>Get in Touch</ColTitle>
//             <ContactInfo>
//               <p>Email: <span>admin@kingswordcraft.com</span></p>
//               <p>Phone: <span>+234 813 237 1949</span></p>
//               <p>Location: <span>Oluku/Ugbowo, Benin City, Edo State</span></p>
//             </ContactInfo>
//           </FooterCol>

//           {/* Col 4: Social Media */}
//           <FooterCol>
//             <ColTitle>Connect With Us</ColTitle>
//             <FooterText>
//               Follow us on social media for daily design inspiration and new collection releases.
//             </FooterText>
//             <SocialIconsContainer>
//               {/* Instagram */}
//               <SocialIconLink 
//                 href="https://instagram.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//               >
//                 <svg viewBox="0 0 24 24">
//                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//                 </svg>
//               </SocialIconLink>
//             </SocialIconsContainer>
//           </FooterCol>
//         </FooterInner>

//         {/* Bottom Bar */}
//         <BottomBarWrapper>
//           <BottomBar>
//             <Copyright>
//               &copy; {currentYear} Kingsword Bag Craft. All rights reserved.
//             </Copyright>
//             <LegalLinks>
//               {/* <Link href="/privacy">Privacy Policy</Link> */}
//               {/* <Link href="/terms">Terms of Service</Link> */}
//             </LegalLinks>
//           </BottomBar>
//         </BottomBarWrapper>
//       </FooterContainer>

//       {/* Floating WhatsApp Icon */}
//       <WhatsAppFloat 
//         href="https://wa.me/2348132371949" 
//         target="_blank" 
//         rel="noopener noreferrer"
//         aria-label="Chat on WhatsApp"
//       >
//         <Image
//           src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
//           alt="WhatsApp"
//           width={28}
//           height={28}
//         />
//       </WhatsAppFloat>
//     </>
//   );
// }




"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

/* ================= COLORS (ENITZ GLOBAL THEME) ================= */

const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";
const Dark = "#0f172a";
const Border = "#334155";
const White = "#ffffff";
const TextMuted = "#94a3b8";
const PrimaryAccent = "#00AEEF";

/* ================= FOOTER STYLES ================= */

const FooterContainer = styled.footer`
  background: ${Dark};
  color: ${White};
  border-top: 1px solid ${Border};
  font-family: inherit;
  position: relative;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 3rem 1.5rem 1.5rem 1.5rem;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  color: ${White};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    background: ${ThemeGradient};
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterText = styled.p`
  color: ${TextMuted};
  font-size: 0.95rem;
  line-height: 1.7;
`;

const ColTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${White};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`;

const FooterLink = styled(Link)`
  color: ${TextMuted};
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    color: ${PrimaryAccent};
    padding-left: 4px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: ${TextMuted};
  font-size: 0.95rem;

  p {
    margin: 0;
    line-height: 1.5;
  }

  span {
    color: ${White};
  }
`;

const SocialIconsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 0.5rem;
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1e293b;
  border: 1px solid ${Border};
  color: ${TextMuted};
  transition: all 0.3s ease;

  &:hover {
    background: ${ThemeGradient};
    color: ${White};
    border-color: transparent;
    transform: translateY(-3px);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

const BottomBarWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 1.5rem;
`;

const BottomBar = styled.div`
  padding: 2rem 0;
  border-top: 1px solid ${Border};

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${TextMuted};
  font-size: 0.85rem;
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: ${TextMuted};
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s ease;

    fn &:hover {
      color: ${White};
    }
  }
`;

/* ================= FLOATING WHATSAPP ================= */

const WhatsAppFloat = styled.a`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 300;
  background-color: #25d366;
  color: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
  }
`;

/* ================= COMPONENT ================= */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <FooterContainer>
        <FooterInner>
          {/* Col 1: Brand Info */}
          <FooterCol>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img src='./logo.jpeg' alt='Enitz Global Limited Logo' style={{width:'50px', borderRadius:"10px"}}/>
              <Logo>
                ENITZ <span>GLOBAL</span>
              </Logo>
            </Link>
            <FooterText>
              Enitz Global Limited offers quality personal and household products at great prices, making everyday living easy with convenient ordering and delivery.
            </FooterText>
          </FooterCol>

          {/* Col 2: Quick Links */}
          <FooterCol>
            <ColTitle>Quick Links</ColTitle>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/store">Store</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterCol>

          {/* Col 3: Contact & Support */}
          <FooterCol>
            <ColTitle>Get in Touch</ColTitle>
            <ContactInfo>
              <p>Email: <span>enitzglobal@gmail.com</span></p>
              <p>Phone: <span>09047103037 / 08160801538</span></p>
              <p>Location: <span>116 Mushin Road, Isolo, Lagos, Nigeria</span></p>
            </ContactInfo>
          </FooterCol>

          {/* Col 4: Social Media */}
          <FooterCol>
            <ColTitle>Connect With Us</ColTitle>
            <FooterText>
              Follow us on Instagram for updates on new product arrivals and special offers.
            </FooterText>
            <SocialIconsContainer>
              {/* Instagram */}
              <SocialIconLink 
                href="https://www.instagram.com/enitzglobalconcept/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialIconLink>
            </SocialIconsContainer>
          </FooterCol>
        </FooterInner>

        {/* Bottom Bar */}
        <BottomBarWrapper>
          <BottomBar>
            <Copyright>
              &copy; {currentYear} Enitz Global Limited (RC 9059086). All rights reserved.
            </Copyright>
            <LegalLinks>
              {/* Optional Legal Links */}
            </LegalLinks>
          </BottomBar>
        </BottomBarWrapper>
      </FooterContainer>

      {/* Floating WhatsApp Icon */}
      <WhatsAppFloat 
        href="https://wa.me/2349047103037" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          width={28}
          height={28}
        />
      </WhatsAppFloat>
    </>
  );
}