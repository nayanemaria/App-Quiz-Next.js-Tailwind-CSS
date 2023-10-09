import Image from 'next/image'
import logoImage from '/public/images/logos/logo.png';
interface LogoProps {
    className?: string
}

export default function Logo({ className }: LogoProps) {
    const classes = className || 'w-32'
    return (
        <Image className={classes}
            src={logoImage}
            width={120}
            alt="Logo"
        />
    );
}