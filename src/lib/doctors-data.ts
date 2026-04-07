// Static doctor data used when no database is connected
// This allows the UI to work without PostgreSQL

export interface SlotData {
  id: number;
  time: string;
  isBooked: boolean;
  doctorId: number;
}

export interface DoctorData {
  id: number;
  name: string;
  department: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  slots: SlotData[];
}

export const doctorsData: DoctorData[] = [
  {
    id: 1,
    name: "Dr. Nafisa Karim",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    experienceYears: 11,
    rating: 4.9,
    slots: [
      { id: 1, time: "09:00 AM", isBooked: false, doctorId: 1 },
      { id: 2, time: "Booked", isBooked: true, doctorId: 1 },
      { id: 3, time: "12:00 PM", isBooked: false, doctorId: 1 },
      { id: 4, time: "03:00 PM", isBooked: false, doctorId: 1 },
    ],
  },
  {
    id: 2,
    name: "Dr. Raihan Mahmud",
    department: "Neurology",
    specialization: "Stroke and Neurocritical Care",
    experienceYears: 8,
    rating: 4.7,
    slots: [
      { id: 5, time: "Booked", isBooked: true, doctorId: 2 },
      { id: 6, time: "11:00 AM", isBooked: false, doctorId: 2 },
      { id: 7, time: "01:30 PM", isBooked: false, doctorId: 2 },
      { id: 8, time: "Booked", isBooked: true, doctorId: 2 },
    ],
  },
  {
    id: 3,
    name: "Dr. Sadia Rahman",
    department: "Orthopedics",
    specialization: "Sports Injury and Arthroscopy",
    experienceYears: 9,
    rating: 4.8,
    slots: [
      { id: 9, time: "08:30 AM", isBooked: false, doctorId: 3 },
      { id: 10, time: "10:00 AM", isBooked: false, doctorId: 3 },
      { id: 11, time: "Booked", isBooked: true, doctorId: 3 },
      { id: 12, time: "05:30 PM", isBooked: false, doctorId: 3 },
    ],
  },
  {
    id: 4,
    name: "Dr. Tanvir Hossain",
    department: "Cardiology",
    specialization: "Electrophysiology",
    experienceYears: 14,
    rating: 4.9,
    slots: [
      { id: 13, time: "08:00 AM", isBooked: false, doctorId: 4 },
      { id: 14, time: "Booked", isBooked: true, doctorId: 4 },
      { id: 15, time: "02:00 PM", isBooked: false, doctorId: 4 },
      { id: 16, time: "04:30 PM", isBooked: false, doctorId: 4 },
    ],
  },
  {
    id: 5,
    name: "Dr. Ayesha Sultana",
    department: "Dermatology",
    specialization: "Cosmetic Dermatology",
    experienceYears: 6,
    rating: 4.6,
    slots: [
      { id: 17, time: "09:30 AM", isBooked: false, doctorId: 5 },
      { id: 18, time: "11:30 AM", isBooked: false, doctorId: 5 },
      { id: 19, time: "Booked", isBooked: true, doctorId: 5 },
      { id: 20, time: "03:30 PM", isBooked: false, doctorId: 5 },
    ],
  },
  {
    id: 6,
    name: "Dr. Fahim Ahmed",
    department: "Neurology",
    specialization: "Epilepsy and Sleep Disorders",
    experienceYears: 10,
    rating: 4.8,
    slots: [
      { id: 21, time: "10:00 AM", isBooked: false, doctorId: 6 },
      { id: 22, time: "Booked", isBooked: true, doctorId: 6 },
      { id: 23, time: "01:00 PM", isBooked: false, doctorId: 6 },
      { id: 24, time: "04:00 PM", isBooked: false, doctorId: 6 },
    ],
  },
];

// Extract unique departments and specializations
export const departments = [...new Set(doctorsData.map((d) => d.department))];
export const specializations = [...new Set(doctorsData.map((d) => d.specialization))];
