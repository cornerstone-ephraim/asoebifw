import {
  formatAdminDate,
  getApplicantName,
} from "@/features/admin/admin-utils";

type PrizeApplication = {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  submissionMode?: "instagram" | "youtube" | "website" | "pdf";
  submissionUrl?: string;
  legacyPdfUrl?: string | null;
  status: "submitted" | "reviewing";
  emailStatus?: "pending" | "sent" | "failed";
  submittedAt: number;
};

export function PrizeApplicationsTable({
  applications,
}: {
  applications: PrizeApplication[];
}) {
  if (!applications.length) {
    return (
      <p className="mt-8 rounded-3xl bg-white p-8 text-asoebi-graphite shadow-asoebi-panel">
        No Prize applications have arrived yet.
      </p>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-asoebi-panel">
      <table className="w-full min-w-220 border-collapse text-left text-sm">
        <caption className="sr-only">
          Asoebi Fashion Prize applications, newest first
        </caption>
        <thead className="bg-asoebi-purple-950 text-white">
          <tr>
            <th scope="col" className="px-6 py-4 font-bold">
              Applicant
            </th>
            <th scope="col" className="px-6 py-4 font-bold">
              Submission
            </th>
            <th scope="col" className="px-6 py-4 font-bold">
              Received
            </th>
            <th scope="col" className="px-6 py-4 font-bold">
              Status
            </th>
            <th scope="col" className="px-6 py-4 text-right font-bold">
              Review
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-asoebi-purple-100">
          {applications.map((application) => {
            const reviewUrl =
              application.submissionUrl || application.legacyPdfUrl;
            return (
              <tr key={application.id} className="hover:bg-asoebi-mist/55">
                <th scope="row" className="px-6 py-5 font-normal">
                  <span className="block font-bold text-asoebi-purple-950">
                    {getApplicantName(application)}
                  </span>
                  <a
                    href={`mailto:${application.email}`}
                    className="transition-linear mt-1 block text-asoebi-graphite underline-offset-4 transition-colors hover:text-brand hover:underline"
                  >
                    {application.email}
                  </a>
                </th>
                <td className="px-6 py-5 font-bold text-asoebi-purple-800 capitalize">
                  {application.submissionMode ?? "Legacy"}
                </td>
                <td className="px-6 py-5 text-asoebi-graphite">
                  {formatAdminDate(application.submittedAt)}
                </td>
                <td className="px-6 py-5">
                  <span className="rounded-full bg-asoebi-gold-100 px-3 py-1.5 text-xs font-bold text-asoebi-purple-950 capitalize">
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  {reviewUrl ? (
                    <a
                      href={reviewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-linear inline-flex min-h-11 items-center rounded-full bg-asoebi-purple-950 px-5 text-xs font-bold text-white transition-colors hover:bg-brand"
                    >
                      Open submission{" "}
                      <span aria-hidden="true" className="ml-2">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="text-xs font-semibold text-asoebi-muted">
                      Link unavailable
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
