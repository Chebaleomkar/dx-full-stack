import { NextRequest, NextResponse } from 'next/server';

type Middleware = (req: NextRequest) => Promise<NextResponse | undefined>;

export const composeMiddleware = (middlewares: Middleware[]) => {
    return async (req: NextRequest) => {
        let response: NextResponse | undefined;

        for (const middleware of middlewares) {
            response = await middleware(req);

            if (response) {
                return response; // Return the response if the middleware produced one (error, etc.)
            }
        }

        // If none of the middleware produced a response, proceed to the handler
        return; // Return undefined to indicate success and move to the next handler
    };
};
