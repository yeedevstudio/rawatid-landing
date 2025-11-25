import Image from "next/image";
import FormRegis from "./FormRegis";

export default function RegistrasiPage() {
  return (
    <section data-aos="fade-up" className="mx-5 lg:mx-12">
      <div className="w-full my-20 rounded-lg">
        <Image
          src={"/images/registration-bg.png"}
          alt="hero_image"
          width={2000}
          height={900}
          className="rounded-3xl"
        />
      </div>
      <FormRegis />
    </section>
  );
}
