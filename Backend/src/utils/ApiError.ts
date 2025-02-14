class ApiError extends Error {
    public statusCode: number;
    public data: null;
    public success: boolean;
    public errors: any[];

    constructor(
        statusCode: number,
        message = "Something went wrong",
        errors: any[] = [],
        stack?: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        // Capture stack trace if provided, otherwise use Error.captureStackTrace
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
