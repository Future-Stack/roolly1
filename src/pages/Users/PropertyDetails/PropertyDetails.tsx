import { useGetUserSinglePropertyQuery } from "@/redux/features/users/getUserSinglePropertyApi";
import { useParams } from "react-router-dom"

const PropertyDetails = () => {
const {id} = useParams();
const {data:property} = useGetUserSinglePropertyQuery(id);
console.log(property)
  return (
    <div>PropertyDetails</div>
  )
}

export default PropertyDetails