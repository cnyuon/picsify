import React from 'react';
import { SignUp } from '@clerk/nextjs';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';


const SignUpPage = () => (
  <MaxWidthWrapper>
    <div className="flex justify-center items-center">
      <SignUp />
    </div>
  </MaxWidthWrapper>
);

export default SignUpPage;
