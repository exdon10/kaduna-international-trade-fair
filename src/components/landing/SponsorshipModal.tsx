'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMonnifyPayment } from '@/hooks/use-monnify';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Loader2 } from 'lucide-react';

export type SponsorshipTierInfo = {
  name: string;
  price: string;
  amount: number;
  description?: string;
  benefits: string | string[];
  highlight?: boolean;
  per?: string;
  assets?: string[];
};

type SponsorshipModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tier: SponsorshipTierInfo;
};

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;


function SponsorshipForm({ 
  tier, 
  onClose,
  isSubmitting,
  setIsSubmitting
}: { 
  tier: SponsorshipTierInfo, 
  onClose: () => void,
  isSubmitting: boolean,
  setIsSubmitting: (isSubmitting: boolean) => void
}) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
    },
  });
  
  const paymentReference = `KAD-TF-${tier.name.replace(/\s+/g, '-')}-${new Date().getTime()}`;

  const { initializePayment, isInitializing } = useMonnifyPayment({
    amount: tier.amount,
    currency: 'NGN',
    description: `Sponsorship for: ${tier.name}`,
    customerFullName: form.watch('fullName'),
    customerEmail: form.watch('email'),
    paymentReference: paymentReference,
    onComplete: async (response) => {
      console.log('Payment successful', response);
      if (!firestore) {
        toast({
          title: 'Error Saving Record',
          description: 'Firestore is not available. Please contact support.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }
      
      try {
        const sponsorsCollection = collection(firestore, 'sponsors');
        addDocumentNonBlocking(sponsorsCollection, {
          ...form.getValues(),
          sponsorshipTier: tier.name,
          amountPaid: tier.amount,
          paymentReference: response.paymentReference,
          createdAt: serverTimestamp(),
        });
        toast({
          title: 'Payment Successful!',
          description: 'Thank you for your sponsorship. Your record has been saved.',
          variant: 'default',
        });
      } catch (error) {
         console.error("Error initiating save to Firestore:", error);
         toast({
          title: 'Payment Successful (Save Error)',
          description: 'Your payment succeeded, but we couldn\'t save the record. Please contact support.',
          variant: 'destructive',
        });
      } finally {
        onClose();
        form.reset();
        setIsSubmitting(false);
      }
    },
    onClose: () => {
      console.log('Payment widget closed.');
      setIsSubmitting(false); // Re-enable form if payment is cancelled
    },
  });

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    initializePayment();
  };

  const totalLoading = isInitializing || isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company/Organization</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={totalLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={totalLoading}>
            {totalLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {totalLoading ? 'Processing...' : `Pay ${tier.price}`}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}


export function SponsorshipModal({
  isOpen,
  onClose,
  tier,
}: SponsorshipModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setIsSubmitting(false);
        onClose();
      } else {
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Become a Sponsor</DialogTitle>
          <DialogDescription>
            Complete your details to proceed with the{' '}
            <span className="font-semibold text-primary">{tier.name}</span>{' '}
            package ({tier.price}).
          </DialogDescription>
        </DialogHeader>
        <SponsorshipForm 
          tier={tier} 
          onClose={() => {
            setIsSubmitting(false);
            onClose();
          }}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
