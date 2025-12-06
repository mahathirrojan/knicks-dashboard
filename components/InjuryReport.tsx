// components/knicks/InjuryReport.tsx
import { Activity } from "lucide-react";
import { Injury } from "./types";

type InjuryReportProps = {
  injuries: Injury[];
};

export default function InjuryReport({ injuries }: InjuryReportProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
      <div className="border-b border-red-100 bg-red-50 px-6 py-4">
        <h3 className="flex items-center font-bold text-red-900">
          <Activity className="mr-2 h-5 w-5 text-red-600" /> Injury Report
        </h3>
      </div>
      <div className="max-h-[250px] divide-y divide-gray-100 overflow-y-auto">
        {injuries.length > 0 ? (
          injuries.map((inj, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-6 py-3 hover:bg-gray-50"
            >
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {inj.athlete.displayName}
                </p>
                <p className="text-xs text-gray-500">
                  {inj.type || "Undisclosed"}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                  inj.status === "Out"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {inj.status}
              </span>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-sm text-gray-400">
            No active injuries reported
          </div>
        )}
      </div>
    </div>
  );
}