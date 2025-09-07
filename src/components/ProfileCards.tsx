"use client";
import React, { useRef, useCallback } from "react";
import "./ProfileCard.css";

interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  className?: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = "<Placeholder for avatar URL>",
  iconUrl = "<Placeholder for icon URL>",
  grainUrl = "<Placeholder for grain URL>",
  className = "",
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  const cardStyle = {
    "--icon": iconUrl ? `url(${iconUrl})` : "none",
    "--grain": grainUrl ? `url(${grainUrl})` : "none",
  } as React.CSSProperties;

  return (
    <div className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      <section ref={cardRef} className="pc-card">
        <div className="pc-details">
          <h3>{name}</h3>
          <p>{title}</p>
        </div>

        <div className="pc-avatar-content">
          <img
            className="avatar"
            src={avatarUrl}
            alt={`${name || "User"} avatar`}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          {showUserInfo && (
            <div className="pc-user-info">
              <div className="pc-user-details">
                <div className="pc-user-text">
                  <div className="pc-handle">@{handle}</div>
                </div>
              </div>
              <button
                className="pc-contact-btn"
                onClick={handleContactClick}
                style={{ pointerEvents: "auto" }}
                type="button"
                aria-label={`Contact ${name || "user"}`}
              >
                {contactText}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
