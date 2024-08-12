'use client'

import { Pencil, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Bucket from '../../public/bucket.svg'

interface ColorMenuProps {
    data: any
}

export default function ColorMenu({ data }: ColorMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [buttonPosition, setButtonPosition] = useState<{ left: number; top: number } | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    let updateToColor = '#FFFFFF'

    const handleGetButtonValue = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget
        const buttonValue = button.value

        updateToColor = buttonValue
    }

    const handleChangeColor = async () => {
        await fetch('http://localhost:3333/task/edit', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({id: data.data.id, title: data.data.title, content: data.data.content, color: updateToColor})
        })
    }

    useEffect(() => {
        if (buttonRef.current) {
            const { left, top } = buttonRef.current.getBoundingClientRect();
            setButtonPosition({ left, top });
        }
    }, [isOpen]);

    return(
        <>
            {!isOpen ? (
                <>
                    <button ref={buttonRef} onClick={handleOpen}>
                        <Image src={Bucket} alt='' />
                    </button>
                </>
            ) : (
                <>
                    <button ref={buttonRef} onClick={handleOpen}>
                        <Pencil width={17} height={17} color='#475569' />
                    </button>
                    <div
                    className={`absolute top-[${buttonPosition!.top}px] left-[${buttonPosition!.left}px] h-fit lg:w-fit w-[250px] rounded-lg shadow-md z-20 bg-white transition-transform transform ${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{
                        transformOrigin: 'top left',
                    }}
                    >
                        <nav className='flex items-center justify-center p-2'>
                            <form onSubmit={handleChangeColor}>
                                <ul className='flex items-center justify-center flex-wrap gap-4'>
                                    <li><button className='flex items-center justify-center' onClick={handleClose}><X color={'#475569'} /></button></li>
                                    <li><button ref={buttonRef} type='submit' value={'#FFFFFF'} className='flex items-center justify-center bg-[#FFFFFF] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue} /></li>
                                    <li><button ref={buttonRef} type='submit' value={'#BAE2FF'} className='flex items-center justify-center bg-[#BAE2FF] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                    <li><button ref={buttonRef} type='submit' value={'#B9FFDD'} className='flex items-center justify-center bg-[#B9FFDD] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                    <li><button ref={buttonRef} type='submit' value={'#FFE8AC'} className='flex items-center justify-center bg-[#FFE8AC] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                    <li><button ref={buttonRef} type='submit' value={'#FFCAB9'} className='flex items-center justify-center bg-[#FFCAB9] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                    <li><button ref={buttonRef} type='submit' value={'#F99494'} className='flex items-center justify-center bg-[#F99494] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                    <li><button ref={buttonRef} type='submit' value={'#9DD6FF'} className='flex items-center justify-center bg-[#9DD6FF] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                    <li><button ref={buttonRef} type='submit' value={'#ECA1FF'} className='flex items-center justify-center bg-[#ECA1FF] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                    <li><button ref={buttonRef} type='submit' value={'#DAFF8B'} className='flex items-center justify-center bg-[#DAFF8B] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                    <li><button ref={buttonRef} type='submit' value={'#FFA285'} className='flex items-center justify-center bg-[#FFA285] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                    <li><button ref={buttonRef} type='submit' value={'#CDCDCD'} className='flex items-center justify-center bg-[#CDCDCD] rounded-full w-6 h-6 border-2 border-slate-600' onClick={handleGetButtonValue}/></li>
                                </ul>
                            </form>
                        </nav>
                    </div>
                </>
            )}
        </>

    )
}