"use client";

import { SlotData } from "@/lib/doctors-data";

interface DoctorCardProps {
  id: number;
  name: string;
  department: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  slots: SlotData[];
  selectedSlotId: number | null;
  onSlotSelect: (slotId: number, doctorName: string, slotTime: string) => void;
}

export default function DoctorCard({
  name,
  department,
  specialization,
  experienceYears,
  rating,
  slots,
  selectedSlotId,
  onSlotSelect,
}: DoctorCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-teal-100 hover:shadow-md">
      {/* Doctor Info Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-gray-900">{name}</h3>
          <p className="mt-0.5 text-sm text-gray-500">{department}</p>
          <p className="text-xs italic text-gray-400">{specialization}</p>
        </div>
        <div className="ml-3 flex flex-col items-end gap-1 text-right">
          <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
            {experienceYears} yrs
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-yellow-600">
            ★ {rating}
          </span>
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {slots.map((slot) => {
          const isBooked = slot.isBooked;
          const isSelected = selectedSlotId === slot.id;

          return (
            <button
              key={slot.id}
              id={`slot-${slot.id}`}
              onClick={() => {
                if (!isBooked) {
                  onSlotSelect(slot.id, name, slot.time);
                }
              }}
              disabled={isBooked}
              className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isBooked
                  ? "cursor-not-allowed border border-pink-200 bg-pink-50 text-pink-400"
                  : isSelected
                  ? "border-2 border-teal-600 bg-teal-600 text-white shadow-md shadow-teal-400/30 scale-[1.02]"
                  : "border border-teal-200 bg-teal-50/50 text-teal-700 hover:border-teal-400 hover:bg-teal-50 hover:shadow-sm active:scale-[0.97]"
              }`}
            >
              {isBooked ? "Booked" : slot.time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
