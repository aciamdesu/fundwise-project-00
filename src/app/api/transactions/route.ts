// src/app/api/transactions/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const dummyData = [
    { id: 1, name: "Sample Transaction", amount: 100 },
    { id: 2, name: "Another Transaction", amount: 50 },
  ];

  return NextResponse.json(dummyData);
}
