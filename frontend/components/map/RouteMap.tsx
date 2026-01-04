'use client'

import { useEffect, useRef } from 'react'
import { useLoadScript } from '@react-google-maps/api'

const libraries: ('places')[] = ['places']

interface RouteMapProps {
  routes: any[]
}

export default function RouteMap({ routes }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<google.maps.Map | null>(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  })

  useEffect(() => {
    if (isLoaded && mapRef.current && !googleMapRef.current) {
      // Initialize map
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: 23.68, lng: 86.98 }, // Default center
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      })
    }
  }, [isLoaded])

  useEffect(() => {
    if (googleMapRef.current && routes.length > 0) {
      // Clear existing markers and polylines
      const bounds = new google.maps.LatLngBounds()

      routes.forEach((route, index) => {
        const colorMap: { [key: string]: string } = {
          Green: '#10b981',
          Blue: '#3b82f6',
          Red: '#ef4444',
          Yellow: '#f59e0b',
          Orange: '#f97316',
        }

        // Create polyline for route
        const pathCoordinates = [
          route.from.coords,
          ...route.stops.map((s: any) => s.coords),
          route.to.coords,
        ]

        const polyline = new google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: colorMap[route.identifier.color] || '#6b7280',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map: googleMapRef.current,
        })

        // Add markers for start and end
        const startMarker = new google.maps.Marker({
          position: route.from.coords,
          map: googleMapRef.current,
          title: route.from.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: colorMap[route.identifier.color] || '#6b7280',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        })

        const endMarker = new google.maps.Marker({
          position: route.to.coords,
          map: googleMapRef.current,
          title: route.to.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#10b981',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        })

        // Add info windows
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="font-weight: bold; margin-bottom: 4px;">${route.identifier.localName}</h3>
              <p style="color: #666; font-size: 14px;">₹${route.fare.min}-₹${route.fare.max}</p>
            </div>
          `,
        })

        startMarker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, startMarker)
        })

        // Extend bounds
        pathCoordinates.forEach((coord: any) => {
          bounds.extend(coord)
        })
      })

      // Fit map to bounds
      googleMapRef.current.fitBounds(bounds)
    }
  }, [routes])

  if (!isLoaded) {
    return (
      <div className="w-full h-96 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    )
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-96 md:h-[600px] rounded-xl"
      style={{ minHeight: '400px' }}
    />
  )
}
