import { useState, useEffect, useRef } from "react";
import ArrowDown from "../ui/icons/ArrowDown";
import { useTranslation } from "next-i18next";

const locationData = {
  name: "Yollda MMC",
  tagline: "Chat Beyond Limits Together",
  city: "Dubai",
  country: "KSA",
  address: "123 Tech Boulevard, Suite 456",
  fullLocation: "Azerbaijan",
  coordinates: {
    lat: 40.4093, // Baku, Azerbaijan coordinates
    lng: 49.8671,
  },
};

export default function LocationMapSection({ mapData: headquarters }) {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // This will be called when Google Maps API is loaded
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: headquarters?.[0].latitude,
          lng: headquarters[0]?.longitude,
        },
        zoom: 15,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [
              {
                weight: "2.00",
              },
            ],
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#9c9c9c",
              },
            ],
          },
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                color: "#f2f2f2",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 45,
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#eeeeee",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#7b7b7b",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [
              {
                color: "#46bcec",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#c8d7d4",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#070707",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
        ],
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
        },
      });

      // Custom marker
      const marker = new window.google.maps.Marker({
        // position: locationData.coordinates,
        position: {
          lat: headquarters?.[0].latitude,
          lng: headquarters[0]?.longitude,
        },
        map: map,
        title: headquarters[0]?.title,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#21D654",
          fillOpacity: 1,
          strokeColor: "#083426",
          strokeWeight: 3,
        },
      });

      // Info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <h3 style="margin: 0 0 4px 0; color: #083426; font-weight: 600;">${headquarters[0]?.title}</h3>
            <p style="margin: 0 0 4px 0; color: #6B7280; font-size: 14px;">${headquarters[0]?.sub_title}</p>
            <p style="margin: 0; color: #6B7280; font-size: 14px;">${headquarters[0]?.address_line_first}</p>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      setIsMapLoaded(true);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(true);
    }
  };

  useEffect(() => {
    // Set up global callback
    window.initMap = initializeMap;

    // Load Google Maps API
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // For now, we'll show a placeholder since we don't have the API key
      // When client provides API key, replace 'YOUR_API_KEY' with actual key
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onerror = () => setMapError(true);

      // Don't actually load the script without API key
      // document.head.appendChild(script);

      // For demo purposes, show error state
      setMapError(true);
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  const handleOpenMap = () => {
    // const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationData.coordinates.lat},${locationData.coordinates.lng}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${headquarters[0]?.latitude},${headquarters[0]?.longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="w-full flex justify-center text-white py-5 lg:py-10">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Map */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 relative">
              {/* Map Container */}
              <div
                ref={mapRef}
                className="w-full h-full"
                style={{ minHeight: "400px" }}
              />

              {/* Map Placeholder/Error State */}
              {(mapError || !isMapLoaded) && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <h3 className="text-h6-responsive font-semibold text-gray-700 mb-2">
                      Map Preview
                    </h3>
                    <p className="text-span-small-responsive text-gray-500 mb-4">
                      Google Maps will load here with your API key
                    </p>
                    <div className="w-full h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-span-small-responsive">
                        Interactive Map Area
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Location Card Overlay */}
              <div className="absolute top-6 left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                {/* Company Logo/Icon */}
                <div className="flex items-center space-s-3 mb-4">
                  <img
                    src="/yolda-sm-logo.png"
                    alt="Beautiful image"
                    className="w-10 h-10 object-cover"
                  />
                  <div>
                    <h3 className="text-h6-responsive font-bold text-green-dark">
                      {/* {locationData.name} */}
                      {headquarters[0]?.title}
                    </h3>
                    <p className="text-span-small-responsive text-gray-400">
                      {/* {locationData.tagline} */}
                      {headquarters[0]?.sub_title}
                    </p>
                  </div>
                </div>

                {/* Location Details */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center text-span-responsive text-gray-700">
                    <span className="font-medium">
                      {/* {locationData.city}, {locationData.country} */}
                      {headquarters[0]?.address_line_first}
                    </span>
                  </div>
                  <div className="text-span-small-responsive text-gray-400">
                    {headquarters[0].address_line_second}
                    {/* {locationData.address} */}
                  </div>
                </div>

                {/* Open Map Button */}
                <button
                  onClick={handleOpenMap}
                  className="flex items-center text-gray-800 transition-colors duration-200 text-span-responsive font-bold group"
                >
                  {t("buttons.open_map")}
                  <ArrowDown
                    strokeColor={`stroke-gray-800 stroke-2`}
                    className={`w-3 h-3 ml-2 transition-transform duration-200 -rotate-90`}
                  />
                  {/* <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" /> */}
                </button>
              </div>

              {/* Current Location Indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="relative w-10 h-10 -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping"></div>
                  <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white -translate-x-1/2 -translate-y-1/2 z-10"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-3 lg:space-y-6">
            {/* Section Badge */}
            <div className="inline-block">
              <h5 className="text-light-green text-h5-responsive font-medium">
                {t("map_srction.our_location")}
              </h5>
            </div>

            {/* Main Heading */}
            <h3 className="text-h3-responsive font-medium text-green-dark md:max-w-[50%] leading-tight">
              {t("map_section.heading")}
            </h3>

            {/* Headquarters Section */}
            <div className="space-y-3 !mt-6">
              <h5 className="text-h5-responsive font-bold text-gray-900">
                {t("map_section.headquarters")}
              </h5>

              <div className="space-y-1 text-p-large-responsive text-gray-500 flex flex-col gap-2">
                {headquarters?.map((headquarter) => (
                  <div key={headquarter.id}>
                    <h4 className="text-h6-responsive">{headquarter.tile}</h4>
                    <p>{headquarter.address_line_first}</p>
                    <p>{headquarter.address_line_second}</p>
                    {/* <p>{locationData.fullLocation}</p> */}
                  </div>
                ))}
                {/* <h4 className="text-h6-responsive">{locationData.name}</h4>
                <p>
                  {locationData.city}, {locationData.country}
                </p>
                <p>{locationData.address}</p>
                <p>{locationData.fullLocation}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
