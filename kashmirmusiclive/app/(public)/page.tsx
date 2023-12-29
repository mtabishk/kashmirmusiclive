import { CountdownTimer } from "@/components/countdown-timer";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#1F1F1F]">
      <CountdownTimer startDate="2024-01-01">
        <h2 className="text-3xl font-bold text-white/80">
          Kashmir Music{" "}
          <span className="text-3xl font-bold text-red-700">Live</span>
        </h2>
      </CountdownTimer>
    </div>
  );
}
