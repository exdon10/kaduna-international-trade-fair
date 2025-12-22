'use client';

import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

export default function DashboardPage() {
  const firestore = useFirestore();
  const sponsorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'sponsors');
  }, [firestore]);

  const { data: sponsors, isLoading } = useCollection(sponsorsQuery);

  const totalRevenue = sponsors?.reduce((acc, sponsor) => acc + sponsor.amountPaid, 0) || 0;
  const totalSponsors = sponsors?.length || 0;
  const averageSponsorship = totalSponsors > 0 ? totalRevenue / totalSponsors : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };
  
  return (
    <>
        <h2 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? '...' : formatCurrency(totalRevenue)}</div>
                    <p className="text-xs text-muted-foreground">Total funds raised from all sponsors</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? '...' : totalSponsors}</div>
                    <p className="text-xs text-muted-foreground">Number of organizations and individuals</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Sponsorship</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? '...' : formatCurrency(averageSponsorship)}</div>
                    <p className="text-xs text-muted-foreground">Average sponsorship amount</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Newest Sponsor</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{isLoading ? '...' : sponsors?.[0]?.company || sponsors?.[0]?.fullName || 'N/A' }</div>
                    <p className="text-xs text-muted-foreground">Most recent sponsorship registration</p>
                </CardContent>
            </Card>
        </div>
        <div className="mt-8">
            {/* You can add charts or recent activity feeds here */}
            <Card>
                <CardHeader>
                    <CardTitle>More Analytics Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Detailed charts and activity feeds will be available here in the future.</p>
                </CardContent>
            </Card>
        </div>
    </>
  );
}
