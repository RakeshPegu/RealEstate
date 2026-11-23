import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

// Server component – fetch admin properties
//export const dynamic = 'force-dynamic';

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({
    include: { media: { orderBy: { order: 'asc' } } },
    orderBy: { listingDate: 'desc' },
  });

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Property Catalog – Admin</CardTitle>
          <Link href="/admin/properties/new">
            <Button>Create New Property</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Images</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.title}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell>{p.city}, {p.state}</TableCell>
                  <TableCell>{p.media.length}</TableCell>
                  <TableCell className="space-x-2">
                    <Link href={`/admin/properties/${p.id}`}>Edit</Link>
                    <form method="post" action={`/api/admin/properties/${p.id}`} onSubmit={(e) => {
                      if (!confirm('Delete this property?')) e.preventDefault();
                    }} style={{ display: 'inline' }}>
                      <input type="hidden" name="_method" value="DELETE" />
                      <Button type="submit" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

