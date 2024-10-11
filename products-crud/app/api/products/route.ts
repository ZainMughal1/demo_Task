// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

let products: { id: number, name: string, price: number }[] = [];
let nextId = 1;

// GET all products
export async function GET() {
    return NextResponse.json(products);
}

// POST a new product
export async function POST(request: NextRequest) {
    const { name, price } = await request.json();
    const newProduct = { id: nextId++, name, price };
    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
}
