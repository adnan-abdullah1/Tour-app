'use client';

import { useSearchParams } from 'next/navigation';
import PackagesView from '@/app/(package)/packages/_components/packages-view';

export default function Packages() {
  const searchParams = useSearchParams();

  const location = searchParams.get('location') || '';
  const date = searchParams.get('date') || '';
  const duration = searchParams.get('duration') || '';

  return (
    <PackagesView 
      location={location} 
      date={date} 
      duration={duration} 
    />
  );
}
