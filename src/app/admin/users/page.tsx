import { getUsers } from '@/actions/users';
import UsersClient from './UsersClient';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const users = await getUsers();
  return <UsersClient users={users as Parameters<typeof UsersClient>[0]['users']} />;
}
