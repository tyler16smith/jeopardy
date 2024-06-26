import { HardHat } from "lucide-react"

const ShamelessPlug = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 px-4 py-16">
      <HardHat size={64} color="#4246a1" />
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Build <span className="text-[hsl(280,100%,70%)]">Anything</span>
      </h1>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Go <span className="text-[hsl(280,100%,70%)]">Anywhere</span>
      </h1>
    </div>
  )
}

export default ShamelessPlug