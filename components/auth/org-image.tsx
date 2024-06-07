interface OrgImageProps {
    height: string;
    width: string;
    letter: string;
    color: string;
    letterColor: string;
}

export const OrgImage = ({
    height,
    width,
    letter,
    color,
    letterColor,
}: OrgImageProps) => {
    return (
        <div
            style={{
                backgroundColor: color,
                color: letterColor,
                width: width,
                height: height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.375rem'
            }}
            className="flex-shrink-0 font-semibold text-sm"
        >
            {letter}
        </div>
    )
};