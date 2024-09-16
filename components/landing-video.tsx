export const LandingVideo = () => {
    return (
        <div className="w-full flex justify-center">
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