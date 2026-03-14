# Supabase Schema for University Task Tracker

## Tables

### 1. courses
Stores information about university courses.

```sql
create table courses (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text unique not null, -- e.g., "CS101"
  description text,
  color text default '#3B82F6', -- Tailwind blue-500
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table courses enable row level security;

-- Policies
create policy "Courses are viewable by everyone" 
  on courses for select 
  using (true);

create policy "Courses are insertable by everyone" 
  on courses for insert 
  with check (true);

create policy "Courses are updatable by everyone" 
  on courses for update 
  using (true);

create policy "Courses are deletable by everyone" 
  on courses for delete 
  using (true);
```

### 2. tasks
Stores individual tasks/assignments for courses.

```sql
create table tasks (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  course_id uuid references courses(id) on delete cascade,
  due_date timestamp with time zone,
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  status text check (status in ('todo', 'in_progress', 'done')) default 'todo',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table tasks enable row level security;

-- Policies
create policy "Tasks are viewable by everyone" 
  on tasks for select 
  using (true);

create policy "Tasks are insertable by everyone" 
  on tasks for insert 
  with check (true);

create policy "Tasks are updatable by everyone" 
  on tasks for update 
  using (true);

create policy "Tasks are deletable by everyone" 
  on tasks for delete 
  using (true);
```

## Sample Data (for testing)

```sql
-- Sample courses
insert into courses (name, code, description, color) values
  ('Introduction to Computer Science', 'CS101', 'Basic programming concepts', '#3B82F6'),
  ('Data Structures and Algorithms', 'CS201', 'Advanced data structures', '#10B981'),
  ('Calculus I', 'MATH101', 'Differential calculus', '#F59E0B');

-- Sample tasks
insert into tasks (title, description, course_id, due_date, priority, status) values
  ('Complete Assignment 1', 'Implement basic sorting algorithms', (select id from courses where code = 'CS101'), now() + interval '3 days', 'high', 'todo'),
  ('Study for Quiz', 'Review chapters 1-3', (select id from courses where code = 'CS101'), now() + interval '1 day', 'medium', 'in_progress'),
  ('Final Project Proposal', 'Submit project idea and scope', (select id from courses where code = 'CS201'), now() + interval '7 days', 'high', 'todo'),
  ('Homework 5', 'Solve problems 1-10', (select id from courses where code = 'MATH101'), now() + interval '2 days', 'medium', 'todo');
```

## Notes
- Row Level Security is enabled but set to allow all operations for simplicity in this student app
- In a production app with authentication, you would restrict policies to authenticated users
- The UUID extension is assumed to be enabled (it's enabled by default in Supabase)