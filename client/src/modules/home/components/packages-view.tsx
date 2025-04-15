'use client';

import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge'; // Shadcn badge
import { Skeleton } from '@/components/ui/skeleton'; // Shadcn skeleton

interface Package {
    id: string;
    name: string;
    location: string;
    description: string;
    rating: number;
    price: string;
    inclusions: string;
    exclusions: string;
    redirectUrl: string;
    media: { url: string }[];
}
interface PackagesViewProps {
    location: string;
}

export default function PackagesView({ location }: PackagesViewProps) {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/packages?q=location=${location}`);
                setPackages(response.data.data);
            } catch (err) {
                console.error('Error fetching packages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [location]);

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <h1 className="text-lg font-semibold mb-4">Available Packages</h1>

            <div className="space-y-6">
                {loading ? (
                    Array.from({ length: 2 }).map((_, idx) => (
                        <Skeleton key={idx} className="h-60 w-full rounded-md" />
                    ))
                ) : packages.length === 0 ? (
                    <p>No packages found for location: {location}</p>
                ) : (
                    packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row"
                        >
                            {/* Image */}
                            <div className="relative w-full md:w-64 h-60 md:h-auto flex-shrink-0">
                                <Image
                                    src={pkg.media[0]?.url || '/fallback.png'}
                                    alt={pkg.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-md md:rounded-none md:rounded-l-md"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-between flex-1 p-4">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    {/* Left Info */}
                                    <div className="flex-1 space-y-1">
                                        <h2 className="font-semibold text-lg">{pkg.name}</h2>
                                        <p className="text-sm text-gray-600">{pkg.location}</p>
                                        <p className="text-sm text-gray-500">{pkg.description}</p>

                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {pkg.inclusions
                                                .split('\n')
                                                .filter(Boolean)
                                                .map((item, i) => (
                                                    <Badge key={i} variant="outline">
                                                        {item}
                                                    </Badge>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Right Info */}
                                    <div className="flex flex-col items-end justify-center text-right min-w-[160px]">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="text-sm text-gray-700">
                                                {pkg.rating > 0 ? 'Rating' : 'Unrated'}
                                            </span>
                                            {pkg.rating > 0 && (
                                                <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded">
                                                    {pkg.rating.toFixed(1)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500 mb-1">Starting from</div>
                                        <div className="font-bold text-xl">${parseFloat(pkg.price).toFixed(2)}</div>
                                        <a
                                            href={pkg.redirectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Book Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
