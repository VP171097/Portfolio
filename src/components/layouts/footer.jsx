import React from "react";

import dayjs from "dayjs";

const Footer = () => {
  return (
    <div className="w-full flex bg-blue-600  ">
      <div className="p-4  justify-center">
        <p className="text-sm  text-center text-white">
          Copyright &copy; {dayjs().year()} Vivek Pandey™. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
