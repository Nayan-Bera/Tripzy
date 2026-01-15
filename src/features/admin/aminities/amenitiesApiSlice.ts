import { apiSlice } from "@/app/api/apiSlice";

export type Amenity = {
  id: string;
  name: string;
};

export const amenitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAmenities: builder.query<Amenity[], void>({
      query: () => "admin/aminities/all",
      transformResponse: (res: { data: Amenity[] }) => res.data,
    }),

  }),
});

export const {
  useGetAmenitiesQuery,
} = amenitiesApiSlice;

