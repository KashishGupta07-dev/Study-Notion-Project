export const categoriesApi = {
    SHOW_ALL_CATEGORIES_API : "course/showAllCategories",
    GET_CATEGORY_PAGE_DETAILS:"course/getCategoryPageDetails"
}

export const authApi = {
    SEND_OTP_API : "auth/sendotp",
    SIGNUP_API:"auth/signup",
    LOGIN_API:"auth/login",
    RESET_PASSWORD_TOKEN_API:"auth/reset-password-token",
    RESET_PASSWORD_API:"auth/reset-password",

}

export const profileApi = {
    UPDATE_PROFILE_PICTURE_API : "profile/updateDisplayPicture",
    UPDATE_PROFILE_API : "profile/updateProfile",
    UPDATE_PASSWORD_API: "profile/changepassword",
    DELETE_PROFILE_API:"profile/deleteProfile",
    GET_INSTRUCTOR_DETAILS_API : "profile/getInstructorDetails"
}


export const contactUsApi={
    CONTACT_US_FORM_API : "auth/contactus",
}

export const courseApi = {
    CREATE_COURSE_API: "course/createCourse",
    GET_ALL_COURSES_API:"course/getAllCourses",
    GET_COURSE_DETAILS_API : "course/getCourseDetails",
    GET_FULL_COURSE_DETAILS_API:"course/getFullCourseDetails",
    DELETE_COURSE_API:"course/deleteCourse",
    EDIT_COURSE_API : "course/updateCourse",
    ADD_SECTION_API : "course/addSection",
    EDIT_SECTION_API : "course/updateSection",
    DELETE_SECTION_API:"course/deleteSection",
    ADD_SUBSECTION_API : "course/addSubSection",
    EDIT_SUBSECTION_API:"course/updateSubSection",
    ENROLLED_COURSES_API : "course/getEnrolledCourses",
    CREATE_RATING_API:"course/createRating",
    GET_ALL_REVIEWS_API : "course/getReviews",
}


export const paymentApi  = {
    CAPTURE_PAYMENT_API : "payment/capturePayment",
    VERIFY_PAYMENT_API : "payment/verifyPayment",
    SEND_MAIL_API : "payment/sendMail"
}