export class geocode {
    public results: geocodeDetails[];
    public status: string;
}

export class geocodeDetails {
    public address_components: [
        {
            long_name: string,
            short_name: string,
            types: [string]
        }
    ];
    public formatted_address: string;
    public geometry: {
        location: {
            lat: number,
            lng: number
        },
        location_type: string,
        viewport: {
            northeast: {
                lat: number,
                lng: number
            },
            southwest: {
                lat: number,
                lng: number
            }
        }
    };
    public place_id: string;
    public plus_code: {
        compound_code: string,
        global_code: string
    };
    public types: [string]
}
