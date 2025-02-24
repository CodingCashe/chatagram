
import ChatalMindBlowingLoader from "@/components/global/loaderPro"

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <ChatalMindBlowingLoader state={true} />
    </div>
  )
}

export default Loading