import { baseApi } from "../../../api/baseApi";

export type TProperty = {
    property_name: string;
    postcode: string;
    transaction: string;
    property_type: string;
    location: string;
    estimated_price: string ;
    lease_duration: number;
    description: string;
    built_area: number;
    length_width: string;
    office_space: number;
    eaves_height: number;
    power_capacity: number;
    electricity_supply?: string;
    roller_shutter_type?: string;
    roller_shutters?: number;
    dimensions_roller_shutter: string;
    lighting_type: string;
    epc_rating: number;
    ev_chaging?: boolean;
    solar_panels?: boolean;
    any_further_details: string;
    yard_space: boolean;
    yard_area: number;
    yard_surface: string;
    parking_include: number | null;
    key_specification: string;
    vehicle_repair_use?: boolean;
    vehicle_sale_use?: boolean;
    subletting?: boolean;
    leisure_use?: boolean;
    pet_business_use?: boolean;
    plastic_recycling_use?: boolean;
    floor_plans: boolean;
    other_restrictions?: string;
    images: File[];
    brochure_pdf?: File;
    brochure_video?: File;
    vendor_id?: string | number;
};

export type TPropertyResponse = {
    property_name: string;
    postcode: string;
    transaction: string;
    property_type: string;
    location: string;
    estimated_price: string;
    lease_duration: number;
    location_description: string;
    built_area: string;
    length_width: string;
    office_space: string;
    eaves_height: string;
    power_capacity: string;
    electricity_supply: string;
    roller_shutter_type: string;
    roller_shutters: number;
    dimensions_roller_shutter: string;
    lighting_type: string;
    epc_rating: string;
    ev_chaging: boolean;
    solar_panels: boolean;
    any_further_details: string;
    yard_space: string;
    yard_area: string;
    yard_surface: string;
    parking_include: number;
    key_specification: string;
    existing_images: string;
    brochure_pdf_url: string;
    brochure_video_url: string;
    vehicle_repair_use: boolean;
    vehicle_sale_use: boolean;
    subletting: boolean;
    leisure_use: boolean;
    pet_business_use: boolean;
    plastic_recycling_use: boolean;
    floor_plans: boolean;
    other_restrictions: string;
};

const addPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProperty: builder.mutation<TPropertyResponse, FormData>({
            query: (formData) => ({
                url: '/brokers/properties/',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Properties']
        })
    }),
})

export const { useAddPropertyMutation } = addPropertyApi;