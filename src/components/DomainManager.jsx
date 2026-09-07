


// "use client";

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Globe, Plus, Trash2, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";

// const Wrapper = styled.div`
//   max-width: 850px;
//   margin: 2rem auto;
//   padding: 2rem;
//   background: #ffffff;
//   border-radius: 1rem;
//   box-shadow: 0 4px 20px rgba(0,0,0,0.05);
//   border: 1px solid rgba(226, 232, 240, 0.9);

//   h3 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; }
//   p { color: #475569; font-size: 0.95rem; margin-bottom: 1.5rem; }
// `;

// const Form = styled.form`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 2rem;

//   input {
//     flex: 1;
//     padding: 0.75rem 1rem;
//     border: 1px solid #cbd5e1;
//     border-radius: 0.5rem;
//     font-size: 1rem;
//     outline: none;
//     &:focus { border-color: #00aeef; }
//   }

//   button {
//     padding: 0.75rem 1.5rem;
//     background: linear-gradient(135deg, #00aeef 0%, #0b1b48 100%);
//     color: #fff;
//     border: none;
//     border-radius: 0.5rem;
//     font-weight: 700;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     &:disabled { opacity: 0.6; }
//   }
// `;

// const DomainItemCard = styled.div`
//   background: #f8fafc;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.75rem;
//   padding: 1.25rem;
//   margin-bottom: 1rem;

//   .top-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;

//     .info {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//       span { font-weight: 700; color: #0f172a; font-size: 1.05rem; }
//     }

//     .actions {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;

//       .status-badge {
//         display: inline-flex;
//         align-items: center;
//         gap: 0.35rem;
//         font-size: 0.8rem;
//         font-weight: 700;
//         padding: 0.25rem 0.75rem;
//         border-radius: 9999px;

//         &.verified { background: #dcfce7; color: #166534; }
//         &.pending { background: #fef9c3; color: #854d0e; }
//       }

//       button {
//         background: #fee2e2;
//         color: #ef4444;
//         border: none;
//         padding: 0.5rem 0.75rem;
//         border-radius: 0.5rem;
//         font-weight: 600;
//         cursor: pointer;
//         display: flex;
//         align-items: center;
//         gap: 0.3rem;
//         &:hover { background: #fecaca; }
//       }
//     }
//   }
// `;

// const DnsInstructionsBox = styled.div`
//   margin-top: 1rem;
//   background: #eff6ff;
//   border: 1px solid #bfdbfe;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   font-size: 0.88rem;
//   color: #1e3a8a;

//   p { margin-bottom: 0.5rem; font-weight: 600; }

//   table {
//     width: 100%;
//     margin-top: 0.5rem;
//     border-collapse: collapse;
//     font-size: 0.85rem;

//     th, td {
//       text-align: left;
//       padding: 0.4rem 0.6rem;
//       border-bottom: 1px solid #dbeafe;
//     }

//     th { color: #1e40af; font-weight: 700; }
//   }
// `;

// export default function AdvancedDomainManager() {
//   const [domains, setDomains] = useState([]);
//   const [domainInput, setDomainInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch domains on component mount
//   const fetchDomains = async () => {
//     try {
//       const res = await fetch("/api/domains");
//       const data = await res.json();
//       if (res.ok) setDomains(data.domains || []);
//     } catch (err) {
//       console.error("Failed to load domains");
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchDomains();
//   }, []);

//   const handleAddDomain = async (e) => {
//     e.preventDefault();
//     if (!domainInput.trim()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/domains", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ domain: domainInput.trim().toLowerCase() }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to add domain");

//       setDomainInput("");
//       fetchDomains(); // Refresh list
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveDomain = async (domainName) => {
//     if (!confirm(`Are you sure you want to remove ${domainName}?`)) return;

//     try {
//       const res = await fetch(`/api/domains/${domainName}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete domain");
//       setDomains(domains.filter((d) => d.name !== domainName));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <Wrapper>
//       <h3>Custom Domain Manager</h3>
//       <p>Add your custom domain name and configure your DNS settings at your registrar.</p>

//       <Form onSubmit={handleAddDomain}>
//         <input
//           type="text"
//           placeholder="e.g. mybrand.com"
//           value={domainInput}
//           onChange={(e) => setDomainInput(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           <Plus className="w-4 h-4" /> {loading ? "Adding..." : "Add Domain"}
//         </button>
//       </Form>

//       {error && <div style={{ color: "#ef4444", marginBottom: "1rem" }}>{error}</div>}

//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
//         <h4 style={{ color: "#0f172a" }}>Connected Domains</h4>
//         <button 
//           onClick={fetchDomains} 
//           style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", color: "#475569", fontSize: "0.85rem" }}
//         >
//           <RefreshCw className="w-3.5 h-3.5" /> Refresh Status
//         </button>
//       </div>

//       {fetching ? (
//         <p style={{ color: "#94a3b8" }}>Loading domains...</p>
//       ) : domains.length === 0 ? (
//         <p style={{ color: "#94a3b8" }}>No domains added yet.</p>
//       ) : (
//         domains.map((d) => {
//           const isApex = !d.name.startsWith("www.");
//           const isVerified = !d.misconfigured;

//           return (
//             <DomainItemCard key={d.name}>
//               <div className="top-row">
//                 <div className="info">
//                   <Globe className="w-5 h-5 text-cyan-500" />
//                   <span>{d.name}</span>
//                 </div>
//                 <div className="actions">
//                   <span className={`status-badge ${isVerified ? "verified" : "pending"}`}>
//                     {isVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
//                     {isVerified ? "Active & Verified" : "DNS Setup Required"}
//                   </span>
//                   <button onClick={() => handleRemoveDomain(d.name)}>
//                     <Trash2 className="w-4 h-4" /> Remove
//                   </button>
//                 </div>
//               </div>

//               {!isVerified && (
//                 <DnsInstructionsBox>
//                   <p>Add the following DNS record inside your domain registrar account (e.g., Namecheap, GoDaddy, Cloudflare):</p>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Type</th>
//                         <th>Name / Host</th>
//                         <th>Value / Target</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td><strong>{isApex ? "A" : "CNAME"}</strong></td>
//                         <td><strong>{isApex ? "@" : d.name.split(".")[0]}</strong></td>
//                         <td><strong>{isApex ? "76.76.21.21" : "cname.vercel-dns.com"}</strong></td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </DnsInstructionsBox>
//               )}
//             </DomainItemCard>
//           );
//         })
//       )}
//     </Wrapper>
//   );
// }






"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Globe, Plus, Trash2, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";

const Wrapper = styled.div`
  max-width: 850px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid rgba(226, 232, 240, 0.9);

  h3 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; }
  p { color: #475569; font-size: 0.95rem; margin-bottom: 1.5rem; }
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
    font-size: 1rem;
    outline: none;
    &:focus { border-color: #00aeef; }
  }

  button {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #00aeef 0%, #0b1b48 100%);
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:disabled { opacity: 0.6; }
  }
`;

const DomainItemCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1rem;

  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      span { font-weight: 700; color: #0f172a; font-size: 1.05rem; }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.8rem;
        font-weight: 700;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;

        &.verified { background: #dcfce7; color: #166534; }
        &.pending { background: #fee2e2; color: #991b1b; }
      }

      button {
        background: #fee2e2;
        color: #ef4444;
        border: none;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        &:hover { background: #fecaca; }
      }
    }
  }
`;

const DnsInstructionsBox = styled.div`
  margin-top: 1rem;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.88rem;
  color: #9b2c2c;

  p { margin-bottom: 0.5rem; font-weight: 600; color: #c53030; }

  table {
    width: 100%;
    margin-top: 0.5rem;
    border-collapse: collapse;
    font-size: 0.85rem;

    th, td {
      text-align: left;
      padding: 0.5rem 0.6rem;
      border-bottom: 1px solid #feb2b2;
      word-break: break-all;
    }

    th { color: #9b2c2c; font-weight: 700; }
  }
`;

export default function DomainManagerWithRecords() {
  const [domains, setDomains] = useState([]);
  const [domainInput, setDomainInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const loadAndVerifyDomains = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/domains");
      const data = await res.json();
      
      if (res.ok && data.domains) {
        const updatedList = await Promise.all(
          data.domains.map(async (d) => {
            try {
              const verifyRes = await fetch(`/api/domains/${d.name}`, { method: "POST" });
              const verifyData = await verifyRes.json();
              // Vercel returns the domain object either in verifyData.domainInfo or directly
              return verifyData.domainInfo?.name ? verifyData.domainInfo : d;
            } catch (err) {
              return d;
            }
          })
        );
        setDomains(updatedList);
      }
    } catch (err) {
      console.error("Failed to fetch domains");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadAndVerifyDomains();
  }, []);

  const handleAddDomain = async (e) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domainInput.trim().toLowerCase() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add domain");

      setDomainInput("");
      loadAndVerifyDomains();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDomain = async (domainName) => {
    if (!confirm(`Are you sure you want to remove ${domainName}?`)) return;

    try {
      const res = await fetch(`/api/domains/${domainName}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete domain");
      setDomains(domains.filter((d) => d.name !== domainName));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Wrapper>
      <h3>Custom Domain Manager</h3>
      <p>Add your domain and view precise DNS records required for activation.</p>

      <Form onSubmit={handleAddDomain}>
        <input
          type="text"
          placeholder="e.g. clientdomain.com"
          value={domainInput}
          onChange={(e) => setDomainInput(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          <Plus className="w-4 h-4" /> {loading ? "Adding..." : "Add Domain"}
        </button>
      </Form>

      {error && <div style={{ color: "#ef4444", marginBottom: "1rem" }}>{error}</div>}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h4 style={{ color: "#0f172a" }}>Connected Domains</h4>
        <button 
          onClick={loadAndVerifyDomains} 
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", color: "#475569", fontSize: "0.85rem", fontWeight: 600 }}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${fetching ? "animate-spin" : ""}`} /> Refresh Status
        </button>
      </div>

      {fetching ? (
        <p style={{ color: "#94a3b8" }}>Syncing domain records with Vercel...</p>
      ) : domains.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>No domains added yet.</p>
      ) : (
        domains.map((d) => {
          const isVerified = !d.misconfigured;

          return (
            <DomainItemCard key={d.name}>
              <div className="top-row">
                <div className="info">
                  <Globe className="w-5 h-5 text-cyan-500" />
                  <span>{d.name}</span>
                </div>
                <div className="actions">
                  <span className={`status-badge ${isVerified ? "verified" : "pending"}`}>
                    {isVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {isVerified ? "Active & Verified" : "Invalid Configuration"}
                  </span>
                  <button onClick={() => handleRemoveDomain(d.name)}>
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>

              {!isVerified && (
                <DnsInstructionsBox>
                  <p>⚠️ Vercel requires the following DNS records to be set up at your domain registrar:</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Name / Host</th>
                        <th>Value / Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* If Vercel provides a specific verification array, render it dynamically */}
                      {d.verification && d.verification.length > 0 ? (
                        d.verification.map((v, idx) => (
                          <tr key={idx}>
                            <td><strong>{v.type}</strong></td>
                            <td><strong>{v.domain || v.name || "@"}</strong></td>
                            <td><strong>{v.value}</strong></td>
                          </tr>
                        ))
                      ) : (
                        /* Fallback standard records if array is empty */
                        <>
                          <tr>
                            <td><strong>{d.name.startsWith("www.") ? "CNAME" : "A"}</strong></td>
                            <td><strong>{d.name.startsWith("www.") ? "www" : "@"}</strong></td>
                            <td><strong>{d.name.startsWith("www.") ? "cname.vercel-dns.com" : "76.76.21.21"}</strong></td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </DnsInstructionsBox>
              )}
            </DomainItemCard>
          );
        })
      )}
    </Wrapper>
  );
}