import { tiers } from "@/constants";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Accrue",
  description: "Supercharge and centralize your project planning with Accrue.",
};

export default async function Index() {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <h3 className="font-bold text-4xl lg:text-5xl text-purple-200 pb-2">
        pricing
      </h3>
      <p className="text-lg text-white leading-relaxed">
        Accrue is free to use, but we offer premium features for a monthly
        subscription. Or if you're ready to upgrade,{" "}
        <Link href="/upgrade" className="text-purple-200 hover:underline">
          click here to get started.
        </Link>
      </p>
      <div className="w-full overflow-x-scroll rounded-lg">
        <table className="w-full table-auto divide-y divide-gray-300">
          <thead className="bg-purple-400 bg-opacity-40 text-white text-left font-medium">
            <tr>
              <th className="px-4 py-2 sticky left-0 z-10 bg-zinc-800">Tier</th>
              <th className="px-4 py-2">Best For</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Projects Allowed</th>
              <th className="px-4 py-2">Generations per Project</th>
              <th className="px-4 py-2">Teams Allowed</th>
              <th className="px-4 py-2">Team Members Allowed</th>
            </tr>
          </thead>
          <tbody className="font-light divide-y divide-gray-300">
            {tiers.map((tier) => (
              <tr key={tier.name} className="text-gray-300 font-medium">
                <td className="px-4 py-2 text-purple-200 text-lg font-semibold sticky left-0 z-10 bg-zinc-800">
                  {tier.name}
                </td>
                <td className="px-4 py-2 font-normal">{tier.bestFor}</td>
                <td className="px-4 py-2">
                  {tier.name !== "individual"
                    ? `$${tier.monthlyPrice}/mo. or $${tier.yearlyPrice}/yr.`
                    : "free"}
                </td>
                <td className="px-4 py-2">{tier.numberOfProjectsAllowed}</td>
                <td className="px-4 py-2">
                  {tier.numberOfGenerationsPerProjectAllowed === Infinity
                    ? "unlimited"
                    : tier.numberOfGenerationsPerProjectAllowed}
                </td>
                <td className="px-4 py-2">{tier.numberOfTeamsAllowed}</td>
                <td className="px-4 py-2">{tier.numberOfTeamMembersAllowed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
