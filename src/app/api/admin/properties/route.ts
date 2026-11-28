import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/db';

/**
 * Admin: list all properties (paginated).
 */
export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  const url = new URL(request.url);
  const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
  const pageSize = 20;

  const [total, properties] = await Promise.all([
    prisma.property.count(),
    prisma.property.findMany({
      include: { media: { orderBy: { order: 'asc' } } },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { listingDate: 'desc' },
    }),
  ]);

  return NextResponse.json({
    properties,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
}

/**
 * Admin: create a new property.
 */
export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  const body = await request.json();
  const { title, price, address, city, state, zip, bedrooms, bathrooms, squareFeet, listingDate } = body;

  if (!title || !price || !address || !city) {
    return NextResponse.json({ error: 'title, price, address, and city are required' }, { status: 400 });
  }

  const property = await prisma.property.create({
    data: {
      title,
      price: Number(price),
      address,
      city,
      state: state ?? '',
      zip: zip ?? '',
      bedrooms: bedrooms ? Number(bedrooms) : 0,
      bathrooms: bathrooms ? Number(bathrooms) : 0,
      squareFeet: squareFeet ? Number(squareFeet) : 0,
      listingDate: listingDate ? new Date(listingDate) : new Date(),
    },
  });

  return NextResponse.json(property, { status: 201 });
}

