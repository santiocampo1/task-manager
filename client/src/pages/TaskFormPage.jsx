import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue('title', task.title);
        setValue('description', task.description);
      }
    }

    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
    }
    navigate('/tasks');
  });

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='Title' {...register('title')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' autoFocus />
        <textarea rows='3' placeholder='Description' {...register('description')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md m2-2'></textarea>
        <button>Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage