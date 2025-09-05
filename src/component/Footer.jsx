import React from 'react'
import { useSelector } from 'react-redux';

const Footer = () => {
    const user = useSelector((store) => store.user);
  return (
    <>
      {user && (<footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-4  bottom-0">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by DevConnect
          </p>
        </aside>
      </footer>)}
    </>
  );
}

export default Footer