import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface RFI {
  id: string;
  rfiNumber: string;
  projectName: string;
  submittedBy: string;
  dateSubmitted: string;
  dateRequiredBy: string;
  assignedTo: string;
  status: "Pending" | "Received";
}

// Mock data for demonstration
const mockRFIs: RFI[] = [
  {
    id: "1",
    rfiNumber: "RFI-001",
    projectName: "City Center Project",
    submittedBy: "John Doe",
    dateSubmitted: "2024-04-10",
    dateRequiredBy: "2024-04-17",
    assignedTo: "Jane Smith",
    status: "Pending",
  },
  {
    id: "2",
    rfiNumber: "RFI-002",
    projectName: "Harbor Bridge",
    submittedBy: "Mike Johnson",
    dateSubmitted: "2024-04-09",
    dateRequiredBy: "2024-04-16",
    assignedTo: "Sarah Wilson",
    status: "Received",
  },
];

export const RFIList = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">RFI Number</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Project</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Submitted By</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Required By</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Assigned To</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRFIs.map((rfi) => (
                <tr key={rfi.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm">{rfi.rfiNumber}</td>
                  <td className="px-4 py-3 text-sm">{rfi.projectName}</td>
                  <td className="px-4 py-3 text-sm">{rfi.submittedBy}</td>
                  <td className="px-4 py-3 text-sm">
                    {format(new Date(rfi.dateRequiredBy), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3 text-sm">{rfi.assignedTo}</td>
                  <td className="px-4 py-3 text-sm">
                    <Badge
                      variant={rfi.status === "Received" ? "default" : "secondary"}
                    >
                      {rfi.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};