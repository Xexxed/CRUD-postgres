import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controllers/EmployeeController.js";

const employeeRoutes = Router();

employeeRoutes.get("/", getAllEmployees);
employeeRoutes.post("/", createEmployee);
employeeRoutes.get("/:id", getEmployeeById);
employeeRoutes.delete("/:id", deleteEmployee);

employeeRoutes.put("/:id", updateEmployee);

export default employeeRoutes;
