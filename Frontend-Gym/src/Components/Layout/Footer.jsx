import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10">
      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center md:text-left">
        {/* About */}
        <div>
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            GetFit Gym
          </h3>
          <p className="leading-relaxed">
            Building stronger bodies and sharper minds. <br />
            Join our community today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold transition"
                    : "hover:text-yellow-400 transition"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trainers"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold transition"
                    : "hover:text-yellow-400 transition"
                }
              >
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/supplements"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold transition"
                    : "hover:text-yellow-400 transition"
                }
              >
                Supplements
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold transition"
                    : "hover:text-yellow-400 transition"
                }
              >
                Pricing
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">Contact</h3>
          <p>
            Email:{' '}
            <a
              href="mailto:getfitness01@gmail.com"
              className="hover:text-yellow-400 transition"
            >
              getfitness01@gmail.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a
              href="tel:+923143586891"
              className="hover:text-yellow-400 transition"
            >
              +92 3143586891
            </a>
          </p>
          <p>Address: Islampura Alamgir road Lahore, Pakistan</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 mt-8 border-t border-gray-800 pt-4 text-sm">
        &copy; 2025{' '}
        <span className="text-yellow-500 font-semibold">GetFit Gym</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
