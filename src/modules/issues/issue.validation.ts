import { z } from "zod";

export const createIssueValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        error: "Title is required",
      })
      .max(150, "Title cannot exceed 150 characters"),

    description: z
      .string({
        error: "Description is required",
      })
      .min(20, "Description must be at least 20 characters"),

    type: z.enum(["bug", "feature_request"], {
      error: "Invalid issue type",
    }),
  }),
});

const updateIssueValidationSchema = z.object({
  title: z.string().max(150).optional(),

  description: z.string().min(20).optional(),

  type: z
    .enum(["bug", "feature_request"])
    .optional(),
});

export const IssueValidation = {
  createIssueValidationSchema,
  updateIssueValidationSchema,
};