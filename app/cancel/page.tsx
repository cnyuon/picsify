import Link from 'next/link';

export default function Cancel() {
  return (
    <div className="container mx-auto py-20 justify-center items-center flex flex-col">
      <h1 className="text-4xl font-bold mb-5 ">Payment Cancelled</h1>
      <p className="mb-5">Your payment was not successful. Please try again.</p>
      <Link href="/buycredits">
        <p className="text-blue-600">Go back to Buy Credits</p>
      </Link>
    </div>
  );
}