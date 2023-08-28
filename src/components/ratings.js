import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

export default function Ratings ({ rating }) {
    let stars;
    if (rating == 1){
        return <div> <BsStarFill /> <BsStar/> <BsStar/> <BsStar/> <BsStar/> </div>
    } else if (rating == 1.5){
        return <div> <BsStarFill /> <BsStarHalf/> <BsStar/> <BsStar/> <BsStar/> </div>
    } else if (rating == 2){
        return <div> <BsStarFill /> <BsStarFill/> <BsStar/> <BsStar/> <BsStar/> </div>
    } else if (rating == 2.5){
        return <div> <BsStarFill /> <BsStarFill/> <BsStarHalf/> <BsStar/> <BsStar/> </div>
    } else if (rating == 3){
        return <div> <BsStarFill /> <BsStarFill/> <BsStarFill/> <BsStar/> <BsStar/> </div>
    } else if (rating == 3.5){
        return <div> <BsStarFill /> <BsStarFill/> <BsStarFill/> <BsStarHalf/> <BsStar/> </div>
    } else if (rating == 4){
        return <div> <BsStarFill /> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/> </div>
    } else if (rating == 4.5){
        return <div> <BsStarFill /> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarHalf/> </div>
    } else {
        return <div> <BsStarFill /> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> </div>
    }
}