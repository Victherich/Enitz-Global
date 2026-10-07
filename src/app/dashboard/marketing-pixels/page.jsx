
"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import styled from "styled-components";
import Swal from "sweetalert2";

const PrimaryNavy = "#0B1B48";
const PrimaryCyan = "#00AEEF";
const Dark = "#0f172a";
const Border = "#cbd5e1";
const White = "#ffffff";
const TextMuted = "#475569";
const LightBg = "#f8fafc";
const ThemeGradient =
  "linear-gradient(135deg, #0B1B48 0%, #00AEEF 100%)";
const Danger = "#ef4444";
const Success = "#16a34a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${Dark};
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-family: inherit;
`;

const HeaderBanner = styled.div`
  background: ${ThemeGradient};
  color: ${White};
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 15px 35px rgba(11, 27, 72, 0.2);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: -30px;
    right: -30px;
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    pointer-events: none;
  }
`;

const ColorfulTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 900;
  margin: 0;
  color: ${White};
  letter-spacing: -0.02em;
`;

const ColorfulSub = styled.p`
  font-size: 0.95rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 0 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const ColorfulSectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 900;
  margin: 0;
  background: ${ThemeGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PrimaryButton = styled.button`
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 800;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(0, 174, 239, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 174, 239, 0.4);
  }
`;

const PixelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 10px;
`;

const PixelCard = styled.div`
  background: ${White};
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${Border};
  border-left: 4px solid ${PrimaryCyan};
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.03);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(0, 174, 239, 0.3);
    box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const PixelName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: ${Dark};
`;

const PixelDescription = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${TextMuted};
  word-break: break-word;
  font-weight: 500;
  line-height: 1.5;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 8px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 800;
  white-space: nowrap;

  background: ${(props) =>
    props.active
      ? "rgba(22, 163, 74, 0.1)"
      : "rgba(239, 68, 68, 0.1)"};

  color: ${(props) =>
    props.active ? Success : Danger};
`;

const PixelValueBox = styled.div`
  background: ${LightBg};
  border: 1px solid ${Border};
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${Dark};
  word-break: break-all;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 5px;
`;

const EditButton = styled.button`
  background: rgba(0, 174, 239, 0.1);
  color: ${PrimaryCyan};
  border: 1px solid rgba(0, 174, 239, 0.2);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 174, 239, 0.2);
  }
`;

const DeleteButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  color: ${Danger};
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;

const LoadingContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: ${Dark};
  font-weight: 700;
  background: ${White};
  border-radius: 10px;
  border: 1px solid ${Border};
`;

const EmptyContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: ${TextMuted};
  font-weight: 600;
  background: ${White};
  border-radius: 10px;
  border: 1px solid ${Border};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 10px;
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  background: ${White};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-width: 450px;
  border: 1px solid ${Border};
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 900;
  background: ${ThemeGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  margin: 0;
  font-weight: 600;

  &:focus {
    border-color: ${PrimaryCyan};
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const StyledSelect = styled.select`
  border: 1px solid ${Border};
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.9rem;
  outline: none;
  color: ${Dark};
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  font-weight: 600;
  background: ${White};

  &:focus {
    border-color: ${PrimaryCyan};
    box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.15);
  }
`;

const InputLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 800;
  color: ${Dark};
`;

const HelpText = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: ${TextMuted};
  line-height: 1.4;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 5px;
`;

const CancelButton = styled.button`
  background: ${LightBg};
  color: ${TextMuted};
  border: 1px solid ${Border};
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #cbd5e1;
    color: ${Dark};
  }
`;

const SaveButton = styled.button`
  background: ${ThemeGradient};
  color: ${White};
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;

const pixelTypes = {
  meta: {
    name: "Meta Pixel",
    description:
      "Tracks website visitors for Facebook and Instagram advertising.",
    placeholder: "Example: 123456789012345",
  },
  tiktok: {
    name: "TikTok Pixel",
    description:
      "Tracks website visitors for TikTok advertising campaigns.",
    placeholder: "Example: C4XXXXXXXXXXXXXXX",
  },
  googleAds: {
    name: "Google Ads",
    description:
      "Tracks website activity for Google Ads campaigns.",
    placeholder: "Example: AW-123456789",
  },
};

export default function MarketingPixelsCrudPage() {
  const [pixels, setPixels] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [pixelInput, setPixelInput] = useState("");

  const fetchPixels = async () => {
    try {
      setLoading(true);

      const trackingRef = doc(db, "settings", "tracking");
      const trackingSnap = await getDoc(trackingRef);

      if (trackingSnap.exists()) {
        setPixels(trackingSnap.data() || {});
      } else {
        setPixels({});
      }
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "Failed to load marketing pixel settings.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPixels();
  }, []);

  const openAddModal = (type) => {
    setEditingType(type);
    setPixelInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (type) => {
    setEditingType(type);
    setPixelInput(pixels[type] || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingType(null);
    setPixelInput("");
  };

  const validatePixel = (type, value) => {
    if (!value.trim()) return false;

    if (type === "meta") {
      return /^\d+$/.test(value.trim());
    }

    if (type === "googleAds") {
      return /^AW-\d+$/i.test(value.trim());
    }

    if (type === "tiktok") {
      return value.trim().length >= 5;
    }

    return true;
  };

  const handleSavePixel = async (e) => {
    e.preventDefault();

    if (!editingType) return;

    const cleanValue = pixelInput.trim();

    if (!validatePixel(editingType, cleanValue)) {
      let message =
        "Please enter a valid tracking ID.";

      if (editingType === "meta") {
        message =
          "Meta Pixel ID should contain numbers only.";
      }

      if (editingType === "googleAds") {
        message =
          "Google Ads ID should look like AW-123456789.";
      }

      if (editingType === "tiktok") {
        message =
          "Please enter a valid TikTok Pixel ID.";
      }

      Swal.fire(
        "Invalid ID",
        message,
        "warning"
      );

      return;
    }

    try {
      Swal.fire({
        text: pixels[editingType]
          ? "Updating tracking ID..."
          : "Saving tracking ID...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const trackingRef = doc(db, "settings", "tracking");

      await setDoc(
        trackingRef,
        {
          [editingType]: cleanValue,
          updatedAt: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      Swal.close();

    Swal.fire(
  pixels[editingType] ? "Updated!" : "Added!",
  `${pixelTypes[editingType].name} saved successfully.`,
  "success"
).then(() => {
  window.location.reload();
});


      closeModal();
      fetchPixels();
    } catch (error) {
      console.error(error);

      Swal.close();

      Swal.fire(
        "Error",
        error.message || "Could not save tracking ID.",
        "error"
      );
    }
  };

  const handleDeletePixel = async (type) => {
    const result = await Swal.fire({
      title: `Remove ${pixelTypes[type].name}?`,
      text:
        "This will stop this tracking code from being used on the website.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Danger,
      cancelButtonColor: TextMuted,
      confirmButtonText: "Yes, Remove It",
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        text: "Removing tracking ID...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const trackingRef = doc(db, "settings", "tracking");

      const remainingPixels = { ...pixels };
      delete remainingPixels[type];

      if (Object.keys(remainingPixels).length === 0) {
        await deleteDoc(trackingRef);
        setPixels({});
      } else {
        await setDoc(
          trackingRef,
          {
            [type]: null,
            updatedAt: serverTimestamp(),
          },
          {
            merge: true,
          }
        );

        const updatedPixels = { ...pixels };
        delete updatedPixels[type];
        setPixels(updatedPixels);
      }

      Swal.close();

      Swal.fire(
        "Removed!",
        `${pixelTypes[type].name} has been removed successfully.`,
        "success"
      );
    } catch (error) {
      console.error(error);

      Swal.close();

      Swal.fire(
        "Error",
        error.message || "Could not remove tracking ID.",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        Loading marketing pixels...
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <HeaderBanner>
        <ColorfulTitle>
          Marketing Pixels & Tracking 📊
        </ColorfulTitle>

        <ColorfulSub>
          Manage the tracking IDs used to measure website
          visitors and advertising campaigns.
        </ColorfulSub>
      </HeaderBanner>

      <ActionRow>
        <ColorfulSectionTitle>
          Tracking Platforms
        </ColorfulSectionTitle>
      </ActionRow>

      <PixelsGrid>
        {Object.entries(pixelTypes).map(
          ([type, config]) => {
            const connected = Boolean(pixels[type]);

            return (
              <PixelCard key={type}>
                <CardHeader>
                  <PixelName>
                    {config.name}
                  </PixelName>

                  <StatusBadge active={connected}>
                    ●{" "}
                    {connected
                      ? "Connected"
                      : "Not Connected"}
                  </StatusBadge>
                </CardHeader>

                <PixelDescription>
                  {config.description}
                </PixelDescription>

                {connected ? (
                  <>
                    <PixelValueBox>
                      {pixels[type]}
                    </PixelValueBox>

                    <ButtonGroup>
                      <EditButton
                        onClick={() =>
                          openEditModal(type)
                        }
                      >
                        Edit
                      </EditButton>

                      <DeleteButton
                        onClick={() =>
                          handleDeletePixel(type)
                        }
                      >
                        Remove
                      </DeleteButton>
                    </ButtonGroup>
                  </>
                ) : (
                  <ButtonGroup>
                    <PrimaryButton
                      onClick={() =>
                        openAddModal(type)
                      }
                    >
                      + Add {config.name}
                    </PrimaryButton>
                  </ButtonGroup>
                )}
              </PixelCard>
            );
          }
        )}
      </PixelsGrid>

      {Object.keys(pixels).filter(
        (key) =>
          ["meta", "tiktok", "googleAds"].includes(key) &&
          pixels[key]
      ).length === 0 && (
        <EmptyContainer>
          No advertising tracking IDs have been
          connected yet.
        </EmptyContainer>
      )}

      {isModalOpen && editingType && (
        <ModalOverlay onClick={closeModal}>
          <ModalContainer
            onClick={(e) => e.stopPropagation()}
          >
            <ModalTitle>
              {pixels[editingType]
                ? `Edit ${pixelTypes[editingType].name}`
                : `Add ${pixelTypes[editingType].name}`}
            </ModalTitle>

            <form
              onSubmit={handleSavePixel}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                margin: 0,
              }}
            >
              <InputLabel>
                Tracking Platform
              </InputLabel>

              <StyledSelect
                value={editingType}
                onChange={(e) => {
                  const newType = e.target.value;
                  setEditingType(newType);
                  setPixelInput(
                    pixels[newType] || ""
                  );
                }}
              >
                <option value="meta">
                  Meta Pixel
                </option>

                <option value="tiktok">
                  TikTok Pixel
                </option>

                <option value="googleAds">
                  Google Ads
                </option>
              </StyledSelect>

              <InputLabel>
                {pixelTypes[editingType].name} ID
              </InputLabel>

              <StyledInput
                type="text"
                placeholder={
                  pixelTypes[editingType].placeholder
                }
                value={pixelInput}
                onChange={(e) =>
                  setPixelInput(e.target.value)
                }
                required
              />

              <HelpText>
                Enter the tracking ID provided by{" "}
                {editingType === "meta"
                  ? "Meta Events Manager."
                  : editingType === "tiktok"
                  ? "TikTok Ads Manager."
                  : "Google Ads."}
              </HelpText>

              <ModalActions>
                <CancelButton
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </CancelButton>

                <SaveButton type="submit">
                  {pixels[editingType]
                    ? "Save Changes"
                    : "Add Tracking ID"}
                </SaveButton>
              </ModalActions>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
}
