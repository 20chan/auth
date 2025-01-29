import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { scopes } from '@/lib/scopes';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';

const ADMIN_ID = process.env.ADMIN_ID;

async function updateUsers(formData: FormData) {
  'use server';

  const users = await prisma.user.findMany();

  const approvedUsers = new Set<string>();
  const scopesByUser = new Map<string, string[]>();
  for (const [key, value] of formData.entries()) {
    const [userId, field, scope] = key.split(':');

    if (field === 'approved') {
      if (value === 'on') {
        approvedUsers.add(userId);
      }
    } else if (field === 'scope') {
      if (value === 'on') {
        if (!scopesByUser.has(userId)) {
          scopesByUser.set(userId, []);
        }

        scopesByUser.get(userId)?.push(scope);
      }
    }
  }

  for (const user of users) {
    const approved = approvedUsers.has(user.id);
    const scopes = (scopesByUser.get(user.id) ?? []).join(',');

    if (!!user.approvedAt === approved && user.scopes === scopes) {
      continue;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        approvedAt: approved ? new Date() : null,
        scopes,
      },
    });
  }

  redirect('/my/admin');
}

export default async function AdminPage() {
  await connection();
  const session = await auth();

  if (session?.user?.id !== ADMIN_ID) {
    redirect('/');
  }

  const users = await prisma.user.findMany();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='text-4xl mb-4'>
        admin
      </div>

      <form action={updateUsers} className='flex flex-col font-mono w-fit'>
        <table>
          <thead className='text-h-text/80 bg-h-tone/10 border-h-tone/10'>
            <tr>
              <th rowSpan={2} className='w-60'>
                ID
              </th>
              <th rowSpan={2} className='w-24'>
                Name
              </th>

              <th rowSpan={2} className='w-36'>
                Email
              </th>

              <th rowSpan={2} className='w-32'>
                Approved
              </th>
              <th colSpan={100}>
                scopes
              </th>
            </tr>
            <tr>
              {scopes.map((scope) => (
                <th key={scope} className='px-4'>
                  {scope}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='text-h-text/60 even:bg-h-tone/5'>
                <td>
                  {user.id}
                </td>
                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td className='text-center'>
                  <input type='checkbox' name={`${user.id}:approved`} defaultChecked={!!user.approvedAt} />
                </td>

                {scopes.map((scope) => (
                  <td key={scope} className='text-center'>
                    <input type='checkbox' name={`${user.id}:scope:${scope}`} defaultChecked={user.scopes.split(',').includes(scope)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <input
          type='submit'
          value='update'
          className='bg-h-red hover:bg-h-red/80 text-h-background block w-full py-2 mt-4 cursor-pointer'
        />
      </form>
    </div>
  );
}