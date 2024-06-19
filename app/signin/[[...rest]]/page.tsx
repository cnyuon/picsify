'use client'

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';


const SignInPage = () => (
  <MaxWidthWrapper>
    <div className="flex justify-center items-center mt-10">
      <SignIn signUpUrl="/signup"/>
    </div>
  </MaxWidthWrapper>
);

export default SignInPage;
