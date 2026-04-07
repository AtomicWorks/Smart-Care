import { NextRequest, NextResponse } from "next/server";
import { doctorsData } from "@/lib/doctors-data";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { slotId, doctorName, slotTime } = body;

  if (!slotId || !doctorName || !slotTime) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Find the slot in the static data and mark it as booked
  for (const doctor of doctorsData) {
    for (const slot of doctor.slots) {
      if (slot.id === slotId) {
        slot.isBooked = true;
        slot.time = "Booked";
        break;
      }
    }
  }

  return NextResponse.json({
    success: true,
    message: `Appointment confirmed with ${doctorName} on ${slotTime}.`,
    appointment: {
      id: Date.now(),
      doctorName,
      slotTime,
      slotId,
      createdAt: new Date().toISOString(),
    },
  });
}
