
import { useState, useEffect } from "react";
import { RFIForm } from "@/components/RFIForm";
import { RFIList } from "@/components/RFIList";
import { Button } from "@/components/ui/button";

export interface RFI {
  id: string;
  rfiNumber: string;
  projectName: string;
  submittedBy: string;
  dateSubmitted: string;
  dateRequiredBy: string;
  assignedTo: string;
  status: "Pending" | "Received";
  requestDetails: string;
  documentUrl?: string;
}

const Index = () => {
  const [view, setView] = useState<"form" | "list">("list");
  const [rfis, setRfis] = useState<RFI[]>([]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [objectUrls]);

  const handleRFISubmit = (rfiData: Omit<RFI, "id" | "documentUrl">) => {
    // Generate Word document content
    const documentContent = `
RFI Number: ${rfiData.rfiNumber}
Project Name: ${rfiData.projectName}
Submitted By: ${rfiData.submittedBy}
Date Submitted: ${rfiData.dateSubmitted}
Request Details: ${rfiData.requestDetails}
Date Required By: ${rfiData.dateRequiredBy}
Assigned To: ${rfiData.assignedTo}
Status: ${rfiData.status}
    `.trim();

    // Create document blob and URL
    const blob = new Blob([documentContent], { type: 'application/msword' });
    const documentUrl = URL.createObjectURL(blob);
    
    // Store the URL for cleanup
    setObjectUrls(prev => [...prev, documentUrl]);

    const newRFI: RFI = {
      ...rfiData,
      id: crypto.randomUUID(),
      documentUrl,
    };
    
    setRfis((prev) => [...prev, newRFI]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">RFI Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage and track your Request for Information (RFI) documents
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant={view === "list" ? "default" : "outline"}
                onClick={() => setView("list")}
              >
                View RFIs
              </Button>
              <Button
                variant={view === "form" ? "default" : "outline"}
                onClick={() => setView("form")}
              >
                New RFI
              </Button>
            </div>
          </div>

          {view === "form" ? (
            <RFIForm onSubmit={handleRFISubmit} />
          ) : (
            <RFIList rfis={rfis} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
