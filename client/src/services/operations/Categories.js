import { categoriesApi } from "../apis";
import {apiConnector} from "../apiConnector";
import toast from "react-hot-toast";
export const getAllCategories = async(setLoading,setCategories)=>{
    setLoading(true);
    try{
        const response =  await apiConnector("GET",categoriesApi.SHOW_ALL_CATEGORIES_API);
        const categories = response?.data.allCategories?response?.data.allCategories:null;
        setCategories( categories);
    }catch(error){
        console.log(error);
    }
    setLoading(false);
}


export function getCategoryPageDetailsApi(categoryName,setSelectedCategory,setDifferentCategory,setTopSellingCourses,navigate,setLoading){
    return async()=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",categoriesApi.GET_CATEGORY_PAGE_DETAILS,{categoryName});
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Category Not Exist");
                console.log(message);
                navigate("/");
                return;
            }
            setSelectedCategory(response?.data?.selectedCategory);
            setDifferentCategory(response?.data?.differentCategory);
            setTopSellingCourses(response?.data?.topSellingCourses);
        }catch(error){
            toast.error("Category Not Exist");
            console.log(error);
            navigate("/");
        }
        toast.dismiss(toastId);
        setLoading(false);
    }
}