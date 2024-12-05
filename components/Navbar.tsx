import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="h-10 bg-white shadow-md flex items-center justify-center">
      <ul className="flex justify-center space-x-2">
        <li>
          <a
            href="/about"
            className="text-gray-700 hover:text-purple-500 font-medium"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="text-gray-700 hover:text-purple-500 font-medium"
          >
            Contact
          </a>
        </li>
        <li>
          <button
            onClick={() => signOut()}
            className="text-gray-700 hover:text-red-500 font-medium"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
