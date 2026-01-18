"use client";

import { useRouter } from 'next/navigation';
import ContactFormSimple from '@/components/flow/ContactFormSimple';

export default function ContactSimpleClient() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/something-to-add');
  };

  return (
    <ContactFormSimple
      onBack={handleBack}
    />
  );
}
