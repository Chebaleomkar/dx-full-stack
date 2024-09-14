
import React from 'react'
import HomeCard from './HomeCard'
import { HomeInfoList } from '@/constant'

const Home = () => {
  return (
    <main className='grid mt-5 gap-1 md:grid-cols-1 lg:grid-cols-1'>
    {HomeInfoList?.map((info :any, i:number)=>(
        <>
        <HomeCard key={i} heading={info?.heading} subHeading={info?.subHeading} imageUrl={info?.imageUrl} />
        </>
    ))}
    </main>
  )
}

export default Home
