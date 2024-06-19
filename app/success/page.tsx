import Link from 'next/link';

export default function Success() {
  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold mb-5 justify-center items-center flex flex-col">Payment Successful</h1>
      <p className="mb-5 justify-center items-center flex flex-col">Thank you for your purchase! Your credits have been added to your account.</p>
      <Link href="/restore">
        <p className="text-blue-600 justify-center items-center flex flex-col">Go back to Restore</p>
      </Link>
    </div>
  );
}
