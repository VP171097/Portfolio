import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Clock } from "lucide-react";

import ContactItem from "@/components/layouts/ContactItem";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useConfig } from "@/context/ConfigContext";

const iconMap = {
  email: FaEnvelope,
  phone: FaPhoneAlt,
  location: FaMapMarkerAlt,
};

const computeRemainingNoticeDays = (noticeConfig) => {
  if (!noticeConfig || !noticeConfig.active) return 0;

  const startDateStr = noticeConfig.startDate;
  const totalDays = Number(noticeConfig.totalDays) || 90;

  if (!startDateStr) return totalDays;

  const startDate = new Date(startDateStr);
  const today = new Date();

  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - startDate.getTime();
  const elapsedDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const remainingDays = totalDays - Math.max(0, elapsedDays);
  return remainingDays;
};

const Sidebar = () => {
  const { config, loading } = useConfig();
  const sidebarConfig = config.sidebar;

  if (loading || !sidebarConfig)
    return <div className="text-white p-4">Loading Sidebar...</div>;

  const remainingNoticeDays = computeRemainingNoticeDays(sidebarConfig.noticePeriod);
  const showNoticePeriod =
    sidebarConfig.noticePeriod?.active && remainingNoticeDays > 0;

  return (
    <aside className="relative container md:w-80 bg-neutral-950/80 backdrop-blur-xl border border-neutral-800 text-white py-6 px-4 rounded-2xl shadow-xl flex flex-col justify-between lg:sticky lg:top-[90px] h-min mb-6 mt-6 md:mb-10 md:mt-10">
      <BorderBeam
        size={500}
        borderWidth={2}
        duration={4}
        className="hidden sm:block absolute xl:via-amber-500"
      />

      <div className="flex flex-col items-center py-2 md:py-3 px-1">
        {/* Avatar with Glowing Pulse */}
        <div className="relative mb-3">
          <img
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-neutral-900 object-cover shadow-md shadow-amber-500/10 border border-neutral-700"
            src={sidebarConfig.avatar}
            alt="Avatar"
            loading="lazy"
          />
          <span className="absolute bottom-1 right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-black"></span>
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-black text-center text-white">
          {sidebarConfig.name}
        </h2>

        <h3 className="text-xs text-gray-300 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-lg mt-2 text-center max-w-xs font-medium">
          {sidebarConfig.role}
        </h3>

        {/* Live Availability Status Pill */}
        {sidebarConfig.status && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{sidebarConfig.status}</span>
          </div>
        )}

        {/* Dynamic Serving Notice Period Countdown Pill */}
        {showNoticePeriod && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-bold tracking-wide shadow-sm animate-pulse">
            <Clock size={12} className="text-amber-400" />
            <span>Serving Notice: {remainingNoticeDays} Days Left</span>
          </div>
        )}

        <div className="border-t border-neutral-800 w-full my-4"></div>

        {/* Contact Info (Email, Phone, Location - Github removed) */}
        <div className="space-y-3 w-full px-1 mb-2">
          {sidebarConfig.contacts?.map((contact, idx) => {
            const Icon = iconMap[contact.type];
            if (!Icon) return null;
            return (
              <ContactItem
                key={idx}
                Icon={Icon}
                title={contact.title}
                value={contact.value}
                link={contact.link}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
