// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

let products: { id: number, name: string, price: number }[] = [];

// GET a product by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const product = products.find(p => p.id === Number(params.id));
    if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
}

// PUT (update) a product by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { name, price } = await req.json();
    const productIndex = products.findIndex(p => p.id === Number(params.id));
    if (productIndex === -1) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    products[productIndex] = { ...products[productIndex], name, price };
    return NextResponse.json(products[productIndex]);
}

// DELETE a product by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    products = products.filter(p => p.id !== Number(params.id));
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 204 });
}
