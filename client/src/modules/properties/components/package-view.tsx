import PackageHighlight from "@/modules/packages/compenents/package-highlights-view";
import PackageDetails from "./package-details";
import PackageDayPlan from "@/modules/packages/compenents/day-plan-view";
import PackageProperties from "@/modules/packages/compenents/properties";
import PackageFaqs from "@/modules/packages/compenents/faq-view";
import PackagePolicies from "@/modules/packages/compenents/policy-view";
import PackagePlaceToSee from "@/modules/packages/compenents/places-to-see-view";

export default async function PackageView({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  return (
    <div >
      <PackageDetails />
      <PackageHighlight />
      <PackagePlaceToSee />
      <PackageDayPlan />
      <PackageProperties />
      <PackagePolicies />
      <PackageFaqs />
    </div>
  );
}
