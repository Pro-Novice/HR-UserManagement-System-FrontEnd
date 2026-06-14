# 1st-Stage---User_Candidate-Management-System-without-Employee_HR-integration
Stage 1 (Completed): User–Candidate Management System manages candidate registration, authentication, profiles, and CRUD operations without HR integration. It builds the base platform. Remaining -> Stage 2 adds HR workflow and PDF generation. Stage 3 integrates PostgreSQL as an off-chain database. Stage 4 introduces Hyperledger Fabric blockchain.

Here is an elaborated project description for **Stage 1** and the overall roadmap with future stages:

---

# Project Title

**User–Candidate Management System (UCMS) – A Progressive Digital Recruitment Management Platform**

## Stage 1: User–Candidate Management System without Employee/HR Integration

### Overview

The first stage focuses on developing a **User–Candidate Management System (UCMS)** that provides a centralized platform for managing candidate information throughout the initial recruitment lifecycle. The objective of this stage is to establish a secure and scalable foundation for candidate registration, profile management, authentication, and data handling before introducing HR workflows and advanced integrations.

The system is designed to digitize the traditional candidate data collection process, replacing manual forms and spreadsheet-based storage with a structured web-based application.

---

## Objectives of Stage 1

The primary goals of this stage are:

* Develop a secure candidate registration and management portal
* Provide authentication and authorization mechanisms
* Maintain candidate profile information digitally
* Enable CRUD operations on candidate records
* Establish a backend architecture that can support future HR, database, and blockchain integrations

---

# Core Functional Modules

## 1. User Registration Module

The system allows new candidates/users to create an account by providing essential details such as:

* First Name
* Last Name
* Email Address
* Mobile Number
* Date of Birth
* Gender
* Address Details
* Password

During registration:

* Input validation is performed
* Duplicate email registration is prevented
* Passwords are securely encrypted before storage
* User credentials are maintained securely

---

## 2. User Authentication Module

A secure login mechanism is implemented to verify candidate identity.

Features include:

* Email and password-based authentication
* Password hashing using secure algorithms
* Session/token-based access control
* Protected API routes

Only authenticated users can access their profile-related operations.

---

## 3. Candidate Profile Management

After successful authentication, candidates can manage their personal profile.

The candidate can:

* View profile details
* Update personal information
* Modify contact details
* Maintain educational/professional information

This creates a single source of truth for candidate data.

---

## 4. Candidate Data Management (CRUD Operations)

The system supports complete lifecycle management of candidate records.

### Create

New candidate records can be created.

Example:

```
Candidate Registration
        ↓
Profile Creation
        ↓
Data Storage
```

---

### Read

Authorized users can retrieve candidate information.

Example:

* Candidate dashboard
* Profile display
* Candidate search

---

### Update

Candidates can update existing information.

Example:

Before:

```
Phone:
9876543210
```

After:

```
Phone:
9123456780
```

---

### Delete

Candidate records can be removed based on authorization rules.

---

# Technical Architecture (Stage 1)

## Frontend Layer

Responsible for:

* User interface
* Forms
* Validation
* User interaction

Possible technologies:

* HTML
* CSS
* JavaScript
* React (future enhancement)

---

## Backend Layer

Responsible for:

* API handling
* Business logic
* Authentication
* Data processing

Technology stack:

* Node.js
* Express.js

---

## Database Layer (Initial)

Stage 1 uses a development database setup.

Example:

* MongoDB local instance

Storage includes:

```
Users Collection

{
 firstname,
 lastname,
 email,
 phone,
 address,
 password,
 dateOfRegistration
}
```

---

# Security Implementation

Security considerations included in Stage 1:

### Password Security

Passwords are never stored in plain text.

Process:

```
Password
    |
    ↓
Hashing Algorithm
    |
    ↓
Encrypted Password Storage
```

---

### API Security

Protected routes ensure that only authenticated users can access sensitive operations.

---

# Stage 1 Limitations

The first stage intentionally excludes:

* HR management
* Employee onboarding
* Resume processing
* Document generation
* External database synchronization
* Blockchain verification

These are introduced in later stages.

---

# Future Development Roadmap

---

# Stage 2: HR Integration and PDF Generation

The second stage introduces the **HR Management Layer**.

The system will be extended to allow HR personnel to interact with candidate information.

New modules:

## HR Dashboard

HR users will be able to:

* View registered candidates
* Search candidates
* Filter candidates
* Shortlist/reject candidates
* Update recruitment status

Example workflow:

```
Candidate
    |
Registration
    |
HR Review
    |
Shortlisted / Rejected
```

---

## Resume / Profile PDF Generation

A document generation module will be added.

Features:

* Generate candidate profile PDF
* Download resume summary
* Generate application reports

Example:

```
Candidate Data
      |
      ↓
PDF Generator
      |
      ↓
Candidate Resume PDF
```

---

# Stage 3: PostgreSQL Off-chain Database Integration

The third stage introduces a production-grade relational database layer.

The system will migrate from simple database storage to:

**PostgreSQL as an off-chain database**

Purpose:

* Better transaction management
* Structured relational storage
* Improved querying capability
* Enterprise-level scalability

Architecture:

```
Application Layer
        |
        |
   PostgreSQL
        |
        |
 Candidate Records
 HR Records
 Recruitment Status
```

---

## Off-chain Data Storage

Data stored in PostgreSQL:

* Candidate profiles
* HR actions
* Recruitment workflow
* Audit information

Advantages:

* High performance
* Strong consistency
* SQL-based reporting
* Data analytics support

---

# Stage 4: Hyperledger Fabric Blockchain Integration

The final stage introduces blockchain technology for trust, transparency, and verification.

A permissioned blockchain network using:

**Hyperledger Fabric**

will be integrated.

---

## Objective

To create a tamper-resistant recruitment ecosystem.

Blockchain will store:

* Candidate verification records
* HR approvals
* Recruitment events
* Document hashes
* Audit trails

---

## Blockchain Architecture

```
Candidate
    |
    |
Application System
    |
    |
Hyperledger Fabric Network
    |
    |
Immutable Ledger
```

---

## Smart Contract (Chaincode) Functions

Examples:

### Candidate Verification

```
verifyCandidate()
```

### Record Recruitment Status

```
updateApplicationStatus()
```

### Document Validation

```
verifyDocumentHash()
```

---

# Complete System Evolution

```
Stage 1
---------
User Candidate Management
Authentication
CRUD Operations
MongoDB


        ↓


Stage 2
---------
HR Integration
Recruitment Workflow
PDF Generation


        ↓


Stage 3
---------
PostgreSQL
Off-chain Data Layer
Enterprise Storage


        ↓


Stage 4
---------
Hyperledger Fabric
Blockchain Ledger
Immutable Verification
```

---

## Final Vision

The completed system evolves from a simple candidate management portal into a **secure, enterprise-grade recruitment ecosystem** combining:

* Web application technologies
* Relational databases
* Document automation
* Blockchain-based trust mechanisms

The staged implementation ensures modular development, easier testing, and smooth migration from a basic recruitment platform to a decentralized and transparent hiring solution.
