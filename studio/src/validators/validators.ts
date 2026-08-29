import { validateContent, type ContentIssue } from "../../../shared/validators/content.js";

export interface StudioValidationReport {
  contentIssues: ContentIssue[];
  passed: boolean;
}

export function runStudioValidation(): StudioValidationReport {
  const contentIssues = validateContent();
  const passed = !contentIssues.some((i) => i.severity === "error");
  return { contentIssues, passed };
}
