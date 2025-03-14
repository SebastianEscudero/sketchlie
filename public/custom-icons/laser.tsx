interface LaserIconProps {
  isActive: boolean;
  className?: string;
}

export const LaserIcon: React.FC<LaserIconProps> = ({ isActive, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    stroke={isActive ? 'blue' : 'currentColor'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m3.522 26.477 4.034-4.034M3.522 20.627l2.358-.83M10.201 24.119l-.829 2.358M27 7.364 13.111 21.252a.5.5 0 0 1-.707 0l-3.656-3.656a.5.5 0 0 1 0-.707L22.636 3z"/>
  </svg>
);