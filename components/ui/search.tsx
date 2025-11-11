import api from '@/lib/axios-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Search = () => {


    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const delay = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await api.get(`/search?q=${encodeURIComponent(query)}`).then(d => d.data)
                setResults(res);
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        }, 400); // debounce 400ms

        return () => clearTimeout(delay);
    }, [query]);

    const navigateTo = (item: any) => {
        const type = item.type

        if (type === 'stack') {
            router.push(`/code-trail/stacks/${item.slug}`)
        } else if (type === 'module') {
            router.push(`/code-trail/modules/${item.slug}`)
        } else if (type === 'lesson') {
            router.push(`/code-trail/lessons/${item.slug}`)
        }

        setQuery("")
    }

    return (
        // <div className="flex items-center space-x-3 mr-2">
        //     <div className="relative">
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             width="24"
        //             height="24"
        //             viewBox="0 0 24 24"
        //             fill="none"
        //             stroke="currentColor"
        //             strokeWidth="2"
        //             strokeLinecap="round"
        //             strokeLinejoin="round"
        //             className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
        //             aria-hidden="true"
        //         >
        //             <path d="m21 21-4.34-4.34" />
        //             <circle cx="11" cy="11" r="8" />
        //         </svg>
        //         <input
        //             className="flex h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 pl-10 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        //             placeholder="Search lessons, problems, tags..."
        //         />
        //     </div>
        // </div>
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stacks, modules, or lessons..."
                className="w-full rounded-md bg-[#121212] border border-white/20 py-2 px-3 text-sm text-white outline-none"
            />

            {loading && (
                <div className="absolute right-3 top-2 text-gray-400 text-xs">Loading...</div>
            )}

            {results.length > 0 && (
                <div className="absolute mt-2 w-full rounded-md bg-[#1a1a1a] border border-white/10 shadow-lg max-h-60 overflow-y-auto">
                    {results.map((item) => (
                        <div
                            key={item.id}
                            className="px-3 py-2 hover:bg-white/10 cursor-pointer text-sm"
                            onClick={() => navigateTo(item)}
                        >
                            <span className="font-medium text-white">{item.name}</span>
                            <span className="block text-xs text-white/50">{item.type}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search