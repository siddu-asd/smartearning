import { redirect } from 'next/navigation';

/**
 * Root page - redirects to the React frontend
 */
export default function HomePage() {
  redirect('/');
}
