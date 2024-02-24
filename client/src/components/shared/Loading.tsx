import { Loader } from "lucide-react"

const Loading = () => {
    return (
        <div className="flex sm:flex-row flex-col gap-2 justify-center items-center">
            <Loader size={60} className="font-bold text-indigo-700 animate-spin" />
            <span className="text-gray-800 font-semibold text-xl sm:text-2xl">Loading...</span>
        </div>
    )
}

export default Loading