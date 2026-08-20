"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import Swal from "sweetalert2";



// 🎨 NEW THEME COLORS & GRADIENTS (Vibrant Pink, Turquoise & Dynamic Accent)
const PrimaryColor = "#ec4899";
const AccentGradient = "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)";
const Turquoise = "#06b6d4";
const Dark = "#0f172a";
const Border = "#e5eaf2";
const White = "#ffffff";
const TextMuted = "#475569";
const Danger = "#ef4444";
const Success = "#10b981";
const Warning = "#f59e0b";

// 🌟 Styled Components (Strict max 10px spacing/gaps/margins/padding rule)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${Dark};
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const HeaderBanner = styled.div`
  background: ${AccentGradient};
  color: ${White};
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.15);
`;

const ColorfulTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(90deg, #ffffff 0%, #fbcfe8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ColorfulSub = styled.p`
  font-size: 0.95rem;
  margin: 0;
  color: #fdf2f8;
  opacity: 0.95;
`;

const FilterContainer = styled.div`
  background: ${White};
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${Border};
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 180px;
`;

const FilterLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${Dark};
`;

const StyledInput = styled.input`
  border: 1px solid ${Border};
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.9rem;
  outline: none;
  color: ${Dark};
  width: 100%;
  box-sizing: border-box;
  background: ${White};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${PrimaryColor};
    box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
  }
`;

const ResetButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  color: ${Danger};
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  height: 38px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
`;

const MetricCard = styled.div`
  background: ${White};
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${Border};
  border-left: 4px solid ${(props) => props.$borderColor || Turquoise};
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(236, 72, 153, 0.08);
  }
`;

const MetricTitle = styled.h3`
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${TextMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetricValue = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${Dark};
`;

const MetricSubText = styled.span`
  font-size: 0.75rem;
  color: ${TextMuted};
`;

const SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 0 0;
`;

const ColorfulSectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  background: ${AccentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BreakdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 10px;
`;

const BreakdownCard = styled.div`
  background: ${White};
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${Border};
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${Dark};
  padding: 4px 0;
  border-bottom: 1px solid ${Border};

  &:last-child {
    border-bottom: none;
  }
`;

const LoadingContainer = styled.div`
  padding: 10px;
  text-align: center;
  color: ${PrimaryColor};
  font-weight: 600;
`;


export default function AnalyticsFinancePage() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Date Filter States (YYYY-MM-DD)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);

      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch analytics data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  // Filter orders by date range if provided
  const filteredOrders = orders.filter((order) => {
    const timestampField = order.createdAt || order.paymentData?.createdAt;
    if (!timestampField) return true; 
    
    const orderDate = timestampField.toDate 
      ? timestampField.toDate() 
      : new Date(timestampField);
    
    if (isNaN(orderDate.getTime())) return true;

    const orderDateString = orderDate.toISOString().split("T")[0];

    if (startDate && orderDateString < startDate) return false;
    if (endDate && orderDateString > endDate) return false;

    return true;
  });

  // Financial & Operational Calculations based on filtered data
  const totalOrders = filteredOrders.length;
  
  const totalRevenue = filteredOrders
    .filter((o) => o.paymentStatus && o.paymentStatus.toLowerCase() === "paid")
    .reduce((acc, curr) => acc + (parseFloat(curr.finalTotal) || 0), 0);

  const pendingRevenue = filteredOrders
    .filter((o) => !o.paymentStatus || o.paymentStatus.toLowerCase() !== "paid")
    .reduce((acc, curr) => acc + (parseFloat(curr.finalTotal) || 0), 0);

  // Order Fulfillment Counts (Case-insensitive check for your 5 pipeline statuses)
  const pendingCount = filteredOrders.filter((o) => !o.orderStatus || o.orderStatus.toLowerCase() === "pending").length;
  const processingCount = filteredOrders.filter((o) => o.orderStatus && o.orderStatus.toLowerCase() === "processing").length;
  const shippedCount = filteredOrders.filter((o) => o.orderStatus && o.orderStatus.toLowerCase() === "shipped").length;
  const deliveredCount = filteredOrders.filter((o) => o.orderStatus && o.orderStatus.toLowerCase() === "delivered").length;
  const cancelledCount = filteredOrders.filter((o) => o.orderStatus && o.orderStatus.toLowerCase() === "cancelled").length;

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.isAdmin || u.role === "admin").length;
  const suspendedCount = users.filter((u) => u.isSuspended).length;

  const handleResetDates = () => {
    setStartDate("");
    setEndDate("");
  };

  if (loading) {
    return <LoadingContainer>Crunching financial and system analytics...</LoadingContainer>;
  }

  return (
    <Container>
      <HeaderBanner>
        <ColorfulTitle>Financial & Business Analytics 📊</ColorfulTitle>
        <ColorfulSub>Monitor lifetime revenue performance or filter analytics across customized date ranges.</ColorfulSub>
      </HeaderBanner>

      {/* 📅 Date Range Filter Bar */}
      <FilterContainer>
        <FilterGroup>
          <FilterLabel>Start Date</FilterLabel>
          <StyledInput 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>End Date</FilterLabel>
          <StyledInput 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </FilterGroup>

        {(startDate || endDate) && (
          <ResetButton onClick={handleResetDates}>Clear Dates</ResetButton>
        )}
      </FilterContainer>

      <MetricsGrid>
        <MetricCard $borderColor={Success}>
          <MetricTitle>Total Revenue (Paid)</MetricTitle>
          <MetricValue>₦{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</MetricValue>
          <MetricSubText>{startDate || endDate ? "Filtered range total" : "Lifetime cleared revenue"}</MetricSubText>
        </MetricCard>

        <MetricCard $borderColor={Warning}>
          <MetricTitle>Pending Collections</MetricTitle>
          <MetricValue>₦{pendingRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</MetricValue>
          <MetricSubText>Awaiting payment verification</MetricSubText>
        </MetricCard>

        <MetricCard $borderColor={Turquoise}>
          <MetricTitle>Total Orders</MetricTitle>
          <MetricValue>{totalOrders}</MetricValue>
          <MetricSubText>{startDate || endDate ? "Within selected dates" : "Lifetime recorded orders"}</MetricSubText>
        </MetricCard>

        <MetricCard $borderColor={Turquoise}>
          <MetricTitle>Total Members</MetricTitle>
          <MetricValue>{totalUsers}</MetricValue>
          <MetricSubText>{adminCount} administrators</MetricSubText>
        </MetricCard>
      </MetricsGrid>

      <SectionRow>
        <ColorfulSectionTitle>Operational Breakdowns</ColorfulSectionTitle>
      </SectionRow>

      <BreakdownGrid>
        <BreakdownCard>
          <MetricTitle>Order Fulfillment Pipeline</MetricTitle>
          <BreakdownItem>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </BreakdownItem>
          <BreakdownItem>
            <span>Processing</span>
            <strong>{processingCount}</strong>
          </BreakdownItem>
          <BreakdownItem>
            <span>Shipped</span>
            <strong>{shippedCount}</strong>
          </BreakdownItem>
          <BreakdownItem>
            <span>Delivered</span>
            <strong>{deliveredCount}</strong>
          </BreakdownItem>
          <BreakdownItem>
            <span>Cancelled</span>
            <strong>{cancelledCount}</strong>
          </BreakdownItem>
        </BreakdownCard>

        <BreakdownCard>
          <MetricTitle>User Account Status</MetricTitle>
          <BreakdownItem>
            <span>Active Members</span>
            <strong>{totalUsers - suspendedCount}</strong>
          </BreakdownItem>
          <BreakdownItem>
            <span>Suspended Accounts</span>
            <strong>{suspendedCount}</strong>
          </BreakdownItem>
          <BreakdownItem>
            <span>Admins</span>
            <strong>{adminCount}</strong>
          </BreakdownItem>
        </BreakdownCard>
      </BreakdownGrid>
    </Container>
  );
}