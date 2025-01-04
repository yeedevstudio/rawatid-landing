import Image from "next/image";
import FormRegis from "./FormRegis";

export default function RegistrasiPage() {
  return (
    <section className="mx-5 lg:mx-12">
      <div className="w-full my-20">
        <Image
          src={"/images/regis.svg"}
          alt="hero_image"
          width={2000}
          height={1000}
        />
      </div>
      <FormRegis />
    </section>
  );
}
