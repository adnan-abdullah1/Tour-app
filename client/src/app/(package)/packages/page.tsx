// app/packages/page.tsx

import PackagesView from "@/modules/home/components/packages-view";



export default async function Packages({ searchParams }: { searchParams: Promise<{ location: string }> }) {

  const { location } = await searchParams;


  return <PackagesView location={location || ''} />;
}
