// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { HomeIcon, Verified, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';


import { useAdminStore } from '../store/adminStore';
import { useEffect } from 'react';

const AdminUsersPage = () => {

  const { getUsers, users, message } = useAdminStore();


  useEffect(() => {
    try {
      getUsers();
      toast.success(message || 'Users fetched successfully');
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || 'Error fetching users please refresh'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sort so verified users come first
  const sortedUsers = users
    ? [...users].sort((a, b) => {
      if (a.isVerified === b.isVerified) return 0;
      return a.isVerified ? -1 : 1;
    })
    : null;

  return (
    <main
      className='w-[100vw] min-h-[100vh]  h-max flex flex-col items-center bg-gradient-to-bl from-bg-[#ffffffff] from-0%  via-[#ff9d6c] via-40%  to-[##ff874b] to-100% relative text-[#333333]   '
    >
      <motion.nav
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex px-2 py-2.5 justify-around w-[90vw] sm:justify-around bg-[#fff]/45 mt-2 rounded border-1 border-[#808080] max-xs:w-[90vw] sm:w-[80vw] md:w-[60vw]'
      >
        <Link
          to={'/'}
          className=' h-8 font-[Supreme-ExtraBold] text-black w-max sm:text-2xl sm:h-9 text-center md:size-10 md:text-4xl '
        >
          <HomeIcon className='md:size-8' />
        </Link>
        <h1 className='font-bold font-[Supreme-ExtraBold]  text-2xl  ' >USER ADMIN PAGE</h1>
      </motion.nav>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='flex px-2 py-2.5 justify-around w-[90vw] font-bold font-[Supreme-Bold]  text-2xl sm:justify-around bg-[#fff]/50 mt-2 rounded border-1 border-[#808080] max-xs:w-[90vw] sm:w-[80vw] md:w-[60vw]  '
      >
        USERS COUNT : {users !== null ? users.length : '0'}
      </motion.p>
      <div>
        {
          sortedUsers ?
            sortedUsers.map((user) => {
              return (
                <section
                  className='flex px-2 py-2.5 justify-around w-[90vw] sm:justify-around bg-[#fff]/50 mt-2 rounded max-xs:w-[90vw] sm:w-[80vw] md:w-[60vw] text-[1.2rem]  '
                >
                  <p>UserName : {user.name}</p>
                  <p>UserEmail : {user.email} </p>
                  <p>
                    {
                      user.isVerified ?
                        <Verified className='text-green-600 size-8' />
                        :
                        <X className='text-red-600 size-8' />
                    }
                  </p>
                </section>
              )
            })
            : null
        }
      </div>
    </main>
  )
}

export default AdminUsersPage