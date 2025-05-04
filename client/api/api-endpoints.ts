export const apiBaseUrl = {
    api: process.env.NEXT_PUBLIC_API_URL,

};


export const apiEndpoints = {
   
    //package
    packageList: (queryList: Record<string, string>) =>
        `package?${new URLSearchParams(queryList).toString()}`,

}