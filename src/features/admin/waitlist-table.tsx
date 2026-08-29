import {
  formatAdminDate,
  getApplicantName,
} from "@/features/admin/admin-utils";

type WaitlistEntry = {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  status: "subscribed";
  submittedAt: number;
};

export function WaitlistTable({ entries }: { entries: WaitlistEntry[] }) {
  if (!entries.length) {
    return (
      <p className="mt-8 rounded-3xl bg-white p-8 text-asoebi-graphite shadow-asoebi-panel">
        The waitlist is empty.
      </p>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-asoebi-panel">
      <table className="w-full min-w-180 border-collapse text-left text-sm">
        <caption className="sr-only">
          Asoebi Fashion Week waitlist entries, newest first
        </caption>
        <thead className="bg-asoebi-purple-950 text-white">
          <tr>
            <th scope="col" className="px-6 py-4 font-bold">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-bold">
              Email address
            </th>
            <th scope="col" className="px-6 py-4 font-bold">
              Joined
            </th>
            <th scope="col" className="px-6 py-4 font-bold">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-asoebi-purple-100">
          {entries.map((entry) => (
            <tr key={entry.id} className="hover:bg-asoebi-mist/55">
              <th
                scope="row"
                className="px-6 py-5 font-bold text-asoebi-purple-950"
              >
                {getApplicantName(entry)}
              </th>
              <td className="px-6 py-5">
                <a
                  href={`mailto:${entry.email}`}
                  className="transition-linear text-asoebi-graphite underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  {entry.email}
                </a>
              </td>
              <td className="px-6 py-5 text-asoebi-graphite">
                {formatAdminDate(entry.submittedAt)}
              </td>
              <td className="px-6 py-5">
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-900">
                  Subscribed
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
