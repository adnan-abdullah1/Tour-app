import { Check } from 'lucide-react';


export default async function Inclusion({ inclusions }: { inclusions: string[] }) {
    return (
        <div className=" mx-auto px-4 py-10 bg-blue-200">
            {inclusions && inclusions.map((e, index) => (<div key={index} className='flex gap-2'>
                <Check className="w-6 h-6 text-green-500" />

                <span>{e}</span>
            </div>))}
        </div>
    )
}