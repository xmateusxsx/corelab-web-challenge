import SearchBar from './searchBar';
import Logo from '../../public/logo.png'
import Image from 'next/image';
import { X } from 'lucide-react';

interface HeaderProps {
    query: any
    setQuery: any
}

export default function Header({ query, setQuery }: HeaderProps) {
    return(
        <div className='flex items-center lg:justify-between w-full bg-white py-4 lg:px-8 md:px-8 sm:px-8 px-4 shadow-lg'>
            <div className='flex items-center gap-5'>
                <Image
                src={Logo}
                className='lg:h-12 lg:w-12 md:h-12 md:w-12 sm:h-12 sm:w-12 h-8 w-8'
                width={100}
                height={100}
                alt='' 
                />
                <div className='flex items-center'>
                    <h1>CoreNotes</h1>
                </div>
                <SearchBar query={query} setQuery={setQuery} />
            </div>
            <div className='flex lg:items-center items-end justify-end w-full gap-5'>
                <button>
                    <X />
                </button>
            </div>
        </div>
    )
}