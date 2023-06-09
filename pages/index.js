
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import {useSession, getSession, signOut} from 'next-auth/react'


export default function Home({session}) {

 function handleSignOut(){
signOut()
}

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      {session ? <User session={session} handleSignOut={handleSignOut} /> : <Guest />}
    </div>
  )
}


// Guest
 function Guest(){
  return(
    <>
        <title>Home Page</title>
      <main className='container mx-auto text-center py-20'>
       <h3 className="text-4xl font-bold">Guest Homepage</h3>
       <div className='flex justify-center'>
        <Link legacyBehavior href={'/login'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</a></Link>
       </div>
      </main>
    </>
  )
}
//Authorize User

function User({session, handleSignOut}){
  return(
    <>
    <title>Home Page</title>
  <main className='container mx-auto text-center py-20'>
   <h3 className="text-4xl font-bold">Authorized User Homepage</h3>
    <div className='details'>
    <h5>{session.user.name}</h5>
    <h5>{session.user.email}</h5>
    </div>
    <div className='flex justify-center'>
      <button className='mt-5 px-10 rounded-sm bg-ingigo-500 bg-gray-50' onClick={handleSignOut}>Sign Out</button>
    </div>
   
   <div className='flex justify-center'>
    <Link legacyBehavior href={'/Profile'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</a></Link>
   </div>
<div className ='flex justify-center'>
  <Link legacyBehavior href={'/dashboard'}><a className='mt-5 px-10 py-1 rounded-sm bg-rose-500 text-gray-50'>User Dashboard</a></Link>
</div>
  </main>
</>
  )
}

export async function getServerSideProps({req}){
 const session = await getSession({req}) 
 
 if (!session){
   return{
     redirect: {
       destination: '/login',
       permanent: false
     }
   }
 }
 
 return {
   props: {session}
 }
}