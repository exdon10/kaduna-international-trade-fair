'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { SponsorTable } from '@/components/admin/SponsorTable';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function SponsorsPage() {
  const firestore = useFirestore();

  const sponsorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'sponsors'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: sponsors, isLoading: isLoadingSponsors, error } = useCollection(sponsorsQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sponsors List</CardTitle>
        <CardDescription>
          A list of all sponsors who have made payments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingSponsors && <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {error && <div className="text-destructive p-4 text-center">Error loading sponsors: {error.message}</div>}
        {sponsors && <SponsorTable sponsors={sponsors} />}
      </CardContent>
    </Card>
  );
}
