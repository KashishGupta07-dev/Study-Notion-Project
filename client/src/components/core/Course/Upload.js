import React, { useEffect, useRef,useState } from 'react'
import { IoMdCloudUpload } from "react-icons/io";
import { useSelector } from 'react-redux';
export const Upload = ({register,setValue,getValues}) => {
    const inputRef = useRef();
    const {editCourse,course} = useSelector((state)=>state.course);
    function clickHandler(){
        inputRef.current.click();
    }
    const [previewImage,setPreviewImage] = useState(null);
    const [file,setFile] = useState(null);
    function handleDrag(event){
        event.preventDefault();
    }
    useEffect(() => {
        if (editCourse && course?.thumbnail) {
            setValue("courseThumbnail", course?.thumbnail);
            setPreviewImage(course?.thumbnail);
        }
        register("courseThumbnail");
    }, [editCourse, course, register, setValue]);
    function handleDrop(e){
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            const previewFile = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(previewFile);
            reader.onloadend = () => {
              setPreviewImage(reader.result);
            };
          }
    }
    function cancelHandler(){
        setPreviewImage(null);
        setFile(null);
        setValue("courseThumbnail",null);
    }
    function changeHandler(event){
        event.preventDefault();
        if(event.target.files[0]){
            setFile(event.target.files[0]);
            const previewFile = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(previewFile);
            reader.onloadend = ()=>{
                setPreviewImage(reader.result);
            };
        }
    }
    useEffect(()=>{
        setValue("courseThumbnail",file);
        // eslint-disable-next-line
    },[file]); 
  return (
    !previewImage?
    <div className='w-full min-h-[250px] bg-richblack-700 border-[2px] border-dotted border-richblack-300 rounded-lg cursor-pointer'  onClick={clickHandler} onDrop={handleDrop} onDragOver={handleDrag}>
        <div className='flex flex-col w-5/6 mx-auto gap-4 justify-center min-h-[250px]'>
        <input accept="image/*,.jpeg,.jpg,.png" type="file" style={{display: "none"}} onChange={changeHandler} ref={inputRef}/>
            <div className='w-14 aspect-square flex items-center justify-center rounded-full text-yellow-50 bg-pure-greys-800 mx-auto'>
                <IoMdCloudUpload size={"30px"} className='object-cover'/>
            </div>
            <div className='text-center text-richblack-300 text-sm'>Drag and drop an image,or <br></br>click to <span className='text-yellow-50 font-bold'>Browse</span> a file</div>
            <ul className='flex flex-row list-disc gap-28 font-bold mt-8 text-xs text-richblack-400 justify-center'>
            <li>Aspect ratio 16:9</li>
            <li>Recommended size 1024x576</li>
        </ul>
        </div>
    </div>
    :
    <div className='w-full min-h-[250px] bg-richblack-700 border-[2px] border-dotted border-richblack-300 rounded-lg cursor-pointer' >
        <div className='flex flex-col w-5/6 mx-auto gap-4 justify-center my-8'>
        <img src={previewImage} className='w-full aspect-video object-cover' alt='thumbnail'/>
        <button className=' underline w-fit mx-auto bg-transparent text-richblack-200 text-lg text-center' onClick={cancelHandler}>Cancel</button>
        </div>
        </div>
  )
}
