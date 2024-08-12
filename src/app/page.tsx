'use client'

import CreateTaskCard from '@/components/createTaskCard';
import Header from '@/components/header';
import TaskCard from '@/components/taskCard';
import { useEffect, useState } from 'react';

export default function Home() {
  const [favoriteTasks, setFavoriteTasks] = useState([])
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState('')

  const filterFavoriteTasks = favoriteTasks.filter((task: any) => task.title.toLowerCase().includes(query.toLowerCase()))
  const filterTasks = tasks.filter((task: any) => task.title.toLowerCase().includes(query.toLowerCase()))

  const fetchFavoriteTasks = async () => {
    const response = await fetch('http://localhost:3333/task/favorite')
    const data = await response.json()

    setFavoriteTasks(data.tasks)
  }

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/task')
    const data = await response.json()

    setTasks(data.tasks)
  }

  useEffect(() => {
    fetchFavoriteTasks()
    fetchTasks()
  }, [])

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <div className='flex flex-col lg:py-8 lg:px-24 py-8 px-8 gap-8'>
        <div className='flex items-center justify-center'>
          <CreateTaskCard />
        </div>
        <div className='flex items-center'>
        <span className='text-slate-500 font-bold'>Favoritos</span>
        </div>
        {favoriteTasks.length === 0 ? (<p className='text-slate-500'>Nenhuma tafera adicionada</p>) : (
          filterFavoriteTasks.length > 0 ? (
            <div className='grid grid-cols-12 grid-rows-3 gap-6 pb-12'>
              {filterFavoriteTasks.map((task: any) => 
              <TaskCard key={task.id} data={task}/>
              )}
            </div>
          ) : (
            <p className='text-slate-500'>Nenhuma tafera adicionada</p>
          )
        )}
        <div className='flex items-center'>
        <span className='text-slate-500 font-bold'>Outros</span>
        </div>
        {tasks.length === 0 ? (<p className='text-slate-500'>Nenhuma tafera adicionada</p>) : (
          filterTasks.length > 0 ? (
            <div className='grid grid-cols-12 grid-rows-3 gap-6 pb-12'>
              {filterTasks.map((task: any) => 
              <TaskCard key={task.id} data={task}/>
              )}
            </div>
          ) : (
            <p className='text-slate-500'>Nenhuma tafera adicionada</p>
          )
        )}
      </div>
    </>
  );
}
