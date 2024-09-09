const express = require('express');
const router = express.Router();
const {
    getDepartments,
    getDocuments,
    getCategoriesByDepartment,
    getDocumentsByCategory,
    getAllCategories,
    getCategoriesByTypeAndDepartment,
    downloadDocument
} = require('../controllers/documentsController.js');

// Fetch all departments
router.get('/departments', getDepartments);

// Fetch documents by type, department, and category
router.get('/docs', getDocuments);

// Fetch all categories
router.get('/all-categories', getAllCategories);

// Fetch categories by department
router.get('/categories/department/:departmentId', getCategoriesByDepartment);

// Fetch documents by category
router.get('/documents/category/:categoryId', getDocumentsByCategory);

// Fetch categories by type and department
router.get('/categories', getCategoriesByTypeAndDepartment);

// Route to download the document by ID
router.get('/documents/download/:documentId', downloadDocument);

module.exports = router;
