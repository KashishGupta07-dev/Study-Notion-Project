import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateProgressApi } from "../../../services/operations/coursesApi";
import { setCompletedLectures } from "../../../reducers/slices/ViewCourseSlice";
export const ViewVideo = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const navigate = useNavigate();
  const [play, setPlay] = useState(false);
  const playerRef = useRef();
  const {token} = useSelector((state)=>state.auth);
  const {
    courseDetails,
    subSectionDetails,
    sectionDetails,
    totalLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (
      !courseDetails ||
      !subSectionDetails ||
      !sectionDetails ||
      !totalLectures ||
      !completedLectures
    ) {
      return;
    }
    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }
    const filteredSubSection = subSectionDetails?.filter(
      (subSection) => subSection._id === subSectionId
    );
    setVideoData(filteredSubSection[0]);
    setVideoEnded(false);
    // eslint-disable-next-line
  }, [subSectionDetails, videoData,courseDetails, location.pathname]);
  function isFirstVideo() {
    if (
      sectionDetails?.[0]?._id === sectionId &&
      sectionDetails?.[0]?.subSection?.[0]?._id  === subSectionId
    ) {
      return true;
    } else {
      return false;
    }
  }
  function isLastVideo() {
    const endIndexOfSection = sectionDetails?.length - 1;
    const endIndexOfSubSection = sectionDetails?.[endIndexOfSection]?.subSection?.length-1;
    if (
      sectionDetails?.[endIndexOfSection]?._id === sectionId &&
      sectionDetails?.[endIndexOfSection]?.subSection[endIndexOfSubSection]?._id === subSectionId
    ) {
      return true;
    }
    return false;
  }
  function alreadyMarkedLectureAsCompleted() {
    return completedLectures?.length > 0
      ? completedLectures?.includes(subSectionId)
      : false;
  }
  function nextHandler() {
    const findSectionIndex = sectionDetails?.findIndex(
      (section) => section?._id === sectionId
    );
    const findSubSectionIndex = sectionDetails?.[
      findSectionIndex
    ]?.subSection?.findIndex((subSection) => subSection?._id === subSectionId);
    const endIndexOfSubSection =
      sectionDetails?.[findSectionIndex]?.subSection?.length - 1;
    if (findSubSectionIndex === endIndexOfSubSection) {
      navigate(
        `/view-course/${courseDetails?._id}/section/${
          sectionDetails[findSectionIndex + 1]?._id
        }/sub-section/${
          sectionDetails?.[findSectionIndex + 1]?.subSection?.[0]?._id
        }`
      );
    } else {
      navigate(
        `/view-course/${courseDetails?._id}/section/${
          sectionDetails[findSectionIndex]?._id
        }/sub-section/${
          sectionDetails?.[findSectionIndex]?.subSection?.[
            findSubSectionIndex + 1
          ]?._id
        }`
      );
    }
  }

  function previousHandler(){
    const findSectionIndex = sectionDetails?.findIndex(
      (section) => section?._id === sectionId
    );
    const findSubSectionIndex = sectionDetails?.[
      findSectionIndex
    ]?.subSection?.findIndex((subSection) => subSection?._id === subSectionId);
    const endIndexOfSubSection =  sectionDetails?.[findSectionIndex - 1]?.subSection?.length-1;
    if (findSubSectionIndex === 0) {
      navigate(
        `/view-course/${courseDetails?._id}/section/${
          sectionDetails[findSectionIndex - 1]?._id
        }/sub-section/${
          sectionDetails?.[findSectionIndex - 1]?.subSection?.[endIndexOfSubSection]?._id
        }`
      );
    } else {
      navigate(
        `/view-course/${courseDetails?._id}/section/${
          sectionDetails[findSectionIndex]?._id
        }/sub-section/${
          sectionDetails?.[findSectionIndex]?.subSection?.[
            findSubSectionIndex - 1
          ]?._id
        }`
      );
    }
  }
  function markHandler(){
    dispatch(updateProgressApi(courseId,subSectionId,token,setCompletedLectures));
  }
  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="w-11/12 mx-auto mt-3">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            if (!videoEnded) {
              setPlay(!play);
            }
          }}
        >
          <ReactPlayer
            url={videoData?.videoUrl}
            width={"100%"}
            height={"100%"}
            playing={play}
            ref={playerRef}
            controls={!videoEnded}
            style={{
              aspectRatio: "16/9",
              cursor: "pointer",
            }}
            onEnded={() => setVideoEnded(true)}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload nofullscreen noplaybackrate",
                  disablePictureInPicture: true,
                },
              },
            }}
          />
          {videoEnded && (
            <div className="absolute w-full h-full justify-center items-center top-0 flex gap-y-2 sm:gap-y-4 flex-col bg-white bg-opacity-45">
              {!alreadyMarkedLectureAsCompleted() && (
                <button className="bg-yellow-50 text-black rounded-md font-bold w-fit px-4 py-2" onClick={markHandler}>
                  Mark As Completed
                </button>
              )}
              {!isLastVideo() && (
                <button
                  className="bg-yellow-50 text-black rounded-md font-bold px-4 py-2 w-fit"
                  onClick={nextHandler}
                >
                  Next
                </button>
              )}
              {!isFirstVideo() && (
                <button className="bg-yellow-50 text-black rounded-md w-fit font-bold px-4 py-2" onClick={previousHandler}>
                  Previous
                </button>
              )}
              <button
                className="bg-yellow-50 text-black rounded-md w-fit font-bold px-4 py-2"
                onClick={() => {
                  playerRef.current.seekTo(0);
                  setVideoEnded(false);
                }}
              >
                Rewatch
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-2 text-richblack-5 my-5">
          <div className="text-3xl font-semibold">{videoData?.title}</div>
          <div className="text-sm font-medium">{videoData?.description}</div>
        </div>
      </div>
    </div>
  );
};
