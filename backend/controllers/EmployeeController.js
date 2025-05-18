import { query } from "../utils/connectToDB.js";
import {
  createRoleQuery,
  createEmployeeTableQuery,
  getAllEmployeesQuery,
  createEmployeeQuery,
  getEmployeeByIdQuery,
  deleteEmployeeQuery,
  updateEmployeeQuery,
} from "../utils/sqlQuery.js";
import { createError } from "../utils/error.js";
import e from "express";
export const getAllEmployees = async (req, res, next) => {
  try {
    const response = await query("SELECT to_regclass('employee_details')");
    //console.log("Query response:", response); // Debugging

    if (!response || !response.rows || response.rows[0].to_regclass === null) {
      await query(createRoleQuery);
      await query(createEmployeeTableQuery);
      console.log("Employee table created successfully");
      return res
        .status(200)
        .json({ message: "Employee table created successfully" });
    }

    const rows = await query(getAllEmployeesQuery);
    res.status(200).json(rows.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return next(
      createError(
        400,
        error.message || "Internal Server Error: Unable to fetch employees"
      )
    );
  }
};

export const createEmployee = async (req, res, next) => {
  // Logic to create a new employee in the database
  try {
    const { name, email, age, role, salary } = req.body;
    if (!name || !email || !age || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (age < 18) {
      return res.status(400).json({ message: "Age must be 18 or older" });
    }
    const response = await query(createEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
    ]);

    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.error("Error creating employee:", error);
    return next(
      createError(
        400,
        error.message || "Internal Server Error: Unable to create employee"
      )
    );
  }
};

export const getEmployeeById = async (req, res, next) => {
  // Logic to get an employee by ID from the database
  try {
    const { id } = req.params;
    const response = await query(getEmployeeByIdQuery, [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    return next(
      createError(
        400,
        error.message || "Internal Server Error: Unable to fetch employee"
      )
    );
  }
};

export const deleteEmployee = async (req, res, next) => {
  // Logic to delete an employee by ID from the database
  try {
    const { id } = req.params;
    const response = await query(deleteEmployeeQuery, [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return next(
      createError(
        400,
        error.message || "Internal Server Error: Unable to delete employee"
      )
    );
  }
};

export const updateEmployee = async (req, res, next) => {
  // Logic to update an employee by ID in the database
  try {
    const { id } = req.params;
    const { name, email, age, role, salary } = req.body;
    if (!name || !email || !age || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (age < 18) {
      return res.status(400).json({ message: "Age must be 18 or older" });
    }
    const response = await query(updateEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
      id,
    ]);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error("Error updating employee:", error);
    return next(
      createError(
        400,
        error.message || "Internal Server Error: Unable to update employee"
      )
    );
  }
};
