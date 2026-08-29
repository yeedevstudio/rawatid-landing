"use client";

import { useEffect, useState } from "react";


const SafeEmail = ({ user, domain, className = "", children }) => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(`${user}${String.fromCharCode(64)}${domain}`);
  }, [user, domain]);

  const content = (
    <>
      {children}
      <span className="break-all">
        <span>{user}</span>
        <span>{String.fromCharCode(64)}</span>
        <span>{domain}</span>
      </span>
    </>
  );

  if (!email) {
    return <span className={className}>{content}</span>;
  }

  return (
    <a
      href={`${String.fromCharCode(109, 97, 105, 108, 116, 111)}:${email}`}
      className={className}
    >
      {content}
    </a>
  );
};

export default SafeEmail;
