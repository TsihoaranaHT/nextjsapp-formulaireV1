"use client";

import { useRouter } from 'next/navigation';
import SearchResultChoice from '@/components/flow/SearchResultChoice';

export default function ChoiceClient() {
  const router = useRouter();

  const handleChooseSelection = () => {
    router.push('/selection');
  };

  const handleChooseSomethingToAdd = () => {
    router.push('/something-to-add');
  };

  return (
    <SearchResultChoice
      onChooseSelection={handleChooseSelection}
      onChooseSomethingToAdd={handleChooseSomethingToAdd}
    />
  );
}
