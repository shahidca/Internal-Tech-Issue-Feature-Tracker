
import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { IssueServices } from "./issue.service";

const createIssue = async (req: Request, res: Response) => {
       const userId = req.user!.id;
    try {
       const result = await IssueServices.createIssueIntoDB(req.body, userId );
      sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Issue created successfully",
      data: result,
    });
    } catch (error: any) {
      sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error: error.details,
    });
    }
  }

  const getAllIssues = async (req: Request, res: Response) => {
    try {
       const result = await IssueServices.getAllIssuesFromDB(req.query);
      sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issues retrieved successfully",
      data: result,
    });
    } catch (error: any) {
      sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error: error.details,
    });
    }
  }

  const getSingleIssue = async (req: Request, res: Response) => {
      const {id} = req.params
   try {
      const result = await IssueServices.getSingleIssueFromDB(id as string);
       sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issue retrieved successfully",
      data: result,
    });
   } catch (error: any) {
       sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error: error.details,
    });
   }
  }

  const updateIssue = async (req: Request, res: Response) => {
    try {
      const result = await IssueServices.updateIssueIntoDB(req.params.id as string, req.body, req.user);
      sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issue updated successfully",
      data: result,
    });
    } catch (error: any) {
      sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error: error.details,
    });
    }
  }

  const deleteIssue = async (req: Request, res: Response) => {
   

   try {
       await IssueServices.deleteIssueFromDB( req.params.id as string);
       sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issue deleted successfully",
    });
   } catch (error: any) {
       sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error: error.details,
    });
   }
  }

  export const IssueControllers = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};

