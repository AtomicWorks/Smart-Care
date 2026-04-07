"use client";

import { departments, specializations } from "@/lib/doctors-data";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  specialization: string;
  onSpecializationChange: (value: string) => void;
  filteredSpecializations: string[];
  doctorCount: number;
  canConfirm: boolean;
  onConfirm: () => void;
  isConfirming: boolean;
}

export default function SearchBar({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  specialization,
  onSpecializationChange,
  filteredSpecializations,
  doctorCount,
  canConfirm,
  onConfirm,
  isConfirming,
}: SearchBarProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_auto_auto_auto]">
        {/* Search Input */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Search Doctor
          </label>
          <input
            id="search-doctor"
            type="text"
            placeholder="Doctor name, department, specialization"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
          />
        </div>

        {/* Department Dropdown */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Department
          </label>
          <select
            id="department-select"
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full min-w-[180px] cursor-pointer rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
          >
            <option value="">All Departments</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>

        {/* Specialization Dropdown */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
            Specialization
          </label>
          <select
            id="specialization-select"
            value={specialization}
            onChange={(e) => onSpecializationChange(e.target.value)}
            className="w-full min-w-[200px] cursor-pointer rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 outline-none transition-all focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
          >
            <option value="">All Specializations</option>
            {filteredSpecializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Confirm Booking Button */}
        <button
          id="confirm-booking-btn"
          onClick={onConfirm}
          disabled={!canConfirm || isConfirming}
          className={`whitespace-nowrap rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 ${
            canConfirm && !isConfirming
              ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/25 hover:from-teal-500 hover:to-teal-600 hover:shadow-teal-500/40 active:scale-[0.97]"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          {isConfirming ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Booking...
            </span>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>

      {/* Doctor Count */}
      <p className="mt-4 text-sm font-medium text-teal-700">
        {doctorCount} doctor{doctorCount !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}
