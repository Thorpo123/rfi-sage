import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";
import type { RFI } from "@/pages/Index";

interface RFIFormProps {
  onSubmit: (rfiData: Omit<RFI, "id" | "documentUrl">) => void;
}

export const RFIForm = ({ onSubmit }: RFIFormProps) => {
  const [formData, setFormData] = useState<Omit<RFI, "id" | "documentUrl">>({
    rfiNumber: "",
    projectName: "",
    submittedBy: "",
    dateSubmitted: format(new Date(), "yyyy-MM-dd"),
    requestDetails: "",
    dateRequiredBy: "",
    assignedTo: "",
    status: "Pending",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      onSubmit(formData);
      
      // Reset form after successful submission
      setFormData({
        rfiNumber: "",
        projectName: "",
        submittedBy: "",
        dateSubmitted: format(new Date(), "yyyy-MM-dd"),
        requestDetails: "",
        dateRequiredBy: "",
        assignedTo: "",
        status: "Pending",
      });
      
      toast.success("RFI submitted successfully!");
    } catch (error) {
      console.error("Error submitting RFI:", error);
      toast.error("Failed to submit RFI. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="rfiNumber">RFI Number</Label>
          <Input
            id="rfiNumber"
            value={formData.rfiNumber}
            onChange={(e) => setFormData({ ...formData, rfiNumber: e.target.value })}
            placeholder="Enter RFI number"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="submittedBy">Submitted By</Label>
          <Input
            id="submittedBy"
            value={formData.submittedBy}
            onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
            placeholder="Enter submitter name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateRequiredBy">Date Required By</Label>
          <Input
            id="dateRequiredBy"
            type="date"
            value={formData.dateRequiredBy}
            onChange={(e) => setFormData({ ...formData, dateRequiredBy: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input
            id="assignedTo"
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            placeholder="Enter assignee name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as "Pending" | "Received" })}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requestDetails">Request Details</Label>
        <Textarea
          id="requestDetails"
          value={formData.requestDetails}
          onChange={(e) => setFormData({ ...formData, requestDetails: e.target.value })}
          placeholder="Enter request details"
          className="min-h-[150px]"
          required
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="w-full md:w-auto">
          Submit RFI
        </Button>
      </div>
    </form>
  );
};