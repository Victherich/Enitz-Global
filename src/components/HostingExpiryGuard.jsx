import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore'; 
import { db } from '../firebaseConfig'; // Adjust path as necessary
import Swal from 'sweetalert2';
import { useRouter, usePathname } from 'next/navigation'; // Updated for Next.js

// Keyframes for a subtle fade-in of the overlay
const fadeInOverlay = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled component for the full-page overlay
const ExpiredOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.98);
  color: white;
  z-index: 9999999999999999999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  animation: ${fadeInOverlay} 1s ease-out forwards;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #4A90E2;
    color: white;
    font-size: 1.1rem;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #357ABD;
  }
  
  h1 {
    font-size: 4rem;
    margin-bottom: 20px;
    color: #e74c3c;
    text-shadow: 0px 0px 15px rgba(231, 76, 60, 0.5);
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #f0f0f0;
  }

  strong {
    color: #f1c40f;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.1rem;
    }
    button {
      font-size: 1.0rem;
      padding: 8px 15px;
    }
  }
`;

const HostingExpiryGuard = () => {
  const [isWebsiteExpired, setIsWebsiteExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const pathname = usePathname();

  const checkWebsiteExpiry = async () => {
    setLoading(true);
    setError(null);

    try {
      const qs = await getDocs(collection(db, 'hostings'));
      const hostings = qs.docs.map(d => ({ id: d.id, ...d.data() }));

      const now = new Date();
      now.setHours(0, 0, 0, 0);

      let anyHostingIsExpired = false;
      const batch = writeBatch(db);
      let updatesCount = 0;

      for (const item of hostings) {
        if (item.expiry_date && item.expiry_date.toDate) {
          const expiryDateJS = item.expiry_date.toDate();
          expiryDateJS.setHours(0, 0, 0, 0);

          if (expiryDateJS < now && item.status !== 'expired') {
            const hostingRef = doc(db, 'hostings', item.id);
            batch.update(hostingRef, { status: 'expired' });
            updatesCount++;
          }

          if (expiryDateJS < now) {
            anyHostingIsExpired = true;
          }
        }
      }
      
      if (updatesCount > 0) {
        await batch.commit();
      }

      setIsWebsiteExpired(anyHostingIsExpired);

    } catch (err) {
      console.error("Error checking or updating website expiry:", err);
      setError("Failed to verify website status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkWebsiteExpiry();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      checkWebsiteExpiry();
    }, 5 * 60 * 1000);

    return () => clearInterval(id);
  }, []);

  if (loading) {
    return null;
  }

  const shouldShowOverlay =
    isWebsiteExpired &&
    pathname !== '/dashboard' &&
    pathname !== '/dashboard/hostinglist' &&
    pathname !== '/login';

  if (shouldShowOverlay) {
    return (
      <ExpiredOverlay>
        <h1>Website Expired</h1>
        <p>This website&apos;s hosting plan has expired.</p>
        <p>Please if this website belongs to you, click on the renew hosting button to renew your hosting plan.</p>
        <p>You can also contact support for assistance</p>
        <p><strong>echobyteconcept@gmail.com</strong></p>
        <p>Thank you for your understanding.</p>
        <button onClick={() => router.push('/dashboard')}>Renew hosting</button>
      </ExpiredOverlay>
    );
  }

  return null;
};

export default HostingExpiryGuard;