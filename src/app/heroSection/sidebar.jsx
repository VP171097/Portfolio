import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import ContactItem from "@/components/layouts/ContactItem";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useConfig } from "@/context/ConfigContext";

const iconMap = {
  email: FaEnvelope,
  phone: FaPhoneAlt,
  github: FaGithub,
  location: FaMapMarkerAlt,
};

const Sidebar = () => {
  const { config, loading } = useConfig();
  const sidebarConfig = config.sidebar;
  const [expanded, setExpanded] = useState(false);

  if (loading || !sidebarConfig)
    return <div className="text-white p-4">Loading Sidebar...</div>;

  return (
    <aside className="relative container md:w-72 bg-black/50 text-white py-6 px-4 rounded-2xl shadow-lg flex flex-col justify-between lg:sticky lg:top-[90px] h-min mb-10 mt-10">
      <BorderBeam
        size={500}
        borderWidth={2}
        duration={4}
        className="hidden sm:block absolute xl:via-blue-500"
      />

      {/* -------- Small Screens View -------- */}
      <div className="md:hidden">
        {/* Collapsed Card */}
        <div className="bg-[#1c1c1c] rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={sidebarConfig.avatar}
                alt="Avatar"
                className="w-14 h-14 rounded-2xl object-cover bg-gray-700"
              />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#1c1c1c]"></span>
              </span>
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">
                {sidebarConfig.name}
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">{sidebarConfig.role}</p>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            aria-label="Toggle contact information"
            className="p-2 rounded-lg bg-neutral-800 text-yellow-400"
          >
            {expanded ? (
              <FaChevronUp className="text-sm" />
            ) : (
              <FaChevronDown className="text-sm" />
            )}
          </button>
        </div>

        {/* Expandable Section with Transition */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 space-y-3 px-2 pb-3">
            {/* Status pill on mobile */}
            {sidebarConfig.status && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium w-fit mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{sidebarConfig.status}</span>
              </div>
            )}

            {sidebarConfig.contacts.map((contact, idx) => {
              const Icon = iconMap[contact.type];
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
      </div>

      {/* -------- Large Screens View -------- */}
      <div className="hidden md:flex flex-col items-center py-4 px-2">
        <div className="relative mb-3">
          <img
            className="w-32 h-32 rounded-2xl bg-gray-800/40 object-cover shadow-md shadow-amber-500/10"
            src={sidebarConfig.avatar}
            alt="Avatar"
          />
          <span className="absolute bottom-1 right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-black"></span>
          </span>
        </div>

        <h2 className="text-2xl font-bold text-center text-white">{sidebarConfig.name}</h2>

        <h3 className="text-xs text-gray-400 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-lg mt-2 text-center">
          {sidebarConfig.role}
        </h3>

        {/* Live Status Pill */}
        {sidebarConfig.status && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{sidebarConfig.status}</span>
          </div>
        )}

        <div className="border-t border-neutral-800 w-full my-5"></div>

        {/* Contact Info */}
        <div className="space-y-4 w-full px-1">
          {sidebarConfig.contacts.map((contact, idx) => {
            const Icon = iconMap[contact.type];
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
