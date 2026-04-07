"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";
import DoctorCard from "./DoctorCard";
import ConfirmationBanner from "./ConfirmationBanner";
import { DoctorData, doctorsData, specializations as allSpecializations } from "@/lib/doctors-data";

export default function BookingSystem() {
  // Search & filter state
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [specialization, setSpecialization] = useState("");

  // Selection state
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [selectedSlotTime, setSelectedSlotTime] = useState("");

  // Confirmation state
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Doctors data (starts with static data)
  const [doctors, setDoctors] = useState<DoctorData[]>(doctorsData);

  // Filter doctors client-side for instant feedback
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(s) ||
          doc.department.toLowerCase().includes(s) ||
          doc.specialization.toLowerCase().includes(s)
      );
    }

    if (department) {
      result = result.filter((doc) => doc.department === department);
    }

    if (specialization) {
      result = result.filter((doc) => doc.specialization === specialization);
    }

    return result;
  }, [doctors, search, department, specialization]);

  // Filter specializations based on selected department
  const filteredSpecializations = useMemo(() => {
    if (!department) return allSpecializations;
    const docsInDept = doctorsData.filter((d) => d.department === department);
    return [...new Set(docsInDept.map((d) => d.specialization))];
  }, [department]);

  // Reset specialization when department changes
  useEffect(() => {
    setSpecialization("");
  }, [department]);

  const handleSlotSelect = (slotId: number, doctorName: string, slotTime: string) => {
    // Toggle if same slot clicked
    if (selectedSlotId === slotId) {
      setSelectedSlotId(null);
      setSelectedDoctorName("");
      setSelectedSlotTime("");
    } else {
      setSelectedSlotId(slotId);
      setSelectedDoctorName(doctorName);
      setSelectedSlotTime(slotTime);
    }
    // Clear any previous confirmation
    setConfirmationMessage("");
  };

  const handleConfirm = async () => {
    if (!selectedSlotId || !selectedDoctorName || !selectedSlotTime) return;

    setIsConfirming(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: selectedSlotId,
          doctorName: selectedDoctorName,
          slotTime: selectedSlotTime,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setConfirmationMessage(data.message);

        // Update local state to mark slot as booked
        setDoctors((prev) =>
          prev.map((doc) => ({
            ...doc,
            slots: doc.slots.map((slot) =>
              slot.id === selectedSlotId
                ? { ...slot, isBooked: true, time: "Booked" }
                : slot
            ),
          }))
        );

        // Clear selection
        setSelectedSlotId(null);
        setSelectedDoctorName("");
        setSelectedSlotTime("");
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        specialization={specialization}
        onSpecializationChange={setSpecialization}
        filteredSpecializations={filteredSpecializations}
        doctorCount={filteredDoctors.length}
        canConfirm={selectedSlotId !== null}
        onConfirm={handleConfirm}
        isConfirming={isConfirming}
      />

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            id={doctor.id}
            name={doctor.name}
            department={doctor.department}
            specialization={doctor.specialization}
            experienceYears={doctor.experienceYears}
            rating={doctor.rating}
            slots={doctor.slots}
            selectedSlotId={selectedSlotId}
            onSlotSelect={handleSlotSelect}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 py-16">
          <svg className="mb-4 h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-sm font-medium text-gray-400">No doctors found matching your search</p>
          <p className="mt-1 text-xs text-gray-300">Try adjusting your filters</p>
        </div>
      )}

      {/* Selection Indicator */}
      {selectedSlotId && !confirmationMessage && (
        <div className="rounded-2xl border border-teal-100 bg-teal-50/50 px-6 py-3">
          <p className="text-sm font-medium text-teal-700">
            Selected: <span className="font-bold">{selectedSlotTime}</span> with{" "}
            <span className="font-bold">{selectedDoctorName}</span>
          </p>
        </div>
      )}

      {/* Confirmation Banner */}
      <ConfirmationBanner
        message={confirmationMessage}
        visible={!!confirmationMessage}
      />
    </div>
  );
}
