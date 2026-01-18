"use client";

import { useRouter } from 'next/navigation';
import SomethingToAddForm from '@/components/flow/SomethingToAddForm';

export default function SomethingToAddClient() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/contact-simple');
  };

  const handleBack = () => {
    router.push('/choice');
  };

  return (
    <SomethingToAddForm
      onNext={handleNext}
      onBack={handleBack}
    />
  );
}
