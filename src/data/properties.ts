import propertyImg1 from "../assets/featureproperty/FeaturePropertys1.svg";
import propertyImg2 from "../assets/featureproperty/fetureProperty2.svg";
import propertyImg3 from "../assets/featureproperty/fetureProperty3.svg";
import propertyImg4 from "../assets/featureproperty/fetureProperty4.svg";

export const properties = [
  {
    id: 1,
    title: "Cotton Mill B9 TILEYARD",
    type: "Industrial",
    status: "Available",
    price: "P 6391",
    images: [
      propertyImg1,
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    ],
    
    // *** INTERNALS (Specifications) ***
    specs: {
      area: "X sq ft/m2 acres/hectares for land", 
      lengthWidth: "2400 sq X 1200 sq", 
      officeSpaceIncluded: "YES", 
      eavesHeight: "800 mm", 
      powerCapacity: "X kva", 
      singleOrThreePhase: "Three", 
      
      typeOfRollerShutter: "Three", 
      heightWidthOfShutters: "Three", 
      typeOfLighting: "Three",
      ePCRating: "Three", 
      userRestrictions: "Three", 
      anyFurtherDetails: "Three", 
    },
    
    // *** EXTERNALS (Specifications) ***
    exterior: {
      yardSpace: "2400 sq X 1200 sq", 
      areaOfYard: "YES", 
      yardSurface: "Concrete/tarmac", 
      parkingIncluded: "Three", 
    },
    
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    title: "Spinning Mill A7",
    type: "Industrial",
    status: "Sold",
    price: "P 7450",
    images: [
      propertyImg2,
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    ],
    specs: {
      area: "1500 sq ft",
      lengthWidth: "2500m X 1500m",
      officeSpaceIncluded: "YES",
      eavesHeight: "900 mm",
      powerCapacity: "75 kva",
      singleOrThreePhase: "Three",
      
      typeOfRollerShutter: "Two",
      heightWidthOfShutters: "Three",
      typeOfLighting: "Three",
      ePCRating: "Three",
      userRestrictions: "Three",
      anyFurtherDetails: "Three",
    },
    exterior: {
      yardSpace: "2500m X 1500m",
      areaOfYard: "YES",
      yardSurface: "Concrete",
      parkingIncluded: "Three",
    },
    description: "Another property with unique details and specifications.",
  },
  {
    id: 3,
    title: "Textile Factory C5",
    type: "Industrial",
    status: "Available",
    price: "P 8200",
    images: [
      propertyImg3,
      "https://images.unsplash.com/photo-1565182999561-7e2f2a4a6f49?w=800&h=600&fit=crop",
    ],
    specs: {
      area: "1800 sq ft",
      lengthWidth: "3000m X 1600m",
      officeSpaceIncluded: "YES",
      eavesHeight: "950 mm",
      powerCapacity: "100 kva",
      singleOrThreePhase: "Four",
      
      typeOfRollerShutter: "Four",
      heightWidthOfShutters: "Four",
      typeOfLighting: "Four",
      ePCRating: "Four",
      userRestrictions: "Four",
      anyFurtherDetails: "Four",
    },
    exterior: {
      yardSpace: "3000m X 1600m",
      areaOfYard: "YES",
      yardSurface: "Concrete",
      parkingIncluded: "Four",
    },
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  },
  {
    id: 4,
    title: "Warehouse D2",
    type: "Warehouse",
    status: "Available",
    price: "P 5600",
    images: [
      propertyImg4,
      "https://images.unsplash.com/photo-1580584129930-9fc8d1f5a7f1?w=800&h=600&fit=crop",
    ],
    specs: {
      area: "1000 sq ft",
      lengthWidth: "2000m X 1000m",
      officeSpaceIncluded: "NO",
      eavesHeight: "700 mm",
      powerCapacity: "40 kva",
      singleOrThreePhase: "Two",
      
      typeOfRollerShutter: "Two",
      heightWidthOfShutters: "Two",
      typeOfLighting: "Two",
      ePCRating: "Two",
      userRestrictions: "Two",
      anyFurtherDetails: "Two",
    },
    exterior: {
      yardSpace: "2000m X 1000m",
      areaOfYard: "YES",
      yardSurface: "Tarmac",
      parkingIncluded: "Two",
    },
    description: "Compact warehouse ideal for storage and logistics.",
  },
];
