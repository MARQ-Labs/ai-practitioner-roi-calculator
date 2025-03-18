
import { IndustryData } from "@/models/calculator";
import { industryDefinitions } from "./industryDefinitions";
import { industryDepartments } from "./industryDepartments";

// Export constants
export { WORK_DAYS_PER_YEAR, WORK_HOURS_PER_DAY, WORK_HOURS_PER_YEAR, TIME_ADOPTION_CURVE } from "./constants";

// Export ROI data 
export { DEPARTMENT_ROI } from "./departmentROI";

// Export helper functions
export { getDepartmentROI } from "./industryUtils";
export { getIndustryUseCases } from "./industryUseCases";
export { getIndustryROIData } from "./industryROI";

// Export the main industry data object
export const industryData: IndustryData = {
  industries: industryDefinitions,
  industryDepartments: industryDepartments
};
