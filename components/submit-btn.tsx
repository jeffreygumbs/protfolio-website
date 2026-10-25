import { FaPaperPlane } from 'react-icons/fa';
import { useFormStatus } from 'react-dom'

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='group flex h-12 w-32 items-center justify-center gap-2 self-end rounded-full bg-gray-900 font-medium text-white transition-all hover:scale-105 hover:bg-gray-950 focus:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 active:scale-100 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 dark:bg-white/15 dark:text-white dark:hover:bg-white/25'
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Submit
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}
