import { Search } from 'lucide-react';

interface SearchBarProps {
    query: any
    setQuery: any
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {

    const handleOnChange = (e: any) => setQuery(e.target.value)

    return(
        <form className='flex lg:ml-8 md:ml-8 sm:ml-8 lg:w-[640px] md:w-[320px] sm:w-[320px] w-[160px] items-center gap-3 rounded-md px-5 py-3 shadow-md bg-white ring-slate-600'>
            <input
                placeholder='Pesquisar notas'
                value={query}
                onChange={handleOnChange}
                className='flex-1 bg-transparent text-sm outline-none placeholder:text-slate-600 lg:w-[640px] md:w-[320px] sm:w-[320px] w-[120px]'
            />
            <Search className='lg:block lg:w-5 lg:h-5 hidden text-slate-600' />
        </form>
    )
}