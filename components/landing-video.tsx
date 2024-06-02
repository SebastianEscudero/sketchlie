export const LandingVideo = () => {
    return (
        <div className="w-full xl:px-[10%] lg:px-[7%] md:px-[5%] px-[5%] flex justify-center">
            <video 
                className="rounded-2xl border border-black h-full w-full"
                src="/placeholders/landingvideo.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
        </div>
    )
}