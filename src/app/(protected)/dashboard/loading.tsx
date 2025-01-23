// import Loader from '@/components/global/loader'
// import React from 'react'

// type Props = {}

// const Loading = (props: Props) => {
//   return (
//     <div className="h-screen flex justify-center items-center">
//       <Loader state>Loading...</Loader>
//     </div>
//   )
// }

// export default Loading

import ChatalMindBlowingLoader from "@/components/global/loaderPro"

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <ChatalMindBlowingLoader state={true} />
    </div>
  )
}

export default Loading