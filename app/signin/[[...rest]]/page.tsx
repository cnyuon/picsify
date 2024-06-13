'use client'

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';


const SignInPage = () => (
  <MaxWidthWrapper>
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  </MaxWidthWrapper>
);

export default SignInPage;
