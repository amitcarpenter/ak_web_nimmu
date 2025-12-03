import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pending Documents - Dhol Matrimony",
  description: "Verify pending documents",
};

const pendingDocuments = [
  { id: 1, user: "Rahul Sharma", type: "Aadhar Card", number: "XXXX-XXXX-1234", uploaded: "2 hours ago" },
  { id: 2, user: "Priya Patel", type: "PAN Card", number: "ABCDE1234F", uploaded: "5 hours ago" },
  { id: 3, user: "Amit Kumar", type: "Passport", number: "A12345678", uploaded: "1 day ago" },
];

export default function PendingDocuments() {
  return (
    <>
      <Breadcrumb pageName="📄 Pending Documents" />

      <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-stroke dark:border-strokedark">
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  User
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Document Type
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Document Number
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Uploaded
                </th>
                <th className="px-4 py-4 text-left text-body-sm font-medium text-dark-4 dark:text-dark-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-stroke dark:border-strokedark">
                  <td className="px-4 py-4 font-medium">{doc.user}</td>
                  <td className="px-4 py-4">{doc.type}</td>
                  <td className="px-4 py-4 text-body-sm">{doc.number}</td>
                  <td className="px-4 py-4 text-body-sm">{doc.uploaded}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="text-body-sm font-medium text-green hover:underline">
                        ✅ Approve
                      </button>
                      <button className="text-body-sm font-medium text-red hover:underline">
                        ❌ Reject
                      </button>
                      <button className="text-body-sm font-medium text-primary hover:underline">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

