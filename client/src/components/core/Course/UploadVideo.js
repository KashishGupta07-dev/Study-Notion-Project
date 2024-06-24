import React, { useEffect, useRef,useState } from 'react'
import { IoMdCloudUpload } from "react-icons/io";
import ReactPlayer from 'react-player';
export const UploadVideo = ({setValue,errors,register,editing,viewing}) => {
    const inputRef = useRef();
    const [previewVideo,setPreviewVideo] = useState(null);
    // eslint-disable-next-line
    const [file,setFile] = useState(null);
    useEffect(()=>{
        if(editing || viewing){
            setValue("lectureVideo",(viewing||editing).videoUrl);
            setFile((viewing||editing).videoUrl);
            setPreviewVideo((viewing||editing).videoUrl)
        }
              register("lectureVideo", {
                required: { value: true, message: "Please upload a lecture video" }
              });
              // eslint-disable-next-line
    },[])
    function clickHandler(){
        inputRef.current.click();
    }
    function handleDrop(e){
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setValue("lectureVideo",e.dataTransfer.files[0]);
            const previewFile = e.dataTransfer.files[0];
            var media = URL.createObjectURL(previewFile);
            console.log("Media : ",media);
            setPreviewVideo(media);
            };
          }
    function handleDrag(event){
        event.preventDefault();
    }
    function cancelHandler(event){
        event.preventDefault();
        setPreviewVideo(null);
        setValue("lectureVideo",null);
        setFile(null);
    }
    function handleDuration(duration){
        setValue("timeDuration",duration)
    }
    function changeHandler(event){
        event.preventDefault();
        if(event.target.files[0]){
            setFile(event.target.files[0]);
            const previewFile = event.target.files[0];
            setValue("lectureVideo",previewFile);
            var media = URL.createObjectURL(previewFile);
            console.log("Media : ",media);
            setPreviewVideo(media);
        }
    }
  return (
    !previewVideo?
    <div className='w-full min-h-[250px] bg-richblack-700 border-[2px] border-dotted border-richblack-300 rounded-lg cursor-pointer' onClick={clickHandler}  onDrop={handleDrop} onDragOver={handleDrag}>
        <div className='flex flex-col w-5/6 mx-auto gap-4 justify-center min-h-[250px]'>
        <input accept="video/*,.mp4,.mkv" type="file" style={{display: "none"}} name='lectureVideo' onChange={changeHandler} ref={inputRef}
        />
            <div className='w-14 aspect-square flex items-center justify-center rounded-full text-yellow-50 bg-pure-greys-800 mx-auto'>
                <IoMdCloudUpload size={"30px"} className='object-cover'/>
            </div>
            <div className='text-center text-richblack-300 text-sm'>Drag and drop a video,or <br></br>click to <span className='text-yellow-50 font-bold'>Browse</span> a file</div>
            <ul className='flex flex-row list-disc gap-28 font-bold mt-8 text-xs text-richblack-400 justify-center'>
            <li>Aspect ratio 16:9</li>
            <li>Recommended size 1024x576</li>
        </ul>
        </div>
    </div>
    :
    <div className='w-full min-h-[250px] bg-richblack-700 border-[2px] border-dotted border-richblack-300 rounded-lg cursor-pointer' >
        <div className='flex flex-col w-5/6 mx-auto gap-4 justify-center my-8'>
        <ReactPlayer url={previewVideo} controls={true} onDuration={handleDuration}/>
        {
            !viewing && <button className=' underline w-fit bg-transparent text-richblack-200 text-lg mx-auto' onClick={cancelHandler}>Cancel</button>}
        </div>
        </div>
  )
}
