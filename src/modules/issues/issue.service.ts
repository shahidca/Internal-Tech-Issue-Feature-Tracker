import { pool } from "../../config/db";
import AppError from "../../utils/AppError";
import type { IIssueBody } from "./issue.interface";

const createIssueIntoDB = async (
  payload: IIssueBody,
  reporterId: number
) => {
  const { title, description, type } = payload;

  const result = await pool.query(`
    INSERT INTO issues
    (
      title,
      description,
      type,
      reporter_id
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [title, description,type, reporterId]);


  return result;
};

const getAllIssuesFromDB = async (query: any) => {
  const { sort = "newest", type, status } = query;

  let baseQuery = `
    SELECT * FROM issues
  `;

  const conditions: string[] = [];
  const values: string[] = [];

  // type filter
  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  // status filter
  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  // dynamic WHERE
  if (conditions.length > 0) {
    baseQuery += ` WHERE ${conditions.join(" AND ")}`;
  }

  // sorting
  if (sort === "oldest") {
    baseQuery += ` ORDER BY created_at ASC`;
  } else {
    baseQuery += ` ORDER BY created_at DESC`;
  }

  // fetch issues
  const issuesResult = await pool.query(baseQuery, values);

  const issues = issuesResult.rows;

  // collect reporter ids
  const reporterIds = [
    ...new Set(issues.map((issue) => issue.reporter_id)),
  ];

  // fetch reporters
  let reportersMap: Record<number, any> = {};

  if (reporterIds.length > 0) {
    const reporterQuery = `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
    `;

    const reporterResult = await pool.query(reporterQuery, [
      reporterIds,
    ]);

    reportersMap = reporterResult.rows.reduce((acc, reporter) => {
      acc[reporter.id] = reporter;
      return acc;
    }, {} as Record<number, any>);
  }

  // attach reporter
  const formattedIssues = issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reportersMap[issue.reporter_id] || null,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));

  return formattedIssues;
};

const getSingleIssueFromDB = async (id: string) => {
  // find issue
  const issueQuery = `
    SELECT * FROM issues
    WHERE id = $1
  `;

  const issueResult = await pool.query(issueQuery, [id]);

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new AppError("Issue not found", 404);
  }

  // fetch reporter
  const reporterQuery = `
    SELECT id, name, role
    FROM users
    WHERE id = $1
  `;

  const reporterResult = await pool.query(reporterQuery, [
    issue.reporter_id,
  ]);

  const reporter = reporterResult.rows[0];

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

const updateIssueIntoDB = async (
  id: string,
  payload: Partial<IIssueBody>,
  user: any
) => {
  // find issue
  const issueQuery = `
    SELECT * FROM issues
    WHERE id = $1
  `;

  const issueResult = await pool.query(issueQuery, [id]);

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new AppError("Issue not found", 404);
  }

  // contributor permission
  if (user.role === "contributor") {
    const isOwner = issue.reporter_id === user.id;
    const isOpen = issue.status === "open";

    if (!isOwner || !isOpen) {
      throw new AppError(
        "You are not authorized to update this issue",
        403
      );
    }
  }

  const { title, description, type } = payload;

  const updateQuery = `
    UPDATE issues
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
  `;

  const result = await pool.query(updateQuery, [
    title,
    description,
    type,
    id,
  ]);

  return result.rows[0];
};

const deleteIssueFromDB = async (id: string) => {
  const issueQuery = `
    SELECT * FROM issues
    WHERE id = $1
  `;

  const issueResult = await pool.query(issueQuery, [id]);

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new AppError("Issue not found", 404);
  }

  const deleteQuery = `
    DELETE FROM issues
    WHERE id = $1
  `;

  await pool.query(deleteQuery, [id]);

  return null;
};

export const IssueServices = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
  deleteIssueFromDB,
};