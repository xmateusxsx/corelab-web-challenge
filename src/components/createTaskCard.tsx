import { useState } from "react"

export default function CreateTaskCard() {
    const [taskTitle, setTaskTitle] = useState('Título')
    const [taskContent, setTaskContent] = useState('Criar nota...')

    const handleTitleOnChange = (e: any) => {
        setTaskTitle(e.target.value)
    }

    const handleContentOnChange = (e: any) => {
        setTaskContent(e.target.value)
    }

    const handleCreateTask = async () => {
        await fetch('http://localhost:3333/task', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({title: taskTitle, content: taskContent})
        })
    }

    return(
        <div className='flex flex-col justify-center lg:rounded-md rounded-[25px] bg-white shadow-md w-[640px] h-fit py-4'>
            <form onSubmit={handleCreateTask}>
                <div className='px-4'>
                    <input className='text-xl font-bold text-slate-600 w-full' defaultValue={'Título'} onChange={handleTitleOnChange}/>
                </div>
                <div className='bg-slate-200 w-full h-[1px] my-2'/>
                <div className='px-4 h-fit'>
                    <textarea className='text-slate-600 w-full' rows={2} defaultValue={'Criar nota...'} onChange={handleContentOnChange}/>
                </div>
                {taskTitle === 'Título' || null || taskContent === 'Criar nota...' || null ? (null) : (
                    <div className='flex flex-row-reverse items-center pb-2 mt-4 mr-4 gap-4'>
                        <button type='submit' className='text-white font-bold uppercase bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md'>
                            Criar tarefa
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}