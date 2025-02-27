import Image from "next/image";
import "./authlinks.css";
import google from "@/assets/images/googleauth.svg";
import appleauth from "@/assets/images/appleauth.svg";
import Link from "next/link";

const AuthLinks = () => {
  return (
    <>
      <div className="position-relative mb-2 text-center authlinks">
        <p className="bg-white position-relative z-2 px-3 d-inline-block  authlinkspara">
          المتابعة باستخدام
        </p>
        <div className="position-absolute  top-50 start-0  w-100  border-top  text-black-50 p-0 m-0 "></div>
      </div>

      <div className=" d-flex justify-content-center gap-3">
        <Link href="#" aria-label="Sign in with appleauth" className=" mx-3">
          <Image
            src={appleauth}
            width={47}
            height={47}
            alt="Sign in with appleauth account"
          />
        </Link>
        <Link href="#" aria-label="Sign in with google" className=" ms-3">
          <Image
            src={google}
            width={47}
            height={47}
            alt="Sign in with google account"
          />
        </Link>
      </div>
    </>
  );
};

export default AuthLinks;
