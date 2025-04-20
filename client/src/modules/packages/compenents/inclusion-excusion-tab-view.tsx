import Exclusion from "./exclusion-view";
import Inclusion from "./Inclusion-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PackageDetailsProps {
    packageId: string;
}
export default async function InclusionExclusionTab({ packageId }: PackageDetailsProps) {
    let data: any = null;

    try {
        const res = await fetch(`http://localhost:5000/api/package/inclusion-exclusion/${packageId}`, {
            cache: 'no-store',
        });
        data = await res.json();
    } catch (error) {
        console.error('Failed to fetch package details:', error);
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <Tabs defaultValue="inclusion" className="w-[100%]">
                <TabsList>
                    <TabsTrigger className="w-1/2" value="inclusion">Inclusion</TabsTrigger>
                    <TabsTrigger className="w-1/2" value="exclusion">Exclusion</TabsTrigger>
                </TabsList>
                <TabsContent value="inclusion">
                    <Inclusion inclusions={data?.inclusions} />
                </TabsContent>
                <TabsContent value="exclusion">
                    <Exclusion  exclusions={data?.exclusions}/>
                </TabsContent>
            </Tabs>



        </div>
    )
}