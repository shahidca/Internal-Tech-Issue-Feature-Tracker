Project name: Internal Tech Issue & Feature Tracker

Project live URL: ==> 
Project Overview: A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions. The API supports authentication, role-based authorization, issue management, filtering, sorting, and validation.

Features: 
 * Authentication & Authorization
1. User registration
2. User login
3. JWT authentication
4. Password hashing using bcrypt
5. Protected routes
6. Role-based access control (RBAC)

User Roles:
 * Contributor
1. Register and login
2. Create issues
3. View all issues
4. Update own issues only when status is open
 * Maintainer
1. All contributor permissions
2. Update any issue
3. Delete any issue
4. Manage issue workflow status
5. Access privileged operations

Issues Module:
1. Create issue
2. Get all issues
3. Get single issue
4. Update issue
5. Delete issue
6. Filtering support
7. Sorting support
8. Validation & Security
9. Zod validation
10. Global error handling
11. Parameterized SQL queries
12. SQL injection protection
13. Secure password storage

Technology Stack:
1. Node.js ==>	Runtime environment
2. TypeScript ==>	Type safety
3. Express.js ==>	Backend framework
4. PostgreSQL ==>	Relational database
5. pg ==>	PostgreSQL client
6. bcrypt ==>	Password hashing
7. jsonwebtoken ==>	JWT authentication
8. Zod ==>	Request validation
9. dotenv ==>	Environment variables
10. tsx ==>	TypeScript execution


API Endpoints: 
 * Register User
POST /api/auth/signup
 * Login User
POST /api/auth/login
Create Issue:
 * Headers
Authorization: JWT_TOKEN
POST /api/issues
Get All Issues:
 GET /api/issues
Get Single Issue:
GET /api/issues/:id
Update Issue:
 Headers:
Authorization: JWT_TOKEN
PATCH /api/issues/:id
Delete Issue:
Headers
Authorization: JWT_TOKEN
DELETE /api/issues/:id


Environment Variables: 
Create a .env file in the root directory.
PORT ==> 
CONNECTION_STRING ==>
JWT_SECRET ==>

Author:
Md. Shahid Hossain,
Full Stack Web Developer
   
   
