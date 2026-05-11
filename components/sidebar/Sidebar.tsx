"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { HiOutlineTicket } from "react-icons/hi2";
import { HiOutlineMapPin } from "react-icons/hi2";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { HiOutlineScale } from "react-icons/hi2";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";

// ─── Design tokens ───────────────────────────────────────────────────────────
const ACTIVE_BG = "#e28576";
const ACTIVE_TEXT = "#FFFFFF";
const IDLE_TEXT = "#e28576";
const HOVER_BG = "#F1F5F9";
const HOVER_TEXT = "#e28576";
const SIDEBAR_BG = "#FFFFFF";
const NESTED_IDLE_TEXT = "#70423F";
const NESTED_ACTIVE_TEXT = "#e28576";

const navItemFont: React.CSSProperties = {
  fontFamily: "'Work Sans', sans-serif",
  fontWeight: 600,
  fontSize: "15px",
  lineHeight: "150%",
  letterSpacing: "0",
};

const workSans: React.CSSProperties = {
  fontFamily: "'Work Sans', sans-serif",
  fontWeight: 600,
  fontSize: "15px",
  lineHeight: "150%",
  letterSpacing: "0%",
};

// ─── Types ───────────────────────────────────────────────────────────────────

type SubItem = { label: string; path: string };
type NavItem = {
  label: string;
  path?: string;
  icon: React.ReactNode;
  children?: SubItem[];
  isLogout?: boolean;
};

// ─── Nav Configs per role ────────────────────────────────────────────────────

const superAdminNav: NavItem[] = [
  { label: "Home", path: "/admin", icon: <HiOutlineHome size={20} /> },
  {
    label: "Users",
    icon: <HiOutlineUsers size={20} />,
    children: [
      { label: "Management", path: "/admin/users/management" },
      { label: "Service Provider", path: "/admin/users/service-provider" },
      { label: "Building Owners", path: "/admin/users/building-owners" },
    ],
  },
  { label: "Services", path: "/admin/services", icon: <HiOutlineWrenchScrewdriver size={20} /> },
  { label: "Tickets", path: "/admin/tickets", icon: <HiOutlineTicket size={20} /> },
  {
    label: "Cities & Areas",
    icon: <HiOutlineMapPin size={20} />,
    children: [
      { label: "Countries", path: "/admin/cities/countries" },
      { label: "Cities", path: "/admin/cities/cities" },
      { label: "Zones", path: "/admin/cities/zones" },
    ],
  },
  { label: "Categories", path: "/admin/categories", icon: <HiOutlineSquares2X2 size={20} /> },
  { label: "Issues", path: "/admin/issues", icon: <HiOutlineExclamationCircle size={20} /> },
  { label: "Disputes", path: "/admin/disputes", icon: <HiOutlineScale size={20} /> },
  { label: "Settings", path: "/admin/settings", icon: <HiOutlineCog6Tooth size={20} /> },
  { label: "Log Out", icon: <HiOutlineArrowRightOnRectangle size={20} />, isLogout: true },
];

const serviceProviderNav: NavItem[] = [
  { label: "Dashboard", path: "/sp", icon: <HiOutlineChartBarSquare size={20} /> },
  { label: "Users", path: "/sp/users", icon: <HiOutlineUsers size={20} /> },
  { label: "Services", path: "/sp/services", icon: <HiOutlineWrenchScrewdriver size={20} /> },
  { label: "Requests", path: "/sp/requests", icon: <HiOutlineClipboardDocumentList size={20} /> },
  { label: "Reporting", path: "/sp/reporting", icon: <HiOutlineChartBarSquare size={20} /> },
  { label: "Disputes", path: "/sp/disputes", icon: <HiOutlineScale size={20} /> },
  { label: "Support", path: "/sp/support", icon: <HiOutlineQuestionMarkCircle size={20} /> },
  { label: "Settings", path: "/sp/settings", icon: <HiOutlineCog6Tooth size={20} /> },
  { label: "Log Out", icon: <HiOutlineArrowRightOnRectangle size={20} />, isLogout: true },
];

const buildingOwnerNav: NavItem[] = [
  { label: "Dashboard", path: "/bo", icon: <HiOutlineChartBarSquare size={20} /> },
  { label: "Users", path: "/bo/users", icon: <HiOutlineUsers size={20} /> },
  { label: "Requests", path: "/bo/requests", icon: <HiOutlineWrenchScrewdriver size={20} /> },
  // { label: "Requests", path: "/bo/requests", icon: <HiOutlineClipboardDocumentList size={20} /> },
  { label: "Reporting", path: "/bo/reporting", icon: <HiOutlineChartBarSquare size={20} /> },
  { label: "Disputes", path: "/bo/disputes", icon: <HiOutlineScale size={20} /> },
  { label: "Support", path: "/bo/support", icon: <HiOutlineQuestionMarkCircle size={20} /> },
  { label: "Settings", path: "/bo/settings", icon: <HiOutlineCog6Tooth size={20} /> },
  { label: "Log Out", icon: <HiOutlineArrowRightOnRectangle size={20} />, isLogout: true },
];

// ─── Single Nav Item ──────────────────────────────────────────────────────────

const SidebarNavItem = ({
  item,
  onLogout,
  onNavigate,
}: {
  item: NavItem;
  onLogout?: () => void;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(
    () => item.children?.some((c) => pathname.startsWith(c.path)) ?? false
  );

  const isParentActive =
    item.children?.some((c) => pathname.startsWith(c.path)) ?? false;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen((p) => !p)}
          style={{
            ...navItemFont,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "12px 16px",
            borderRadius: "16px",
            border: "none",
            cursor: "pointer",
            background: isParentActive ? ACTIVE_BG : "transparent",
            color: isParentActive ? ACTIVE_TEXT : IDLE_TEXT,
            transition: "background 0.18s, color 0.18s",
          }}
          onMouseEnter={(e) => {
            if (!isParentActive) {
              (e.currentTarget as HTMLElement).style.background = HOVER_BG;
              (e.currentTarget as HTMLElement).style.color = HOVER_TEXT;
            }
          }}
          onMouseLeave={(e) => {
            if (!isParentActive) {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = IDLE_TEXT;
            }
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
            {item.label}
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s",
              transform: open ? "rotate(0deg)" : "rotate(-90deg)",
              opacity: 0.6,
            }}
          >
            <HiChevronDown size={16} />
          </span>
        </button>

        <div
          style={{
            overflow: "hidden",
            maxHeight: open ? "300px" : "0",
            opacity: open ? 1 : 0,
            transition: "max-height 0.28s ease, opacity 0.2s ease",
          }}
        >
          <div
            style={{
              marginLeft: "20px",
              marginTop: "4px",
              paddingLeft: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {item.children.map((child) => {
              const isActive = pathname.startsWith(child.path);
              return (
                <Link
                  key={child.path}
                  href={child.path}
                  onClick={onNavigate}
                  style={{
                    ...navItemFont,
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 12px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: isActive ? NESTED_ACTIVE_TEXT : NESTED_IDLE_TEXT,
                    background: "transparent",
                    transition: "color 0.15s",
                  }}
                >
                  <HiChevronRight size={14} style={{ opacity: 0.7 }} />
                  {child.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (item.isLogout) {
    return (
      <button
        onClick={onLogout}
        style={{
          ...navItemFont,
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
          borderRadius: "16px",
          border: "none",
          cursor: "pointer",
          background: "transparent",
          color: IDLE_TEXT,
          transition: "background 0.18s, color 0.18s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#FFF1F0";
          (e.currentTarget as HTMLElement).style.color = "#E53935";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = IDLE_TEXT;
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
        {item.label}
      </button>
    );
  }

  const isActive =
    item.path === "/admin" ? pathname === "/admin" : pathname.startsWith(item.path!);

  return (
    <Link
      href={item.path!}
      onClick={onNavigate}
      style={{
        ...navItemFont,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "16px",
        textDecoration: "none",
        background: isActive ? ACTIVE_BG : "transparent",
        color: isActive ? ACTIVE_TEXT : IDLE_TEXT,
        transition: "background 0.18s, color 0.18s",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background = HOVER_BG;
          (e.currentTarget as HTMLElement).style.color = HOVER_TEXT;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = IDLE_TEXT;
        }
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
      {item.label}
    </Link>
  );
};

// ─── Types ───────────────────────────────────────────────────────────────────

type SidebarRole = "superAdmin" | "serviceProvider" | "buildingOwner";

interface SidebarProps {
  role?: SidebarRole;
  onLogout?: () => void;
  companyName?: string;
  logoSrc?: string;
  isOpen: boolean;
  onClose: () => void;
}

const navByRole: Record<SidebarRole, NavItem[]> = {
  superAdmin: superAdminNav,
  serviceProvider: serviceProviderNav,
  buildingOwner: buildingOwnerNav,
};

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export const Sidebar = ({
  role = "superAdmin",
  onLogout,
  companyName = "COMPANY",
  logoSrc,
  isOpen,
  onClose,
}: SidebarProps) => {
  const navItems = navByRole[role];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sidebarContent = (
    <aside
      style={{
        width: "260px",
        height: "100%",
        background: SIDEBAR_BG,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "20px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt="logo" style={{ height: "40px", width: "auto" }} />
          ) : (
            <>
              <svg width="40" height="30" viewBox="0 0 48 36" fill="none">
                <path
                  d="M6 28 C6 28, 14 8, 22 18 C26 24, 30 12, 38 6"
                  stroke={ACTIVE_BG}
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="8" cy="28" r="3" fill={ACTIVE_BG} />
              </svg>
              <span
                style={{
                  ...workSans,
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: ACTIVE_BG,
                }}
              >
                {companyName}
              </span>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="lg:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            borderRadius: "8px",
            color: "#70423F",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Close sidebar"
        >
          <HiXMark size={20} />
        </button>
      </div>

      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {navItems.map((item, index) => {
          const isLast = index === navItems.length - 1;
          return (
            <div key={item.label}>
              {isLast && (
                <div style={{ borderTop: "1px solid #F1F5F9", margin: "10px 6px" }} />
              )}
              <SidebarNavItem item={item} onLogout={onLogout} onNavigate={onClose} />
            </div>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block" style={{ height: "100vh" }}>
        {sidebarContent}
      </div>

      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className="lg:hidden"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 40,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
        aria-hidden="true"
      />
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          zIndex: 50,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
