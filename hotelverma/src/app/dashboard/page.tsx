'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Spinner, Spacer, Button, Divider } from '@nextui-org/react';
import { FaHotel } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";

const ProfilePage: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [newHotel, setNewHotel] = useState({
    title: '',
    location: '',
    amenities: '',
    image: '',
    price: '',
    rating: '',
  });
  const router = useRouter();

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          router.push('/login');
          return;
        }

        const profileResponse = await axios.get('dashboard/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRole(profileResponse.data.role); 

        if (profileResponse.data.role === 'user') {
          const reservationsResponse = await axios.get('dashboard/api/reservations', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setReservations(reservationsResponse.data.reservations);
        } else if (profileResponse.data.role === 'admin') {
          const hotelsResponse = await axios.get('dashboard/api/rooms', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setHotels(hotelsResponse.data.hotels);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        router.push('/login');
      }
    };

    fetchProfile();
  }, [router]);

  const handleHotelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      alert('You must be logged in to add a hotel.');
      return;
    }

    try {
      const response = await axios.post(
        'dashboard/api/rooms', 
        newHotel,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHotels([...hotels, response.data.hotel]);
      setNewHotel({
        title: '',
        location: '',
        amenities: '',
        image: '',
        price: '',
        rating: '',
      });
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  const handleDeleteHotel = async (hotelId: string) => {
    const token = getAuthToken();
    if (!token) {
      alert('You must be logged in to delete a hotel.');
      return;
    }

    try {
      await axios.delete('dashboard/api/rooms', {
        headers: { Authorization: `Bearer ${token}` },
        data: { hotelId },
      });
      setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px' }}>
      <h1 className="text-3xl" style={{  color: '#333' }}>Profile Page</h1>
      <Divider className="my-4" />
      {role === 'user' ? (
        <div style={{ marginTop: '20px' }}>
          <h2>Your Reservations</h2>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <li key={reservation._id} style={{ padding: '10px', backgroundColor: '#f4f4f4', marginBottom: '10px', borderRadius: '4px' }}>
                  {reservation.roomName} - {reservation.date}
                </li>
              ))
            ) : (
              <p>No reservations found.</p>
            )}
          </ul>
        </div>
      ) : role === 'admin' ? (
        <div style={{ marginTop: '20px' }}>
          <h2 className="text-2xl">Admin Dashboard</h2>
          <h3 style={{ marginBottom: '10px' }}>Manage Hotels</h3>

          <form onSubmit={handleHotelSubmit} style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Hotel Title"
              value={newHotel.title}
              onChange={(e) => setNewHotel({ ...newHotel, title: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Location"
              value={newHotel.location}
              onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Amenities (comma-separated)"
              value={newHotel.amenities}
              onChange={(e) => setNewHotel({ ...newHotel, amenities: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newHotel.image}
              onChange={(e) => setNewHotel({ ...newHotel, image: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Price"
              value={newHotel.price}
              onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Rating"
              value={newHotel.rating}
              onChange={(e) => setNewHotel({ ...newHotel, rating: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <Button type="submit" color="warning" variant="bordered" startContent={<MdPostAdd />}>
              Add Hotel
            </Button>
          </form>
          <Divider className="my-4" />
          <h3 className="text-2xl">Existing Hotels</h3>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <li key={hotel._id} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4>{hotel.title}</h4>
                    <p>{hotel.location}</p>
                    <p>Amenities: {hotel.amenities.join(", ")}</p>
                    <p>Price: ${hotel.price}</p>
                    <p>Rating: {hotel.rating} stars</p>
                    <img src={hotel.image} alt={hotel.title} style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '4px' }} />
                  </div>
                  <Spacer y={4} />
                  <Button onClick={() => handleDeleteHotel(hotel._id)} color="danger" variant="bordered" startContent={<FaHotel />}>
                    Delete Hotel
                  </Button>
                </li>
              ))
            ) : (
              <p>No hotels available.</p>
            )}
          </ul>
        </div>
      ) : (
        <Spinner className="flex items-center justify-center w-full py-35" color="warning" />
      )}
    </div>
  );
};

export default ProfilePage;
