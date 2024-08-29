import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 py-6 w-full shrink-0 items-center px-4 md:px-6 bg-light-bg dark:bg-dark-bg">
      <div className="flex justify-center space-x-6 items-center">
        <Link
          to="#"
          className="text-light-text dark:text-dark-text dark:hover:text-dark-link"
        >
          <FacebookIcon className="h-6 w-6" />
        </Link>
        <Link
          to="#"
          className="text-light-text dark:text-dark-text dark:hover:text-dark-link"
        >
          <TwitterIcon className="h-6 w-6" />
        </Link>
        <Link
          to="#"
          className="text-light-text dark:text-dark-text dark:hover:text-dark-link"
        >
          <InstagramIcon className="h-6 w-6" />
        </Link>
      </div>
      <div className="flex justify-center space-x-4">
        <Link
          to="#"
          className="text-sm text-light-text dark:text-dark-text dark:hover:text-dark-link"
        >
          About Us
        </Link>
        <Link
          to="#"
          className="text-sm text-light-text dark:text-dark-text dark:hover:text-dark-link"
        >
          Contact
        </Link>
        <Link
          to="#"
          className="text-sm text-light-text dark:text-dark-text dark:hover:text-dark-link"
        >
          Careers
        </Link>
      </div>
      <p className="text-xs text-light-text dark:text-dark-text">
        &copy; {new Date().getFullYear()} - React Fundamental Project
      </p>
    </footer>
  );
};

export default Footer;

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
