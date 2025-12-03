import { NextResponse } from "next/server";

export function successResponse(data: any, message = "Success", status = 200) {
  return NextResponse.json(
    {
      status,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(message: string, status = 400, errors?: any) {
  return NextResponse.json(
    {
      status,
      message,
      ...(errors && { errors }),
    },
    { status }
  );
}

export function unauthorizedResponse(message = "Unauthorized") {
  return errorResponse(message, 401);
}

export function notFoundResponse(message = "Not found") {
  return errorResponse(message, 404);
}

export function serverErrorResponse(message = "Internal server error") {
  return errorResponse(message, 500);
}



