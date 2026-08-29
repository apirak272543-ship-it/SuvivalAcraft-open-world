import { validateContent } from "../shared/validators/content.js";
import { runStudioValidation } from "../studio/src/validators/validators.js";

const issues = runStudioValidation();
const content = validateContent();
const all = [...issues.contentIssues, ...content];

if (all.length === 0) {
  console.log("Content validation: PASS");
} else {
  console.log("Content validation issues:");
  for (const issue of all) {
    console.log(`  [${issue.severity}] ${issue.where}: ${issue.message}`);
  }
  process.exitCode = issues.passed ? 0 : 1;
}
