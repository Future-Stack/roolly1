import { Home } from "lucide-react"


const DeailHeader = () => {
  return (
    <div className="w-full ">
           {/* Header Section */}
        <div className="bg-white  mx-[100px]  p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-[30px] font-semibold leading-11 text-[#000000] pb-4 border-b border-gray-200 sm:mb-4">
            Discover Every Detail About This Property
          </h1>
          <div className="flex items-center gap-3 mb-2">
            <Home className="text-gray-600" size={20} />
            <p className="text-xl leading-7  sm:text-lg text-[#082D5B] font-medium">
              6391 Elgin St. Celina, Delaware 10299
            </p>
          </div>
          <div className="flex items-center gap-3">
            
            <div>
              <p className="text-sm sm:text-base text-[#126AD8] leading-6 pb-2 font-medium">
                Offer from $2.9
              </p>
              <p className="text-sm  text-[#082D5B] font-medium flex items-center gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
  <path d="M0.75 14.0833H12.75M2.75 11.4167V6.75M5.41667 11.4167V6.75M8.08333 11.4167V6.75M10.75 11.4167V6.75M6.75 0.75L12.0833 4.08333H1.41667L6.75 0.75Z" stroke="#082D5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                8 X sq ft(N/2 act) | (Building) Land
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DeailHeader
