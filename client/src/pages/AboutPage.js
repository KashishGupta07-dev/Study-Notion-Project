import React from 'react'
import HighlightText from '../components/core/Home/HighlightText'
import Img1 from "../assets/Images/aboutus1.webp";
import Img2 from "../assets/Images/aboutus2.webp";
import Img3 from "../assets/Images/aboutus3.webp";
import { HighlightTextByGradient } from '../components/core/common/HighlightTextByGradient';
import FoundingStory from "../assets/Images/FoundingStory.png"
import { VisionMission } from '../components/core/AboutUs/VisionMission';
import { PlatformData } from '../components/core/AboutUs/PlatformData';
import GridSection from '../components/core/AboutUs/GridSection';
import { ContactForm } from '../components/core/common/ContactForm';
import Footer from "../components/core/Home/Footer"
import ReviewSection from '../components/core/Home/ReviewSection';
export const AboutPage = () => {
  return (
    <div className='flex flex-col w-full  justify-center mx-auto'>
    {/*Section 1 */}
    <section className="bg-richblack-700">
    <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
    <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]"><font _mstmutation="1" _msttexthash="2297828" _msthash="17">Driving Innovation in Online Education for a<span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold" _mstmutation="1"> Brighter Future</span></font>
    <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]" _msttexthash="30875923" _msthash="18">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p></header>
    <div className="sm:h-[70px] lg:h-[150px]"></div>
    <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
    <img src={Img1} alt=""/>
    <img src={Img2} alt=""/>
    <img src={Img3} alt=""/>
    </div>
    </div>
    </section>
      {/*Section 2 */}
      <section className='lg:mt-52 md:mt-32 mt-28 border-b-[0.5px] border-richblack-700 mb-10'>
      <div className='lg:text-4xl sm:text-2xl md:text-3xl text-richblack-5 pb-16 text-center w-11/12 mx-auto max-w-maxContent font-semibold'>
      We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text="combines technology"/>, <HighlightTextByGradient text={"expertise"}/>, and community to create an <HighlightTextByGradient text={"unparalleled educational experience."} />
      </div>
      </section>

      {/*Section -3 */}

      <section className='flex lg:flex-row w-11/12 max-w-maxContent flex-col mx-auto mt-8 lg:justify-between lg:items-center gap-20 lg:gap-0'>
       <div className='flex flex-col gap-8 text-richblack-200 lg:w-[45%]'>
         <span className=' lg:text-4xl text-5xl bg-gradient-to-b from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text font-bold'>Our Founding Story</span>
      <div>
      Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
      </div>
      <div>
      As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
      </div>
       </div>
       <div className='w-full h-fit lg:w-[45%] shadow-[0px_0px_30px] shadow-[#FC6767]'>
       <img src={FoundingStory} alt='Founding Story' loading='lazy' className='w-full object-cover'/>
       </div>
      </section>


      {/*Section -4 */}
      <section className='w-11/12 max-w-maxContent mx-auto'>
      <VisionMission/>
      </section>

      {/*Section-5 */}
      <section className='bg-richblack-700 mt-24'>
      <div className='w-11/12 max-w-maxContent mx-auto'>
        <PlatformData/>
        </div>
      </section>

      {/*Section-6 */}

      <section className='w-11/12 max-w-maxContent mx-auto'>
        <GridSection/>
      </section>



      {/*Section-7 */}

      <section className='w-11/12 max-w-maxContent mx-auto flex flex-row justify-center '>
           <ContactForm heading={"Get in Touch"} subheading={"We'd love to here for you, Please fill out this form."} ctaText={"Send Message"} border={true}/>
      </section>


      {/*Section-8 */}
     <section className='w-11/12 max-w-maxContent mx-auto'>
          <ReviewSection/>
     </section>


      {/*Footer */}
      <Footer/>
    </div>
  )
}
