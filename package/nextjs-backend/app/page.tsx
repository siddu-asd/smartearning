import { redirect } from 'next/navigation';

/**
 * Root page - redirects to the static frontend
 */
export default function HomePage() {
  // Redirect to the frontend site
  redirect('/site/index.html');
}
