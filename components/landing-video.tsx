export const LandingVideo = () => {
    return (
        <div className="w-full lg:px-[10%] px-[5%] flex justify-center">
            <video 
                className="rounded-2xl border border-black"
                src="/placeholders/landingvideo.mp4"
                autoPlay
                muted
                loop
            />
        </div>
    )
}