import { Check } from "lucide-react"

export default function Exclusion({ exclusions }: { exclusions: string[] }) {

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 bg-red-200">
            {exclusions && exclusions.map((e, index) => (<div key={index} className='flex gap-2'>
                <Check className="w-6 h-6 text-distructive-500" />

                <span>{e}</span>
            </div>))}
        </div>
    )
}