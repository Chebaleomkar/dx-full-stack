import Link from "next/link";
import { FaSchool, FaUserTie, FaBullseye, FaEnvelope } from "react-icons/fa";
import HomeCard from "@/components/HomeCard";
import DxIcon from "@/components/Icons/DxIcon";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div className="bg mt-20 flex items-center rounded-2xl  justify-center h-[35rem] p-5 max-sm:h-[20rem] max-sm:mt-36 max-sm:m-2 max-sm:rounded-3xl">
          <DxIcon className="h-40 max-sm:h-20 " />
        </div>

        <main className="grid gap-1 md:grid-cols-1 lg:grid-cols-2">
          <HomeCard
            heading="Welcome to DisciplineX"
            subHeading="Your partner in promoting discipline among students through
                digital means"
            buttonText="Login"
            navigateTo="/login"
            imageUrl="https://i.pinimg.com/originals/84/22/0a/84220a2fc13e5f62e5f4da4ee1d15112.gif"
          />

          <HomeCard
            //  icon : <FaBullseye className="inline-block mr-2" />
            heading="What We Do"
            subHeading="  We help institutions maintain discipline among students through innovative digital tools"
            imageUrl="https://img.freepik.com/premium-photo/man-child-are-sitting-bench-man-reading-book_1087840-2272.jpg?w=740"
          />

          <HomeCard
            // icon : <FaUserTie className="inline-block mr-2" />
            heading="Who We Are"
            subHeading="DisciplineX is a dedicated team of educators and technologists working together to install discipline in students"
            imageUrl="https://img.freepik.com/premium-photo/colleagues-work-characters-vector-icon-illustration-partnership-business-icon-concept-white-isolated-flat-cartoon-style-suitable-web-landing-page-banner-sticker-background_839035-1758808.jpg?w=740"
          />

          <HomeCard
            // icon : <FaBullseye className="inline-block mr-2" />
            heading="Our Goal"
            subHeading="Our goal is to highlight the value of discipline and habits in students lives and support its development through digital mediums"
            imageUrl="https://ideogram.ai/assets/image/lossless/response/4OkfFmPdRvuU_dbqmR4hSw"
          />

          <HomeCard
            // icon :  <FaSchool className="inline-block mr-2" />
            heading="Helping Institution"
            subHeading=" We assist schools in implementing discipline policies effectively and efficiently using our platform. Institutions can track and manage student behavior, ensuring a learning
            environment"
            imageUrl="https://ideogram.ai/assets/image/lossless/response/PF2-sC7OTbiJ4K2IUkcVvw"
          />
        </main>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            <FaEnvelope className="inline-block mr-2" /> Contact Us
          </h2>
          <p className="text-lg mb-6 text-center">
            If you are a school administrator interested in our services, please
            contact us at{" "}
            <a
              href="mailto:omkarchebale0@gmail.com"
              className="text-blue-500 hover:text-blue-700"
            >
              info@disciplinex.com
            </a>
            . We look forward to helping you foster a disciplined and productive
            learning environment.
          </p>
        </div>
      </div>
    </>
  );
}
