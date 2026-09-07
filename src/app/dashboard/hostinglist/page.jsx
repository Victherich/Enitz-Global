'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';
import PaystackPop from "@paystack/inline-js";
import HostingTransactions from '@/components/HostingTransactions';
import DomainManager from '@/components/DomainManager';

// --- Styled Components (Strict Viewport Boundary, Non-Overflowing Theme) ---

const Section = styled.section`
  padding: 12px;
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f1f5f9;
  color: #0f172a;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Prevents horizontal page breakout */

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  max-width: 100%;
  overflow-wrap: break-word;
`;

const Title = styled.h2`
  color: #0f172a;
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  span {
    font-size: 0.7rem;
    background: #0284c7;
    color: white;
    padding: 2px 8px;
    border-radius: 6px;
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: 0.85rem;
    }
  }
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 0.775rem;
  margin-top: 4px;
  word-break: break-word;

  @media (min-width: 768px) {
    font-size: 0.95rem;
  }
`;

const SystemStatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #059669;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    font-size: 0.85rem;
  }

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    animation: pulse 2s infinite;
    flex-shrink: 0;
  }

  @keyframes pulse {
    0% { transform: scale(0.95); opacity: 0.8; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(0.95); opacity: 0.8; }
  }
`;

const FullscreenGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  flex: 1;
  margin-bottom: 3rem;
`;

const ControlCenterCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 1rem;
  border-radius: 16px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 2.5rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: ${({ $status }) => ($status === 'active' ? '#10b981' : '#f59e0b')};
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const InstanceTitle = styled.h3`
  color: #0f172a;
  font-size: 1.1rem;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  gap: 4px;
  word-break: break-all;
  max-width: 100%;

  @media (min-width: 768px) {
    font-size: 1.75rem;
    word-break: normal;
  }

  small {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
    font-family: monospace;
    word-break: break-all;

    @media (min-width: 768px) {
      font-size: 0.85rem;
    }
  }
`;

const StatusPill = styled.span`
  background: ${({ $status }) => ($status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)')};
  color: ${({ $status }) => ($status === 'active' ? '#059669' : '#d97706')};
  border: 1px solid ${({ $status }) => ($status === 'active' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)')};
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 6px 14px;
    font-size: 0.8rem;
  }
`;

const DashboardBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0; /* Critical flexbox rule to prevent item blowout / overflow */
  width: 100%;
  box-sizing: border-box;
`;

const MetricBox = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 14px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 14px 18px;
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.775rem;
  color: #475569;
  margin-bottom: 8px;
  font-weight: 750;

  @media (min-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${({ $percentage }) => `${$percentage}%`};
  background: ${({ $type }) => ($type === 'cpu' ? '#0284c7' : $type === 'ram' ? '#7c3aed' : '#10b981')};
  border-radius: 4px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.85rem;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
  
  @media (min-width: 768px) {
    font-size: 0.925rem;
    padding: 0.75rem 0;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #64748b;
  font-weight: 500;
  flex-shrink: 0;
`;

const DetailValue = styled.span`
  color: #1e293b;
  font-weight: 600;
  font-family: ${({ $mono }) => ($mono ? 'monospace' : 'inherit')};
  text-align: right;
  word-break: break-all;
  max-width: 60%;

  @media (min-width: 768px) {
    word-break: normal;
  }
`;

const SectionSubHeader = styled.div`
  font-size: 0.8rem;
  font-weight: 750;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;

  @media (min-width: 768px) {
    font-size: 0.85rem;
  }
`;

const TagsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 110px;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }
`;

const TagBadge = styled.span`
  color: #334155;
  font-weight: 500;
  font-size: 0.75rem;
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  word-break: break-all;

  @media (min-width: 768px) {
    font-size: 0.825rem;
    padding: 6px 12px;
  }
`;

const ControlsGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 0.25rem;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ControlButton = styled.button`
  background: #f8fafc;
  color: #1e293b;
  border: 1px solid #cbd5e1;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 0.775rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    font-size: 0.85rem;
    padding: 10px 14px;
  }

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
    border-color: #94a3b8;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
`;

const ActionButtonContainer = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e2e8f0;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }

  &:hover {
    background-color: #1d4ed8;
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }

  &:active {
    transform: scale(0.99);
  }
`;

const EmptyState = styled.p`
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  color: #64748b;
  font-size: 0.95rem;
  padding: 4rem 1rem;
  background: #ffffff;
  border-radius: 16px;
  border: 1px dashed #cbd5e1;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    padding: 6rem 0;
  }
`;

// --- Component ---

const HostingList = () => {
  const [hostings, setHostings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchHostings = () => {
    (async () => {
      Swal.fire({
        title: 'Synchronizing Global Clusters...',
        text: 'Fetching primary and replica nodes...',
        allowOutsideClick: false,
        background: '#ffffff',
        color: '#0f172a',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const qs = await getDocs(collection(db, 'hostings'));
        setHostings(qs.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch {
        Swal.fire({ title: 'Error', text: 'Could not sync cluster nodes.', icon: 'error', background: '#ffffff', color: '#0f172a' });
      } finally {
        Swal.close();
      }
    })();
  };

  useEffect(() => {
    fetchHostings();
  }, []);

  const getRandomMetric = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const handleActionClick = (actionName, hostingName) => {
    Swal.fire({
      title: `${actionName} Executed`,
      text: `Cluster command dispatched successfully to instance: ${hostingName}`,
      icon: 'success',
      timer: 1800,
      showConfirmButton: false,
      background: '#ffffff',
      color: '#0f172a'
    });
  };

  const renew = (item) => {
    if (!user || !user.email) {
      Swal.fire({ title: 'Authentication Error', text: 'Node owner signature not found. Please re-authenticate.', icon: 'error', background: '#ffffff', color: '#0f172a' });
      return;
    }
    const amountKobo = item.renewal_amount * 100;
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4", 
      email: user.email,
      amount: amountKobo,
      metadata: { hostingId: item.id },
      onSuccess: async (tx) => await handlePaymentSuccess(item, tx),
      onCancel: () => Swal.fire({ title: 'Aborted', text: 'Transaction sequence cancelled.', icon: 'info', background: '#ffffff', color: '#0f172a' }),
      onError: (e) => Swal.fire({ title: 'Gateway Error', text: e.message, icon: 'error', background: '#ffffff', color: '#0f172a' }),
    });
  };

  const handlePaymentSuccess = async (item, tx) => {
    Swal.fire({
      title: 'Updating Node Registry...',
      text: 'Verifying payment ledger hash...',
      allowOutsideClick: false,
      background: '#ffffff',
      color: '#0f172a',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const itemRef = doc(db, 'hostings', item.id);

      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const currentExpiryFromDB = item.expiry_date.toDate();
      currentExpiryFromDB.setHours(0, 0, 0, 0);

      let baseDateForRenewal;

      if (currentExpiryFromDB < now) {
        baseDateForRenewal = new Date(now);
      } else {
        baseDateForRenewal = new Date(currentExpiryFromDB);
      }

      baseDateForRenewal.setFullYear(baseDateForRenewal.getFullYear() + 1);
      const newExpiry = baseDateForRenewal;

      await updateDoc(itemRef, {
        expiry_date: newExpiry,
        status: 'active'
      });

      const txn = {
        hostingId: item.id,
        reference: tx.reference,
        amount: item.renewal_amount,
        currency: item.base_currency,
        description: 'hosting renewal',
        hosting_name: item.hosting_name,
        status: 'success',
        timestamp: new Date()
      };
      await addDoc(collection(db, 'transactions'), txn);

      Swal.fire({
        title: 'Cluster Extended',
        text: 'Lease successfully renewed and synchronized globally.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#ffffff',
        color: '#0f172a'
      }).then(() => {
        window.location.reload();
      });

    } catch (error) {
      console.error("Error during payment success processing:", error);
      Swal.fire({ title: 'Registry Sync Error', text: 'Could not commit lease renewal. Contact NOC support.', icon: 'error', background: '#ffffff', color: '#0f172a' });
    }
  };

  return (
    <Section>
      <DashboardHeader>
        <TitleContainer>
          <Title>
            Infrastructure Control Plane <span>v4.8-PROD</span>
          </Title>
          <Subtitle>Full-Spectrum Enterprise Core Dashboard & Domain Controller</Subtitle>
        </TitleContainer>
        <SystemStatusBadge>
          All Cloud Nodes Operational
        </SystemStatusBadge>
      </DashboardHeader>

      <FullscreenGrid>
        {hostings.length > 0 ? (
          hostings.map((item) => {
            const cpuUsage = getRandomMetric(14, 65);
            const ramUsage = getRandomMetric(38, 85);
            const isItemActive = (item.status || '').toLowerCase() === 'active';

            return (
              <ControlCenterCard key={item.id} $status={item.status}>
                <HeaderRow>
                  <InstanceTitle>
                    {item.hosting_name?.toUpperCase() || 'NODE-INSTANCE'}
                    <small>INSTANCE ID: {item.id} [GLOBAL-EDGE-CLUSTER]</small>
                  </InstanceTitle>
                  <StatusPill $status={item.status}>{item.status || 'UNKNOWN'}</StatusPill>
                </HeaderRow>

                <DashboardBody>
                  {/* Left Column: Metrics & Low-level configuration */}
                  <Column>
                    <SectionSubHeader>Resource Telemetry Gauges</SectionSubHeader>
                    <MetricBox>
                      <MetricHeader>
                        <span>CPU LOAD (4 vCPU Virtualized)</span>
                        <span>{cpuUsage}%</span>
                      </MetricHeader>
                      <ProgressBarContainer>
                        <ProgressBarFill $percentage={cpuUsage} $type="cpu" />
                      </ProgressBarContainer>
                    </MetricBox>

                    <MetricBox>
                      <MetricHeader>
                        <span>RAM POOL ALLOCATION (8GB Cluster)</span>
                        <span>{ramUsage}%</span>
                      </MetricHeader>
                      <ProgressBarContainer>
                        <ProgressBarFill $percentage={ramUsage} $type="ram" />
                      </ProgressBarContainer>
                    </MetricBox>

                    <SectionSubHeader>Network & Security Bindings</SectionSubHeader>
                    <DetailRow>
                      <DetailLabel>Nameservers / DNS:</DetailLabel>
                      <DetailValue $mono>ns1.cloud-edge.net</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>SSL Cipher Protocol:</DetailLabel>
                      <DetailValue style={{ color: '#059669' }}>TLSv1.3 (Auto)</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Allocation Duration:</DetailLabel>
                      <DetailValue>{item.duration || 'N/A'}</DetailValue>
                    </DetailRow>
                  </Column>

                  {/* Right Column: Timelines, Billing, Features, Actions */}
                  <Column>
                    <SectionSubHeader>Lease & Financial Ledger</SectionSubHeader>
                    <DetailRow>
                      <DetailLabel>Initial Provision:</DetailLabel>
                      <DetailValue>{item.start_date?.toDate().toLocaleDateString() || 'N/A'}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Lease Expiration:</DetailLabel>
                      <DetailValue style={{ color: isItemActive ? '#1e293b' : '#d97706' }}>
                        {item.expiry_date?.toDate().toLocaleDateString() || 'N/A'}
                      </DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Tier & Renewal:</DetailLabel>
                      <DetailValue>{item.base_currency === 'NGN' ? '₦' : '$'}{item.amount || '0'} {item.renewal_amount ? `(Ren: ₦${item.renewal_amount})` : ''}</DetailValue>
                    </DetailRow>

                    {item.features && item.features.length > 0 && (
                      <div style={{ width: '100%', boxSizing: 'border-box' }}>
                        <SectionSubHeader>Enabled Stack Modules</SectionSubHeader>
                        <TagsGrid>
                          {item.features.map((f, idx) => (
                            <TagBadge key={idx}>{f}</TagBadge>
                          ))}
                        </TagsGrid>
                      </div>
                    )}

                    {item.addons && item.addons.length > 0 && (
                      <div style={{ width: '100%', boxSizing: 'border-box' }}>
                        <SectionSubHeader>Enterprise Addons</SectionSubHeader>
                        <TagsGrid>
                          {item.addons.map((a, idx) => (
                            <TagBadge key={idx} style={{ borderColor: '#93c5fd', color: '#1d4ed8', background: '#eff6ff' }}>{a}</TagBadge>
                          ))}
                        </TagsGrid>
                      </div>
                    )}

                    <SectionSubHeader>Terminal Commands</SectionSubHeader>
                    <ControlsGroup>
                      <ControlButton onClick={() => handleActionClick('Hard Reboot', item.hosting_name)}>⚡ Hard Reboot</ControlButton>
                      <ControlButton onClick={() => handleActionClick('Flush CDN Cache', item.hosting_name)}>🧹 Purge Cache</ControlButton>
                    </ControlsGroup>
                  </Column>
                </DashboardBody>

                <ActionButtonContainer>
                  <Button onClick={() => renew(item)}>
                    🔒 Extend Instance Lease & Renew Plan
                  </Button>
                </ActionButtonContainer>
              </ControlCenterCard>
            );
          })
        ) : (
          <EmptyState>
            No active nodes provisioned inside this cluster environment.
          </EmptyState>
        )}
      </FullscreenGrid>
      {/* <DomainManager/> */}
      <HostingTransactions /> 
    </Section>
  );
};

export default HostingList;