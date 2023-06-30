import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { getUser } from '../../utils/storageManager';

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
 
export default function Page() {
  const router = useRouter()
  const [userObj, setUserObj] = useState();
  useEffect(() => {
    getUser(router.query.id, true).then((value) => {
        setUserObj(value);
    }, (err) => console.error(err))
  }, []);
//   return <p>UserID: {router.query.id}</p>
return (
    <div className='mb-4'>
        <h1 className='text-xl font-bold mb-2'>Profile</h1>
        <div className='flex gap-5'>
            <div className='flex flex-col gap-1'>
                <span className='font-bold'>Username:</span>
                <span className='font-bold'>Occupation:</span>
                <span className='font-bold'>About me:</span>
            </div>
            <div className='flex flex-col gap-1'>
                <p>{userObj?.name}</p>
                <p>{userObj?.occupation}</p>
                <p>{userObj?.background}</p>
            </div>
        </div>
    </div>
);
}