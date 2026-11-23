import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Public property listing endpoint.
 * Supports query parameters:
 *   - city: filter by city (exact match)
 *   - minPrice, maxPrice: price range
 *   - page: pagination (default 1, 12 per page)
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const city = url.searchParams.get('city') ?? undefined;
  const minPrice = url.searchParams.get('minPrice') ? Number(url.searchParams.get('minPrice')) : undefined;
  const maxPrice = url.searchParams.get('maxPrice') ? Number(url.searchParams.get('maxPrice')) : undefined;
  const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
  const pageSize = 12;

  const where: any = {};
  if (city) where.city = city;
  if (minPrice !== undefined) where.price = { ...(where.price ?? {}), gte: minPrice };
  if (maxPrice !== undefined) where.price = { ...(where.price ?? {}), lte: maxPrice };

  const [total, properties] = await Promise.all([
    prisma.property.count({ where }),
    prisma.property.findMany({
      where,
      include: { media: { orderBy: { order: 'asc' } } },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { listingDate: 'desc' },
    }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return NextResponse.json({
    properties,
    pagination: { page, pageSize, total, totalPages },
  });
}

