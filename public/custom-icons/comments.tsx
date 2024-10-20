interface CommentsIconProps {
    className?: string;
}

export const CommentsIcon: React.FC<CommentsIconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="30 30 40 40"  // Adjusted viewBox to zoom in on the content
        fill="currentColor"
        className={className}
    >
        <g transform="scale(0.9) translate(5, 5)">  // Slightly scale up and move the paths
            <path d="m64.5 33.199h-27c-3 0-5.5 2.5-5.5 5.5v15c0 3 2.5 5.5 5.5 5.5h12.398l6.6016 6.8008c0.5 0.5 1.1016 0.80078 1.8008 0.80078h0.39844c0.80078-0.10156 1.5-0.69922 1.8984-1.3984l1.8984-6.1992h2c3 0 5.5-2.5 5.5-5.5v-15c0.003906-3.0039-2.4961-5.5039-5.4961-5.5039zm-6.3008 30.199-3.8008-3.8984h4.6016zm8.8008-9.6992c0 1.3984-1.1016 2.5-2.5 2.5h-27c-1.3984 0-2.5-1.1016-2.5-2.5v-15c0-1.3984 1.1016-2.5 2.5-2.5h27c1.3984 0 2.5 1.1016 2.5 2.5z">
            </path>
            <path d="m41.5 42.699h9c0.80078 0 1.5-0.69922 1.5-1.5s-0.69922-1.5-1.5-1.5h-9c-0.80078 0-1.5 0.69922-1.5 1.5s0.69922 1.5 1.5 1.5z">
            </path>
            <path d="m58.5 44.699h-17c-0.80078 0-1.5 0.69922-1.5 1.5s0.69922 1.5 1.5 1.5h17c0.80078 0 1.5-0.69922 1.5-1.5s-0.69922-1.5-1.5-1.5z">
            </path>
            <path d="m58.5 49.699h-17c-0.80078 0-1.5 0.69922-1.5 1.5s0.69922 1.5 1.5 1.5h17c0.80078 0 1.5-0.69922 1.5-1.5s-0.69922-1.5-1.5-1.5z">
            </path>
        </g>
    </svg>
);