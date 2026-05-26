import { HardHat } from "lucide-react"

const ShamelessPlug = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-16">
      <HardHat size={64} className="text-yellow-300" />
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Build <span className="text-yellow-300">Anything</span>
      </h1>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Go <span className="text-yellow-300">Anywhere</span>
      </h1>
    </div>
  )
}

export default ShamelessPlug
