'use client';

import type { WithId } from '@/firebase';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { format } from 'date-fns';

type Sponsor = {
    fullName: string;
    email: string;
    phone: string;
    company?: string;
    sponsorshipTier: string;
    amountPaid: number;
    paymentReference: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
};

type SponsorTableProps = {
  sponsors: WithId<Sponsor>[];
};

export function SponsorTable({ sponsors }: SponsorTableProps) {
  if (sponsors.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No sponsors yet.</p>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };
  
  const formatDate = (timestamp: { seconds: number; nanoseconds: number; }) => {
    if (!timestamp || !timestamp.seconds) {
      return 'N/A';
    }
    const date = new Date(timestamp.seconds * 1000);
    return format(date, "MMMM d, yyyy 'at' h:mm a");
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead className="text-right">Amount Paid</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sponsors.map((sponsor) => (
            <TableRow key={sponsor.id}>
              <TableCell className="font-medium">{sponsor.fullName}</TableCell>
              <TableCell>{sponsor.email}</TableCell>
              <TableCell>{sponsor.sponsorshipTier}</TableCell>
              <TableCell className="text-right">{formatCurrency(sponsor.amountPaid)}</TableCell>
              <TableCell>{formatDate(sponsor.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
