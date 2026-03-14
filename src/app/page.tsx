import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data, error } = await supabase.from('test').select('*');
  
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Error connecting to Supabase</h1>
          <p className="text-red-500">{error.message}</p>
          <p className="mt-4 text-sm text-gray-500">
            Make sure you have a 'test' table in your Supabase database.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Supabase Connection Successful!</h1>
        <div className="overflow-x-auto">
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
