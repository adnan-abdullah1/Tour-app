import PackageHighlight from "@/modules/packages/compenents/package-highlights-view";
import PackageDetails from "./package-details";
import PackageDayPlan from "@/modules/packages/compenents/day-plan-view";
import PackageProperties from "@/modules/packages/compenents/properties";
import PackageFaqs from "@/modules/packages/compenents/faq-view";
import PackagePolicies from "@/modules/packages/compenents/policy-view";
import PackagePlaceToSee from "@/modules/packages/compenents/places-to-see-view";
import InclusionExclusionTab from "@/modules/packages/compenents/inclusion-excusion-tab-view";

export default async function PackageView({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;
  return (
    <div >
      <PackageDetails   packageId={packageId} />
      <PackageHighlight />
      <PackagePlaceToSee />
      <InclusionExclusionTab  packageId={packageId}/>
      <PackageDayPlan />
      <PackageProperties />
      <PackagePolicies />
      <PackageFaqs />
    </div>
  );
}
