"use client";
import React, { useRef, useCallback } from "react";
import "./ProfileCard.css";

interface ProfileCardProps {
  avatarUrl: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  year?: string;
  className?: string;
  showUserInfo?: boolean;
  linkedinUrl?: string;
  onLinkedInClick?: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl,
  miniAvatarUrl,
  name = "Mansi Jadhav",
  title = "Vice-President",
  year = "2025",
  className = "",
  showUserInfo = true,
  linkedinUrl,
  onLinkedInClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleLinkedInClick = useCallback(() => {
    if (onLinkedInClick) {
      onLinkedInClick();
    } else if (linkedinUrl) {
      window.open(linkedinUrl, "_blank", "noopener,noreferrer");
    }
  }, [linkedinUrl, onLinkedInClick]);

  return (
    <div className={`pc-card-wrapper ${className}`.trim()}>
      <section
        ref={cardRef}
        className="pc-card"
        role="figure"
        aria-label={`${name} profile card`}
      >
        {/* Top curved section */}
        <div className="pc-top-section">
          {/* Profile Image Section - positioned to overlap */}
          <div className="pc-profile-section">
            <div className="pc-main-avatar">
              <img
                src={avatarUrl}
                alt={`${name || "User"} avatar`}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom section with content */}
        <div className="pc-bottom-section">
          {/* Name and Title Section */}
          <div className="pc-name-section">
            <h2 className="pc-name">{name}</h2>
            <p className="pc-title">{title}</p>
          </div>

          {/* LinkedIn Glass Box */}
          {showUserInfo && (
            <div className="pc-glass-box" role="contentinfo">
              <div className="pc-glass-content">
                <div className="pc-mini-avatar">
                  <img
                    src={miniAvatarUrl || avatarUrl}
                    alt={`${name || "User"} mini avatar`}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = "0.5";
                      target.src = avatarUrl;
                    }}
                  />
                </div>
                <div className="pc-user-text">
                  <div className="pc-user-name">{name}</div>
                  <div className="pc-user-year">{year}</div>
                </div>
                <div
                  className="pc-linkedin-logo"
                  onClick={handleLinkedInClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleLinkedInClick();
                    }
                  }}
                  aria-label={`LinkedIn profile for ${name || "user"}`}
                >
                  in
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
