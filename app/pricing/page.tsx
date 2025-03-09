'use client';
import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { PageTitle } from "@/components/page-title";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/loading";

// Dynamically import Header
const Header = dynamic(() => import("@/app/_components/header").then((mod) => mod.Header));
// Optionally include Footer if needed
const Footer = dynamic(() => import("@/app/_components/footer").then((mod) => mod.Footer));

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
    productId: "prod_pro456", // Replace with your actual DODO product ID
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

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubscription = async (productId: string, planName: string) => {
    try {
      setLoading(productId);
      
      // Create a checkout session with DODO
      const session = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          planName,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      });
      
      const { checkoutUrl } = await session.json();
      
      if (checkoutUrl) {
        // Redirect to DODO checkout
        window.location.href = checkoutUrl;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="flex min-h-screen flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      
      <div className="px-4 py-8 flex-grow">
        {/* <PageTitle selfLabel="Pricing" /> */}
        
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
                className={`relative rounded-lg border p-6 shadow-sm ${
                  plan.isPopular ? 'border-primary ring-2 ring-primary' : 'border-border'
                }`}
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
                
                <Button
                  className="mt-8 w-full"
                  variant={plan.isPopular ? "default" : "outline"}
                  onClick={() => handleSubscription(plan.productId, plan.title)}
                  disabled={loading === plan.productId}
                >
                  {loading === plan.productId ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    `Subscribe to ${plan.title}`
                  )}
                </Button>
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
      
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </section>
  );
}