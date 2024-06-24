import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "../components/core/Home/HighlightText";
import CtaButton from "../components/core/Home/CtaButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/Home/CodeBlock";
import Footer from "../components/core/Home/Footer";
import CardSection from "../components/core/Home/CardSection";
import TimeLineSection from "../components/core/Home/TimeLineSection";
import CompareWithOthers from "../assets/Images/Compare_with_others.svg";
import PlanYourLesson from "../assets/Images/Plan_your_lessons.svg";
import KnowYourProgress from "../assets/Images/Know_your_progress.svg";
import InstructorSection from "../components/core/Home/InstructorSection";
import ReviewSection from "../components/core/Home/ReviewSection";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* Become a Instructor Button */}
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/*Empower part*/}
        <div className="flex flex-col font-semibold text-center gap-8">
          <div className="text-4xl">
            Empower Your Future with <HighlightText text={"Coding Skills"} />
          </div>
          <div className="w-[90%] mx-auto text-richblack-400 text-lg">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>
        </div>

        {/* 2 Buttons */}
        <div className=" flex flex-row gap-8 lg:text-base text-sm">
          <CtaButton text={"Learn More"} linkto={"/signup"} active={true} />
          <CtaButton text={"Book a Demo"} linkto={"/signup"} active={false} />
        </div>

        {/*Video*/}
        <div className="w-[95%] bg-clip shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
          <video
            autoPlay
            loop
            muted
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/*Code Block-1 */}
        <div className="mt-32 ">
          <CodeBlock
            heading={
              <div>
                Unlock your <HighlightText text="coding potential" /> with our
                online courses.
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            button1={{
              text: (
                <div className="flex flex-row gap-4 items-center">
                  Try it Yourself <FaArrowRight />
                </div>
              ),
              linkto: "/signup",
              active: true,
            }}
            button2={{
              text: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            flexDirection={"flex-row"}
            codeColor={"text-yellow-25"}
            code={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<ahref="three/">Three</a>\n</nav></body>`}
          />
        </div>

        {/*Code Block-2 */}
        <div className="mt-40 ">
          <CodeBlock
            heading={
              <div>
                Start <HighlightText text="coding in seconds" />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            button1={{
              text: (
                <div className="flex flex-row gap-4 items-center">
                  Continue Lesson
                  <FaArrowRight />
                </div>
              ),
              linkto: "/signup",
              active: true,
            }}
            button2={{
              text: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            from={"#1FA2FF"}
            via={"#12D8FA"}
            to={"#A6FFCB"}
            codeColor={"text-richblue-25"}
            flexDirection={"flex-row-reverse"}
            code={`import React from "react";\nimport { FaArrowRight } from "react-icons/fa6";\nimport CtaButton from "./Buttons/CtaButton";\nimport { TypeAnimation } from 'react-type-animation'`}
          />
        </div>
      </div>

      {/*Section 2:-cards section */}
      <div className="w-[90%]">
        <CardSection />
      </div>

      {/* Section-3 */}
      <div className="w-[100%] bg-pure-greys-5  flex flex-col items-center">
        <div className="bg-frame lg:h-[320px] h-[180px] w-[100%]">
        <div className="flex flex-row lg:mt-52 mt-4 mx-auto w-fit lg:gap-8 gap-10 lg:text-base text-sm">
            <CtaButton text={<div className="flex flex-row items-center gap-4">Explore Catalog <FaArrowRight/></div>} linkto={"/signup"} active={true}/>
            <CtaButton text={"Learn More"} linkto={"/signup"} active={false}/>
        </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:justify-center items-center lg:gap-48 gap-10 lg:w-[90%] mt-16">
            <div className="text-4xl font-semibold lg:w-[500px] lg:mx-0 mx-8 text-richblack-800">Get the skills you need for a <HighlightText text={"job that is in demand."}/></div>
            <div className="flex flex-col lg:w-[400px] text-richblack-600 gap-8 lg:mx-0 mx-8">
              <div>
              The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CtaButton text={"Learn More"} linkto={"/signup"} active={true}/>
            </div>
        </div>
        {/*Absloute Green Section */}
        <TimeLineSection/>
        <div className='w-[90%] max-w-maxContent flex flex-col lg:mt-36 mt-20 items-center gap-3 mx-auto'>
      <div className=" font-semibold text-4xl text-richblack-800">Your swiss knife for <HighlightText text={"learning any language"}/></div>
      <div className="lg:text-center text-richblack-700 lg:w-[75%] leading-6 text-center">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
      <div className="flex lg:flex-row flex-col lg:-translate-x-44">
            <img src={KnowYourProgress} alt="Know Your Progress" className=" lg:translate-x-32 lg:-translate-y-6 translate-y-16"/>
            <img src={CompareWithOthers} alt="Compare With Others" className=" z-[5]"/>
            <img src={PlanYourLesson} alt="Plan Your Lesson" className=" lg:-translate-x-36 lg:-translate-y-10 z-[10] -translate-y-20"/>
            <Link to={"/signup"}>
    <div className={`w-fit -mt-16 mx-auto lg:invisible shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] rounded-md font-bold bg-[#FFD60A] text-black hover:scale-95 hover:shadow-none transition-all duration-200`}>
        <div className=' px-6 py-3'>Learn More</div>
    </div>
    </Link>
      </div>
      </div>
      </div>
      {/*Section 4 Instructor */}
      <InstructorSection/>

      {/* Section 5 Review Section */}
      <section className='w-11/12 max-w-maxContent mx-auto'>
          <ReviewSection/>
     </section>
      {/*Footer */}
      <Footer />
    </div>
  );
}
