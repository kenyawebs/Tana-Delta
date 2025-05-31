# Kenya Criminal Legal Agent Assistant - API Endpoints

## Overview

This document outlines the API endpoints for the Kenya Criminal Legal Agent Assistant. These endpoints facilitate communication between the frontend and backend components of the system.

## Authentication Endpoints

### WhatsApp Authentication

```
POST /api/auth/whatsapp/initiate
```
- **Description**: Initiates WhatsApp authentication process
- **Request Body**:
  ```json
  {
    "phone_number": "254778401063"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Authentication initiated",
    "session_id": "uuid-string"
  }
  ```

```
POST /api/auth/whatsapp/verify
```
- **Description**: Verifies WhatsApp authentication
- **Request Body**:
  ```json
  {
    "session_id": "uuid-string",
    "verification_code": "123456"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "token": "jwt-token",
    "user": {
      "id": "user-uuid",
      "name": "User Name",
      "phone_number": "254778401063"
    }
  }
  ```

### Admin Authentication

```
POST /api/auth/admin/login
```
- **Description**: Admin login endpoint
- **Request Body**:
  ```json
  {
    "phone_number": "254778401063",
    "password": "secure-password"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "token": "admin-jwt-token",
    "admin": {
      "id": "admin-uuid",
      "name": "Admin Name"
    }
  }
  ```

## User Query Endpoints

```
POST /api/queries
```
- **Description**: Submit a new legal query
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "query_text": "What are the legal requirements for bail in Kenya?",
    "query_type": "legal_information"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "query_id": "query-uuid",
    "status": "processing"
  }
  ```

```
GET /api/queries/:id
```
- **Description**: Get query details and results
- **Authentication**: Required
- **Response**: 
  ```json
  {
    "success": true,
    "query": {
      "id": "query-uuid",
      "query_text": "What are the legal requirements for bail in Kenya?",
      "status": "completed",
      "created_at": "2025-04-02T12:00:00Z",
      "results": {
        "answer": "The legal requirements for bail in Kenya include...",
        "references": [
          {
            "title": "Criminal Procedure Code",
            "section": "Section 123",
            "text": "..."
          }
        ],
        "case_laws": [
          {
            "case_number": "123/2020",
            "case_name": "Republic v. John Doe",
            "summary": "..."
          }
        ]
      }
    }
  }
  ```

```
GET /api/queries
```
- **Description**: Get user's query history
- **Authentication**: Required
- **Response**: 
  ```json
  {
    "success": true,
    "queries": [
      {
        "id": "query-uuid-1",
        "query_text": "What are the legal requirements for bail in Kenya?",
        "status": "completed",
        "created_at": "2025-04-02T12:00:00Z"
      },
      {
        "id": "query-uuid-2",
        "query_text": "How do I file a criminal appeal?",
        "status": "processing",
        "created_at": "2025-04-03T10:00:00Z"
      }
    ]
  }
  ```

## Document Endpoints

```
POST /api/documents/upload
```
- **Description**: Upload a document for processing
- **Authentication**: Required
- **Request**: Multipart form data with file and query_id
- **Response**: 
  ```json
  {
    "success": true,
    "document_id": "document-uuid",
    "status": "uploaded"
  }
  ```

```
GET /api/documents/:id
```
- **Description**: Get document details and processing status
- **Authentication**: Required
- **Response**: 
  ```json
  {
    "success": true,
    "document": {
      "id": "document-uuid",
      "document_name": "court_order.pdf",
      "document_type": "court_order",
      "status": "processed",
      "created_at": "2025-04-02T12:00:00Z",
      "extracted_text": "..."
    }
  }
  ```

```
POST /api/documents/generate
```
- **Description**: Generate a legal document
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "query_id": "query-uuid",
    "document_type": "bail_application",
    "parameters": {
      "applicant_name": "John Doe",
      "case_number": "123/2025"
    }
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "document_id": "generated-document-uuid",
    "download_url": "/api/documents/download/generated-document-uuid"
  }
  ```

```
GET /api/documents/download/:id
```
- **Description**: Download a generated document
- **Authentication**: Required
- **Response**: Document file (PDF/DOCX)

## WhatsApp Integration Endpoints

```
POST /api/whatsapp/webhook
```
- **Description**: Webhook for WhatsApp messages
- **Authentication**: WhatsApp API verification
- **Request Body**: WhatsApp message payload
- **Response**: Acknowledgment

```
POST /api/whatsapp/send
```
- **Description**: Send a WhatsApp message to user
- **Authentication**: Admin only
- **Request Body**:
  ```json
  {
    "user_id": "user-uuid",
    "message": "Your query has been processed. Here are the results..."
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message_id": "whatsapp-message-id"
  }
  ```

## Admin Endpoints

```
GET /api/admin/users
```
- **Description**: Get all users
- **Authentication**: Admin only
- **Response**: List of users

```
GET /api/admin/queries
```
- **Description**: Get all queries
- **Authentication**: Admin only
- **Response**: List of queries

```
PUT /api/admin/system-settings
```
- **Description**: Update system settings
- **Authentication**: Admin only
- **Request Body**:
  ```json
  {
    "setting_name": "default_model",
    "setting_value": "gpt-4"
  }
  ```
- **Response**: Updated setting

```
GET /api/admin/stats
```
- **Description**: Get system statistics
- **Authentication**: Admin only
- **Response**: System statistics

## Legal Data Endpoints

```
GET /api/legal/statutes
```
- **Description**: Search legal statutes
- **Authentication**: Required
- **Query Parameters**: search_term, category
- **Response**: List of matching statutes

```
GET /api/legal/cases
```
- **Description**: Search case law
- **Authentication**: Required
- **Query Parameters**: search_term, court, judge
- **Response**: List of matching cases

```
GET /api/legal/statutes/:id
```
- **Description**: Get statute details
- **Authentication**: Required
- **Response**: Statute details

```
GET /api/legal/cases/:id
```
- **Description**: Get case details
- **Authentication**: Required
- **Response**: Case details

## Feedback Endpoints

```
POST /api/feedback
```
- **Description**: Submit feedback for a query
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "query_id": "query-uuid",
    "rating": 5,
    "feedback_text": "Very helpful response!"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Feedback submitted successfully"
  }
  ```

These API endpoints provide a comprehensive interface for the Kenya Criminal Legal Agent Assistant, enabling all required functionality including user authentication, query processing, document handling, WhatsApp integration, and administrative operations.
