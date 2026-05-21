import express from "express";

import verifyToken from "../../middleware/verifyToken";
import authorizeRole from "../../middleware/authorizeRole";

import { IssueControllers } from "./issue.controller";

const router = express.Router();

router.get("/", IssueControllers.getAllIssues);

router.get("/:id", IssueControllers.getSingleIssue);

router.post("/", verifyToken, authorizeRole("contributor", "maintainer"),
  IssueControllers.createIssue
);

router.patch(
  "/:id",
  verifyToken,
  authorizeRole("contributor", "maintainer"),
  IssueControllers.updateIssue
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRole("maintainer"),
  IssueControllers.deleteIssue
);

export const IssueRoutes = router;