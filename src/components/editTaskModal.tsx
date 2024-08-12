import { X } from "lucide-react";
import { useState } from "react";

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any
  }

export default function EditTaskModal({ isOpen, onClose, data }: EditTaskModalProps) {
    const [taskTitle, setTaskTitle] = useState(data.data.title)
    const [taskContent, setTaskContent] = useState(data.data.content)

    if (!isOpen) return null;

    const handleTitleOnChange = (e: any) => {
        setTaskTitle(e.target.value)
    }

    const handleContentOnChange = (e: any) => {
        setTaskContent(e.target.value)
    }

    const handleTaskEdit = async () => {
        await fetch('http://localhost:3333/task/edit', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({id: data.data.id, title: taskTitle, content: taskContent, color: data.data.color})
        })
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={onClose}>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md' onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleTaskEdit}>
                    <div className='flex justify-between items-center border-b border-slate-200 pb-2 mb-4 gap-4'>
                        <input className='text-lg font-semibold w-full' defaultValue={taskTitle} onChange={handleTitleOnChange}/>
                        <button className='text-slate-600' onClick={onClose}>
                            <X />
                        </button>
                    </div>
                    <div>
                        <textarea className='w-full' rows={15} defaultValue={taskContent} onChange={handleContentOnChange}/>
                    </div>
                    <div className='flex flex-row-reverse items-center pb-2 mt-4 gap-4'>
                        <button type='submit' className='text-white font-bold uppercase bg-green-500 hover:bg-green-600 py-3 px-6 rounded-md'>
                            Editar
                        </button>
                        <button className='text-white font-bold uppercase bg-slate-500 hover:bg-slate-600 py-3 px-6 rounded-md' onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}