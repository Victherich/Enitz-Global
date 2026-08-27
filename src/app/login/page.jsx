




// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/firebaseConfig";

// // 🎨 KINGSWORD CRAFT THEME COLORS (Vibrant Luxury & Modern Palette)
// const PrimaryPink = "#ec4899";
// const AccentGold = "#f59e0b";
// const AccentCyan = "#06b6d4";
// const Dark = "#0f172a";
// const Border = "rgba(226, 232, 240, 0.9)";
// const White = "#ffffff";
// const LightBg = "#f8fafc";
// const TextMuted = "#475569";
// const ThemeGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";

// // 🌟 Styled Components (Strict max 10px spacing/gaps/margins/padding rule)
// const PageContainer = styled.div`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: ${LightBg};
//   padding: 10px;
//   box-sizing: border-box;
// `;

// const AuthWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   width: 100%;
//   max-width: 1000px;
//   background: ${White};
//   border-radius: 10px;
//   border: 1px solid ${Border};
//   box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
//   overflow: hidden;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const BrandingSide = styled.div`
//   background: ${ThemeGradient};
//   color: ${White};
//   padding: 10px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   position: relative;
//   overflow: hidden;

//   &::after {
//     content: "";
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(135deg, rgba(15, 23, 42, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%);
//     z-index: 1;
//   }
// `;

// const BrandingContent = styled.div`
//   position: relative;
//   z-index: 2;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin: auto 0;
// `;

// const BrandLogo = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 800;
//   letter-spacing: -0.5px;
//   color: ${White};
//   margin: 0;

//   span {
//     color: ${AccentGold};
//   }
// `;

// const Headline = styled.h1`
//   font-size: clamp(1.8rem, 3vw, 2.4rem);
//   font-weight: 800;
//   line-height: 1.2;
//   letter-spacing: -0.5px;
//   margin: 0;
// `;

// const Subtext = styled.p`
//   font-size: 0.95rem;
//   line-height: 1.6;
//   color: #f8fafc;
//   opacity: 0.95;
//   margin: 0;
// `;

// const FormSide = styled.div`
//   padding: 10px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   color: ${TextMuted};
//   box-sizing: border-box;
// `;

// const FormHeader = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin-bottom: 10px;
// `;

// const Title = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 800;
//   margin: 0;
//   background: ${ThemeGradient};
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   text-align: left;
// `;

// const FormGrid = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const InputGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   margin: 0;
// `;

// const Label = styled.label`
//   font-size: 0.85rem;
//   font-weight: 700;
//   color: ${TextMuted};
//   text-align: left;
//   margin: 0;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 8px 10px;
//   border: 1px solid ${Border};
//   border-radius: 6px;
//   font-size: 0.9rem;
//   background: ${White};
//   color: ${Dark};
//   outline: none;
//   box-sizing: border-box;
//   margin: 0;
//   box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02);

//   &:focus {
//     border-color: ${PrimaryPink};
//     box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
//   }
// `;

// const PasswordWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   margin: 0;
// `;

// const EyeButton = styled.button`
//   position: absolute;
//   right: 10px;
//   top: 50%;
//   transform: translateY(-50%);
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   font-size: 0.8rem;
//   color: #db2777;
//   font-weight: 700;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   background: ${ThemeGradient};
//   color: ${White};
//   padding: 10px;
//   font-size: 0.95rem;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 700;
//   box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
//   transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
//   margin: 0;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 6px 20px rgba(236, 72, 153, 0.45);
//   }
// `;

// const LinkText = styled.p`
//   margin: 5px 0 0 0;
//   cursor: pointer;
//   color: ${TextMuted};
//   font-size: 0.9rem;
//   text-align: center;

//   span {
//     color: #db2777;
//     font-weight: 700;

//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// const LoadingContainer = styled.div`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: ${LightBg};
//   color: ${Dark};
//   font-size: 1.1rem;
//   font-weight: 600;
//   padding: 10px;
//   box-sizing: border-box;
// `;

// // ✨ LOGIN COMPONENT
// export default function UserLogin() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false);
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "Please wait...",
//       text: "Logging in...",
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       const { email, password } = form;
//       await signInWithEmailAndPassword(auth, email, password);
//       Swal.fire("Success ✅", "Logged in successfully", "success");
//       router.push("/dashboard");
//     } catch (error) {
//       Swal.fire("Login Failed ❌", error.message, "error");
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setAuthenticated(!!user);
//       setLoading(false);
//       if (user) router.push("/dashboard");
//     });

//     return () => unsubscribe();
//   }, [router]);

//   if (loading) return <LoadingContainer>Loading...</LoadingContainer>;

//   return (
//     <PageContainer>
//       <AuthWrapper>
//         {/* Left Visual Branding Panel */}
//         <BrandingSide>
//           <BrandLogo>
//             KINGSWORD CRAFT
//           </BrandLogo>
//           <BrandingContent>
//             <Headline>Welcome Back</Headline>
//             <Subtext>
//               Log in to access your dashboard, manage items, and experience modern shopping.
//             </Subtext>
//           </BrandingContent>
//           <div />
//         </BrandingSide>

//         {/* Right Form Panel */}
//         <FormSide>
//           <FormHeader>
//             <Title>Login</Title>
//           </FormHeader>

//           <form onSubmit={handleSubmit}>
//             <FormGrid>
//               <InputGroup>
//                 <Label>Email Address</Label>
//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="john@example.com"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </InputGroup>

//               <InputGroup>
//                 <Label>Password</Label>
//                 <PasswordWrapper>
//                   <Input
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     value={form.password}
//                     onChange={handleChange}
//                     required
//                   />
//                   <EyeButton type="button" onClick={() => setShowPassword((prev) => !prev)}>
//                     {showPassword ? "Hide" : "Show"}
//                   </EyeButton>
//                 </PasswordWrapper>
//               </InputGroup>

//               <Button type="submit">Login</Button>

//               <LinkText onClick={() => router.push("/signup")}>
//                 Don't have an account? <span>Sign Up</span>
//               </LinkText>

//               <LinkText onClick={() => router.push("/forgot-password")}>
//                 <span>Forgot Password</span>
//               </LinkText>
//             </FormGrid>
//           </form>
//         </FormSide>
//       </AuthWrapper>
//     </PageContainer>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

// 🎨 ENITZ GLOBAL BRAND THEME COLORS
const PrimaryNavy = "#0B1B48";
const PrimaryCyan = "#00AEEF";
const Dark = "#0f172a";
const Border = "#cbd5e1";
const White = "#ffffff";
const LightBg = "#f8fafc";
const TextMuted = "#475569";
const ThemeGradient = "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";

// 🌟 Styled Components (Clean, Professional Spacing)
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${LightBg};
  padding: 24px 16px;
  box-sizing: border-box;
`;

const AuthWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1000px;
  background: ${White};
  border-radius: 20px;
  border: 1px solid ${Border};
  box-shadow: 0 12px 30px rgba(11, 27, 72, 0.08);
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BrandingSide = styled.div`
  background: ${ThemeGradient};
  color: ${White};
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(11, 27, 72, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%);
    z-index: 1;
  }
`;

const BrandingContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: auto 0;
`;

const BrandLogo = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: ${White};
  margin: 0;
  position: relative;
  z-index: 2;

  span {
    color: ${PrimaryCyan};
  }
`;

const Headline = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.5px;
  margin: 0;
`;

const Subtext = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #f8fafc;
  opacity: 0.95;
  margin: 0;
`;

const FormSide = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${TextMuted};
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  color: ${PrimaryNavy};
  text-align: left;
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${TextMuted};
  text-align: left;
  margin: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${Border};
  border-radius: 10px;
  font-size: 0.95rem;
  background: ${White};
  color: ${Dark};
  outline: none;
  box-sizing: border-box;
  margin: 0;
  box-shadow: 0 2px 6px rgba(11, 27, 72, 0.02);
  transition: all 0.2s ease;

  &:focus {
    border-color: ${PrimaryCyan};
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  color: ${PrimaryCyan};
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 100%;
  background: ${ThemeGradient};
  color: ${White};
  padding: 14px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(0, 174, 239, 0.3);
  transition: all 0.3s ease;
  margin-top: 4px;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 174, 239, 0.45);
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
  text-align: center;
`;

const LinkText = styled.p`
  margin: 0;
  cursor: pointer;
  color: ${TextMuted};
  font-size: 0.9rem;

  span {
    color: ${PrimaryCyan};
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${LightBg};
  color: ${Dark};
  font-size: 1.1rem;
  font-weight: 600;
  padding: 24px;
  box-sizing: border-box;
`;

// ✨ LOGIN COMPONENT
export default function UserLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Please wait...",
      text: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const { email, password } = form;
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Success ✅", "Logged in successfully", "success");
      router.push("/dashboard");
    } catch (error) {
      Swal.fire("Login Failed ❌", error.message, "error");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      setLoading(false);
      if (user) router.push("/dashboard");
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <LoadingContainer>Loading...</LoadingContainer>;

  return (
    <PageContainer>
      <AuthWrapper>
        {/* Left Visual Branding Panel */}
        <BrandingSide>
          <BrandLogo>
            ENITZ <span>GLOBAL</span>
          </BrandLogo>
          <BrandingContent>
            <Headline>Welcome Back</Headline>
            <Subtext>
              Log in to access your dashboard, manage items, and experience modern transactions.
            </Subtext>
          </BrandingContent>
          <div />
        </BrandingSide>

        {/* Right Form Panel */}
        <FormSide>
          <FormHeader>
            <Title>Login</Title>
          </FormHeader>

          <form onSubmit={handleSubmit}>
            <FormGrid>
              <InputGroup>
                <Label>Email Address</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <PasswordWrapper>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <EyeButton type="button" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? "Hide" : "Show"}
                  </EyeButton>
                </PasswordWrapper>
              </InputGroup>

              <Button type="submit">Login</Button>

              <LinkContainer>
                <LinkText onClick={() => router.push("/signup")}>
                  Don't have an account? <span>Sign Up</span>
                </LinkText>

                <LinkText onClick={() => router.push("/forgot-password")}>
                  <span>Forgot Password</span>
                </LinkText>
              </LinkContainer>
            </FormGrid>
          </form>
        </FormSide>
      </AuthWrapper>
    </PageContainer>
  );
}