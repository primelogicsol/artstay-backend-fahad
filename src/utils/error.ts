export class AppError extends Error {
    public message: string;
    public statusCode: number;
    public errorCode?: string;

    constructor(message: string, statusCode: number = 500, errorCode?: string) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = 'AppError';
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404, 'NOT_FOUND');
        this.name = 'NotFoundError';
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, 401, 'UNAUTHORIZED');
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, 403, 'FORBIDDEN');
        this.name = 'ForbiddenError';
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409, 'CONFLICT');
        this.name = 'ConflictError';
    }
}

export class ExternalServiceError extends AppError {
    public serviceName: string;

    constructor(message: string, serviceName: string) {
        super(message, 502, 'EXTERNAL_SERVICE_ERROR');
        this.serviceName = serviceName;
        this.name = 'ExternalServiceError';
    }
} 