"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '@clerk/nextjs';  // Import Clerk's useUser hook
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Image from "next/image"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const API_URL = "https://picsify-backend-2e4780a97926.herokuapp.com";

const BuyCredits = () => {
  const router = useRouter();
  const { user } = useUser();  // Get the user object

  const handleBuy = async (name: string, amount: number) => {
    try {
      const response = await axios.post(`${API_URL}/create-checkout-session`, {
        name,
        amount,
        metadata: {
          user_id: user?.id,  // Pass the user ID as metadata
        },
      });

      console.log("Response from /create-checkout-session:", response.data);
      const { id } = response.data;

      if (!id) {
        console.error("Stripe Session ID is missing in the response.");
        return;
      }

      console.log("Stripe Session ID:", id);

      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: id });
        if (error) {
          console.error('Error redirecting to checkout:', error);
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }


    
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <h1 className="font-bold text-2xl mb-5">Buy Credits</h1>
      <p className="mb-7 text-muted-foreground">Choose whatever best fits your needs.</p>
      <div className="flex flex-wrap justify-center gap-10 mb-10">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Standard</CardTitle>
            <CardDescription>For casual users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <h1 className="font-bold text-3xl flex justify-center items-center">$10</h1>
              <div className="flex flex-col space-y-1.5">
                <span className="flex items-center">
                  <Image src="/images/check.png" alt="Logo" className='h-3 w-3 mr-2' width={3} height={3} />
                  <p>200 credits</p>
                </span>
                <span className="flex items-center">
                  <Image src="/images/check.png" alt="Logo" className='h-3 w-3 mr-2' width={3} height={3} />
                  <p>$0.05 per image restoration</p>
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => handleBuy('Standard', 1000)}>Buy</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For content creators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <h1 className="font-bold text-3xl flex justify-center items-center">$20</h1>
              <div className="flex flex-col space-y-1.5">
                <span className="flex items-center">
                  <Image src="/images/check.png" alt="Logo" className='h-3 w-3 mr-2' width={3} height={3} />
                  <p>500 credits</p>
                </span>
                <span className="flex items-center">
                  <Image src="/images/check.png" alt="Logo" className='h-3 w-3 mr-2' width={3} height={3} />
                  <p>$0.04 per image restoration</p>
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => handleBuy('Pro', 2000)}>Buy</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="border-t">
        <p className="mt-10 mb-10 text-2xl">Frequently Asked Questions</p>
      </div>
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is there a free trial?</AccordionTrigger>
            <AccordionContent>Yes. When you create an account for the first time you get 5 free credits.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="divider mt-5"></div>

      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How can I get more credits?</AccordionTrigger>
            <AccordionContent>You can visit the buy credits page.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="divider mt-5"></div>


    </div>
  );
};

export default BuyCredits;
