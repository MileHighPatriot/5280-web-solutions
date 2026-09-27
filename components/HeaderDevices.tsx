import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * Tilted laptop and phone for an orange page header: one project's desktop screenshot on
 * the laptop, another's full home page looping on the phone (the shared .screen-loop, so no
 * client JavaScript).
 */
export default function HeaderDevices({ laptop, phone }: { laptop: Project; phone: Project }) {
  return (
    <div className="relative mx-auto aspect-[10/8] w-full max-w-[34rem]" aria-hidden="true">
      <div className="absolute top-[8%] left-0 w-[86%] -rotate-[4deg] shadow-[0_50px_90px_-30px_rgba(0,24,51,0.7)]">
        <div className="rounded-t-[0.9rem] bg-[#0b1117] px-[1.6%] pt-[1.6%] ring-1 ring-white/10">
          <div className="flex gap-1.5 pb-[1.4%] pl-1">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <Image
            src={laptop.images.desktop}
            alt=""
            width={1280}
            height={800}
            sizes="(min-width: 1024px) 480px, 80vw"
            className="block w-full"
          />
        </div>
        <div className="h-3 rounded-b-[0.9rem] bg-[#1b2735]" />
      </div>

      <div className="absolute top-[20%] right-0 w-[32%] rotate-[7deg] rounded-[1.9rem] bg-[#0b1117] p-[2.2%] shadow-[0_50px_90px_-30px_rgba(0,24,51,0.8)] ring-1 ring-white/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0">
        <div className="screen-loop screen-loop-phone aspect-[9/19] rounded-[1.5rem] bg-navy-3">
          <Image src={phone.images.fullMobile} alt="" width={440} height={5866} sizes="180px" className="w-full" />
        </div>
      </div>
    </div>
  );
}
