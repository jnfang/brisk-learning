import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import { Disclosure } from "@headlessui/react";

export default function Navbar() {
  // const navigation = ["Demo", "Integrations", "About Us", "Blog"];
  const navigation = {"Demo": "/demo", "Integrations": "/integrations", "About Us": "/about-us", "Blog": "/blog"}

  return (
    <div className="w-full">
      <nav className=" relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0 w-full">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              {/* <div className="flex flex-wrap items-center w-full"> */}
                <Link legacyBehavior href="/">
                  <a className="px-4 flex space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100 w-100">
                    Brisk
                  </a>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>
                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {Object.keys(navigation).map(function(key, url) {
                      return(
                      <Link legacyBehavior key={navigation[key]} href={navigation[key]}>
                        <a className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700">
                          {key}
                        </a>
                    </Link>);
                    })}
                    <Link legacyBehavior href="/">
                      <a className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5">
                        Join Waitlist
                      </a>
                    </Link>
                  </>
                </Disclosure.Panel>
              {/* </div> */}
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {Object.keys(navigation).map(function(key, url) {
              return (<li className="mr-3 nav__item" key={navigation[key]}>
                <Link legacyBehavior href={navigation[key]}>
                  <a className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
                    {key}
                  </a>
                </Link>
              </li>)
            })}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-3 lg:flex nav__item">
          <Link legacyBehavior href="/">
            <a className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
              Join Waitlist
            </a>
          </Link>

          {/* <ThemeChanger /> */}
        </div>
      </nav>
    </div>
  );
}
