import { NextRequest, NextResponse } from "next/server";
import { doctorsData, DoctorData } from "@/lib/doctors-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const department = searchParams.get("department") || "";
  const specialization = searchParams.get("specialization") || "";

  let filtered: DoctorData[] = [...doctorsData];

  if (search) {
    filtered = filtered.filter(
      (doc) =>
        doc.name.toLowerCase().includes(search) ||
        doc.department.toLowerCase().includes(search) ||
        doc.specialization.toLowerCase().includes(search)
    );
  }

  if (department) {
    filtered = filtered.filter((doc) => doc.department === department);
  }

  if (specialization) {
    filtered = filtered.filter((doc) => doc.specialization === specialization);
  }

  return NextResponse.json(filtered);
}
