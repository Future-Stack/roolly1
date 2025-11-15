import DeailHeader from "./DeailHeader"
import PropertyMapContact from "./PropertyContact"
import PropertyDetail from "./PropertyDetail"
import RelatedProperties from "./RelativeProperty"

const DetailsPage = () => {
  return (
    <div>
        <DeailHeader/>
      <PropertyDetail/>
      <PropertyMapContact/>
      <RelatedProperties/>
    </div>
  )
}

export default DetailsPage
