
import { DEPARTMENT_ROI } from "./departmentROI";

// Helper function to get department ROI
export const getDepartmentROI = (industryId: string, departmentName: string): number | undefined => {
  if (!DEPARTMENT_ROI[industryId]) return undefined;
  
  // Try to find an exact match
  const deptROI = DEPARTMENT_ROI[industryId].find(d => 
    d.name.toLowerCase() === departmentName.toLowerCase()
  );
  
  if (deptROI) return deptROI.roi;
  
  // Try to find a partial match
  const partialMatch = DEPARTMENT_ROI[industryId].find(d => 
    departmentName.toLowerCase().includes(d.name.toLowerCase()) || 
    d.name.toLowerCase().includes(departmentName.toLowerCase())
  );
  
  return partialMatch?.roi;
};
