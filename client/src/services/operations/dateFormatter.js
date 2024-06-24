import moment from "moment";

export const dateFormatter=(dateString)=>{
    const date = moment(dateString);
    const formattedDate = date.format('DD - MMMM - YYYY');
    return formattedDate;
}