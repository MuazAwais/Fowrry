"use client";
import { useState, useRef, useEffect } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { AiOutlineAim, AiOutlineClose } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

interface LocationPickerProps {
  onLocationSelect: (location: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
  placeholder?: string;
  className?: string;
}

const LocationPicker = ({
  onLocationSelect,
  placeholder = "Enter your location or Address",
  className = "",
}: LocationPickerProps) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  useEffect(() => {
    if (showMap && isLoaded && mapRef.current && !mapInstanceRef.current) {
      const defaultCenter = currentLocation || { lat: 24.8607, lng: 67.0011 }; // Default to Karachi

      const map = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      mapInstanceRef.current = map;

      // Add click listener to map
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          updateMarkerPosition(lat, lng);
          reverseGeocode(lat, lng);
        }
      });

      // Add initial marker
      if (currentLocation) {
        updateMarkerPosition(currentLocation.lat, currentLocation.lng);
      } else {
        // Create marker at center
        markerRef.current = new google.maps.Marker({
          position: defaultCenter,
          map: map,
          draggable: true,
        });

        markerRef.current.addListener("dragend", () => {
          const position = markerRef.current?.getPosition();
          if (position) {
            reverseGeocode(position.lat(), position.lng());
          }
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      }
    };
  }, [showMap, isLoaded, currentLocation]);

  const updateMarkerPosition = (lat: number, lng: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat, lng });

      if (markerRef.current) {
        markerRef.current.setPosition({ lat, lng });
      } else {
        markerRef.current = new google.maps.Marker({
          position: { lat, lng },
          map: mapInstanceRef.current,
          draggable: true,
        });

        markerRef.current.addListener("dragend", () => {
          const position = markerRef.current?.getPosition();
          if (position) {
            reverseGeocode(position.lat(), position.lng());
          }
        });
      }
    }
  };

  const reverseGeocode = (lat: number, lng: number) => {
    if (!isLoaded) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const address = results[0].formatted_address;
        setSelectedLocation(address);
        onLocationSelect({ address, lat, lng });
      }
    });
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address || place.name || "";

        setSelectedLocation(address);
        setCurrentLocation({ lat, lng });
        onLocationSelect({ address, lat, lng });

        if (showMap && mapInstanceRef.current) {
          updateMarkerPosition(lat, lng);
        }
      }
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentLocation({ lat, lng });
          reverseGeocode(lat, lng);
          if (showMap && mapInstanceRef.current) {
            updateMarkerPosition(lat, lng);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleConfirmLocation = () => {
    if (selectedLocation && currentLocation) {
      onLocationSelect({
        address: selectedLocation,
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      });
      setShowMap(false);
    }
  };

  if (!apiKey) {
    return (
      <div className={`flex items-center gap-x-2 ${className}`}>
        <input
          type="text"
          placeholder={placeholder}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="flex-1 w-full bg-transparent outline-none text-sm"
        />
        <button
          onClick={() => {
            // Without API key, just use the text input value
            if (selectedLocation.trim()) {
              onLocationSelect({
                address: selectedLocation,
                lat: 24.8607, // Default to Karachi
                lng: 67.0011,
              });
            }
          }}
          className="p-2 rounded-full text-[#fff] bg-[#2d7bbc] hover:bg-[#2d7bbc]/90 transition-colors cursor-pointer flex-shrink-0"
          title="Set location"
          type="button"
        >
          <AiOutlineAim size={28} />
        </button>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className={`flex items-center gap-x-2 ${className}`}>
        <input
          type="text"
          placeholder={placeholder}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="flex-1 w-full bg-transparent outline-none text-sm"
        />
        <button
          onClick={() => {
            if (selectedLocation.trim()) {
              onLocationSelect({
                address: selectedLocation,
                lat: 24.8607,
                lng: 67.0011,
              });
            }
          }}
          className="p-2 rounded-full text-[#fff] bg-[#2d7bbc] hover:bg-[#2d7bbc]/90 transition-colors cursor-pointer flex-shrink-0"
          title="Set location"
          type="button"
        >
          <AiOutlineAim size={28} />
        </button>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`flex items-center gap-x-2 ${className}`}>
        <input
          type="text"
          placeholder={placeholder}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="flex-1 w-full bg-transparent outline-none text-sm"
          disabled
        />
        <div className="p-2 rounded-full text-[#fff] bg-[#2d7bbc] flex-shrink-0">
          <AiOutlineAim size={28} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`flex items-center gap-x-2 ${className}`}>
        {isLoaded ? (
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={handlePlaceSelect}
            options={{
              types: ["address", "establishment"],
              componentRestrictions: { country: "pk" }, // Restrict to Pakistan
            }}
          >
            <input
              type="text"
              placeholder={placeholder}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="flex-1 w-full bg-transparent outline-none text-sm"
            />
          </Autocomplete>
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="flex-1 w-full bg-transparent outline-none text-sm"
            disabled={!apiKey}
          />
        )}
        <button
          onClick={() => setShowMap(true)}
          className="p-2 rounded-full text-[#fff] bg-[#2d7bbc] hover:bg-[#2d7bbc]/90 transition-colors cursor-pointer flex-shrink-0"
          title="Select location on map"
          type="button"
        >
          <AiOutlineAim size={28} />
        </button>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">Select Location on Map</h3>
              <button
                onClick={() => setShowMap(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="flex-1 relative">
              <div ref={mapRef} className="w-full h-[500px]" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button
                  onClick={getCurrentLocation}
                  className="bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center gap-x-2 font-medium"
                >
                  <FaMapMarkerAlt className="text-primary" />
                  Use My Location
                </button>
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">Selected Address:</p>
                <p className="font-medium">{selectedLocation || "Click on map to select location"}</p>
              </div>
              <div className="flex gap-x-3">
                <button
                  onClick={handleConfirmLocation}
                  disabled={!selectedLocation || !currentLocation}
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-full font-medium hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirm Location
                </button>
                <button
                  onClick={() => setShowMap(false)}
                  className="px-6 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationPicker;

