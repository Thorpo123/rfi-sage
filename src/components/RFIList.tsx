
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { RFI } from "@/pages/Index";
import { Download } from "lucide-react";

interface RFIListProps {
  rfis: RFI[];
}

export const RFIList = ({ rfis }: RFIListProps) => {
  const handleDownload = (documentUrl: string, rfiNumber: string) => {
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = `RFI-${rfiNumber}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Note: We don't revoke the URL here as it's managed by the parent component
  };

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
              {rfis.map((rfi) => (
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => rfi.documentUrl && handleDownload(rfi.documentUrl, rfi.rfiNumber)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
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
