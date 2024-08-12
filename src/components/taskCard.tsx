'use client'

import { File, Pencil, Star, X } from 'lucide-react';
import ColorMenu from './colorMenu';
import { useState } from 'react';
import EditTaskModal from './editTaskModal';
import Link from 'next/link';

export default function TaskCard(data: any) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    const handleFavorite = async () => {
        let favorite = data.data.favorite

        if(favorite) {
            favorite = false
        } else {
            favorite = true
        }

        await fetch('http://localhost:3333/task/favorite', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({id: data.data.id, favorite: favorite})
        })
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    
        const file = e.dataTransfer.files[0]
        setSelectedFile(file)
    };

    const handleFileUpload = async () => {
          const formData = new FormData()
        formData.append('file', selectedFile!)
        formData.append('file_name', selectedFile!.name)
        formData.append('task_id', data.data.id)
        
        await fetch('http://localhost:3333/file', {
            method: 'POST',
            body: formData
        })
    }

    const handleDelete = async () => {
        await fetch('http://localhost:3333/task', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({id: data.data.id})
        })
    }

    return(
        <div className='flex flex-col rounded-[25px] overflow-hidden shadow-md row-span-3 lg:col-span-4 md:col-span-6 sm:col-span-12 col-span-12 py-4 gap-4' style={{backgroundColor: data.data.color}}>
            <div className='flex items-center justify-between px-4'>
                <p className='text-xl text-wrap font-bold text-slate-600'>{data.data.title}</p>
                <form onSubmit={handleFavorite}>
                    <button className='flex items-center' type='submit'>
                        {!data.data.favorite ? (<Star color='#475569' />) : (<Star fill='#facc15' color='#475569'/>)}
                    </button>
                </form>
            </div>
            <div className='bg-slate-200 w-full h-[1px]'/>
            <div className='max-w-full min-h-[250px] max-h-[250px] px-4 overflow-scroll overflow-x-hidden'>
                <p className='text-slate-600 break-words'>{data.data.content}</p>
            </div>
            {!selectedFile ? (
                !data.data.file ? (
                    <div className='flex items-center justify-center px-4' onDragOver={handleDragOver} onDrop={handleDrop}>
                        <div className='flex items-center justify-center w-full h-fit border-2 border-dashed border-slate-600 p-4'>
                            <p className='text-slate-600 break-words'>Arraste um arquivo</p>
                        </div>
                    </div>
                    ) : (
                    <div className='flex items-center justify-center px-4'>
                        <div className='flex items-center justify-center w-full h-fit border-2 border-dashed border-slate-600 p-4'>
                            <Link className='flex items-center justify-center text-slate-600 break-words w-full h-full gap-2' target='_blank' href={`http://localhost:3333/file/${data.data.file.file_name}`}>
                                <File width={24} height={24}/>
                                {data.data.file.file_name}
                            </Link>
                        </div>
                    </div>
                    )
            ) : (
                <div className='flex items-center justify-center px-4'>
                    <form onSubmit={handleFileUpload}>
                        <div className='flex items-center justify-center w-full h-fit'>
                            <button type='submit' className='text-white bg-green-500 hover:bg-green-600 font-bold uppercase rounded-md w-full h-full p-4'>Enviar arquivo</button>
                        </div>
                    </form>
                </div>
            )}
            <div className='flex items-center justify-between px-4'>
                <div className="flex items-center gap-4">
                    <button onClick={openModal}>
                        <Pencil width={17} height={17} color='#475569' />
                    </button>
                    <ColorMenu data={data} />
                </div>
                <div className='flex items-center'>
                    <form onSubmit={handleDelete}>
                        <button type='submit'>
                            <X color='#475569' />
                        </button>
                    </form>
                </div>
            </div>
            <EditTaskModal isOpen={isModalOpen} onClose={closeModal} data={data} />
        </div>
    )
}