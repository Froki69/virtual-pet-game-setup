// components/Navbar.tsx
export default function Navbar() {
    return (
      <nav className="bg-white shadow-md py-3">
        <ul className="flex justify-center space-x-4">
          <li>
            <a
              href="/game"
              className="text-gray-700 hover:text-purple-500 font-semibold"
            >
              Game
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-gray-700 hover:text-purple-500 font-semibold"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-gray-700 hover:text-purple-500 font-semibold"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    );
  }
  