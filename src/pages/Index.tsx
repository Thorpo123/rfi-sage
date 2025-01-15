import { useState } from "react";
import { RFIForm } from "@/components/RFIForm";
import { RFIList } from "@/components/RFIList";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [view, setView] = useState<"form" | "list">("list");

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

          {view === "form" ? <RFIForm /> : <RFIList />}
        </div>
      </div>
    </div>
  );
};

export default Index;