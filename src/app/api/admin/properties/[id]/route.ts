import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

/**
 * Admin fetch a single property.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: { media: { orderBy: { order: 'asc' } } },
  });
  if (!property) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
  return NextResponse.json(property);
}

/**
 * Admin update a property. Supports partial updates and image re‑ordering.
 * Body can contain any property fields and an optional `images` array of base64 strings.
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const { title, price, address, city, state, zip, bedrooms, bathrooms, squareFeet, listingDate, images } = body;

  // Update basic fields
  const updated = await prisma.property.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(price && { price }),
      ...(address && { address }),
      ...(city && { city }),
      ...(state && { state }),
      ...(zip && { zip }),
      ...(bedrooms && { bedrooms }),
      ...(bathrooms && { bathrooms }),
      ...(squareFeet && { squareFeet }),
      ...(listingDate && { listingDate: new Date(listingDate) }),
    },
  });

  // If images provided, replace existing media records
  if (Array.isArray(images)) {
    // Delete existing media first
    await prisma.media.deleteMany({ where: { propertyId: id } });
    // Re‑create media from new images (order preserved)
    const mediaCreates = images.map(async (base64: string, idx: number) => {
      const { url, publicId } = await (await import('@/lib/cloudinary')).uploadImage(base64);
      return prisma.media.create({
        data: {
          imageUrl: url,
          imagePublicId: publicId,
          order: idx,
          propertyId: id,
        },
      });
    });
    await Promise.all(mediaCreates);
  }

  const result = await prisma.property.findUnique({
    where: { id },
    include: { media: { orderBy: { order: 'asc' } } },
  });
  return NextResponse.json(result);
}

/**
 * Admin delete a property and its media.
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  const { id } = await params;
  // Delete media first (cascade not set in schema)
  await prisma.media.deleteMany({ where: { propertyId: id } });
  await prisma.property.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
