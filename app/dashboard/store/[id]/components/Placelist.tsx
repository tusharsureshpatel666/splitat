import Image from "next/image";
import React from "react";

const PlacesList = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No places found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {data.map(({ type, results }) =>
        results.length > 0 ? (
          <div key={type} style={{ marginBottom: "30px" }}>
            <h2 style={{ textTransform: "capitalize" }}>
              {type.replace(/_/g, " ")}
            </h2>

            <div style={{ display: "grid", gap: "10px" }}>
              {results.map((place) => {
                const photoReference = place.photos?.[0]?.photo_reference;

                const photoUrl = photoReference
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
                  : null;

                return (
                  <div
                    key={place.place_id}
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    {/* ✅ Photo */}
                    {photoUrl && (
                      <Image
                        src={photoUrl}
                        alt={place.name}
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          marginBottom: "10px",
                        }}
                        width={500}
                        height={500}
                      />
                    )}

                    <h4>{place.name}</h4>
                    <p>⭐ {place.rating || "No rating"}</p>
                    <p>{place.vicinity}</p>
                    <p>Status: {place.business_status}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
};

export default PlacesList;
