import PackageView from "@/modules/properties/components/package-view";

export default async function Package({params}:{params:Promise<{packageId:string}>}){
    
    return <>
        <PackageView params={params} />
    </>
}