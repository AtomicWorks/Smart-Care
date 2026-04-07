import Header from "@/components/Header";
import BookingSystem from "@/components/BookingSystem";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#eef5f5] via-[#f0f7f7] to-[#e8f0f0]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Header />
          <BookingSystem />
        </div>
      </div>
    </main>
  );
}
