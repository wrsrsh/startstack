"use client";

import React from "react";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import { useRouter } from 'next/navigation'; // Import useRouter


// Define your pricing plans
const pricingPlans = [
  {
    title: "Basic",
    price: "$9.99",
    frequency: "month",
    description: "Perfect for individuals and small projects",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
    ],
    productId: "prod_basic123", // Replace with your actual DODO product ID
    isPopular: false,
  },
  {
    title: "Pro",
    price: "$19.99",
    frequency: "month",
    description: "Best for growing teams and businesses",
    features: [
      "All Basic features",
      "Feature 4",
      "Feature 5",
      "Feature 6",
    ],
    productId: "pdt_a1EG4eSKFx8iPO1t53SPM", // Replace with your actual DODO product ID
    isPopular: true,
  },
  {
    title: "Enterprise",
    price: "$49.99",
frequency: "month",
    description: "Advanced features for larger organizations",
    features: [
      "All Pro features",
      "Feature 7",
      "Feature 8",
      "Feature 9",
      "Feature 10",
    ],
    productId: "prod_enterprise789", // Replace with your actual DODO product ID
    isPopular: false,
  },
];

// New Client Component for handling subscriptions
// New Client Component for handling subscriptions
function SubscriptionHandler({ productId, planName }: { productId: string; planName: string }) {
  const { toast } = useToast();
  const router = useRouter(); // Use useRouter hook

  const handleSubscription = () => {
    try {
      // 1.  Redirect to Dodo Payments checkout page.
      const dodoCheckoutURL = `https://www.checkout.dodopayments.com/buy/${productId}`;
      window.location.href = dodoCheckoutURL;
    } catch (error: any) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Subscription Error",
        description: error.message || "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button className="w-full" onClick={handleSubscription}>
      {`Subscribe to ${planName}`}
    </Button>
  );
}


export default function PricingPage() {
  return (
    <section className="flex min-h-screen flex-col">
      <Header />

      <div className="px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that works best for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.productId}
                className={`relative rounded-lg border p-6 shadow-sm flex flex-col ${plan.isPopular ? 'border-primary ring-2 ring-primary' : 'border-border'}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{plan.title}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-sm text-gray-500">/{plan.frequency}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span className="ml-2 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                 <div className="mt-auto w-full">
                <SubscriptionHandler productId={plan.productId} planName={plan.title} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Have questions about our pricing? <a href="/contact" className="text-primary font-medium hover:underline">Contact us</a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Image
          src="/dodo_payments_banner.jpg"
          alt="Dodo Payments Banner"
          width={585}
          height={121}
        />
      </div>

      <Footer />
    </section>
  );
}
