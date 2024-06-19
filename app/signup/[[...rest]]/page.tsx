import React from 'react';
import { SignUp } from '@clerk/nextjs';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';


const SignUpPage = () => (
  <MaxWidthWrapper>
    <div className="flex justify-center items-center mt-10">
      <SignUp signInUrl="/signin" fallbackRedirectUrl="/restore"/>
    </div>
  </MaxWidthWrapper>
);

export default SignUpPage;
