export function UnderlineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='800px'
      height='800px'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      focusable='false'
      aria-hidden={true}
      {...props}
    >
      <path
        d='M16 5V11C16 13.2091 14.2091 15 12 15V15C9.79086 15 8 13.2091 8 11V5'
        stroke='#000000'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M6 19L18 19' stroke='#000000' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}
