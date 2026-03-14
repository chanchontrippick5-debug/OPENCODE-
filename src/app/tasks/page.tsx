import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import Link from 'next/link';

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">University Task Tracker</h1>
            <Link href="/" className="text-indigo-600 hover:text-indigo-500">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/tasks" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add New Task
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <TaskForm />
          </div>
          <div className="lg:col-span-1">
            <TaskList />
          </div>
        </div>
      </main>
    </div>
  );
}