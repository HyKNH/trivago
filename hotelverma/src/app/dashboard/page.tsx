'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Spinner, Spacer, Button, Divider, Image, Input } from '@nextui-org/react';
import {MdPostAdd, MdFreeCancellation, MdRateReview} from "react-icons/md";
import { FaHotel, FaDownload, FaRegEdit } from "react-icons/fa";

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
    roomType: ''
  });
  const [editHotel, setEditHotel] = useState<any | null>(null);
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
          const reservationResponse = await axios.get('dashboard/api/all-reservations', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setReservations(reservationResponse.data.reservations);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        router.push('/login');
      }
    };

    fetchProfile();
  }, [router]);

  const handleCancelReservation = async (reservationId: string) => {
    const token = getAuthToken();
    if (!token) {
      alert('You must be logged in to cancel a reservation.');
      return;
    }

    try {
      await axios.delete(`dashboard/api/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(reservations.filter((res) => res._id !== reservationId));
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

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
        roomType: ''
      });
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  const handleUpdateHotel = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = getAuthToken();
    if (!token) {
      alert('You must be logged in to update a hotel.');
      return;
    }
  
    if (!editHotel || !editHotel._id) {
      alert('No hotel selected for update or missing hotel ID.');
      return;
    }
  
    console.log('Attempting to update hotel:', editHotel);
  
    try {
      const response = await axios.put(
        `/dashboard/api/rooms/${editHotel._id}`,
        editHotel,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Update response:', response.data);
  
      const updatedHotels = hotels.map((hotel) =>
        hotel._id === response.data.hotel._id ? response.data.hotel : hotel
      );
  
      setHotels(updatedHotels);
      setEditHotel(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific error
        console.error('Axios error response:', error.response?.data || error.message);
      } else {
        // Handle other types of errors
        console.error('Unexpected error:', error);
      }
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

  const handleDownloadReport = () => {
    const reservationsWithTotalCost = reservations.map((reservation) => {
      const checkInDate = new Date(reservation.checkInDate);
      const checkOutDate = new Date(reservation.checkOutDate);
      const checkInDateFormatted = checkInDate.toISOString().split('T')[0];
      const checkOutDateFormatted = checkOutDate.toISOString().split('T')[0];  
      const numDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      const baseCost = reservation.price * numDays;
      const totalCost = baseCost + baseCost * 0.12;
      const formatted =  Math.floor(totalCost);
  
      return {
        ...reservation,
        checkInDate: checkInDateFormatted,
        checkOutDate: checkOutDateFormatted,
        totalCost: formatted,
      };
    });
  
    const totalRevenue = reservationsWithTotalCost.reduce(
      (sum, reservation) => sum + parseFloat(reservation.totalCost),
      0
    );
  
    const reportData = {
      totalRevenue: totalRevenue,
      reservations: reservationsWithTotalCost,
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reservations-report.json';
    link.click();
  
    URL.revokeObjectURL(url);
  };
  
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '20px' }}>
      <h1 className="text-3xl font-bold" style={{ color: '#333' }}>Profile Page</h1>
      <Divider className="my-4" />
      {role === 'user' ? (
        <div style={{ marginTop: '20px' }}>
          <h2 className="text-2xl font-bold">Your Reservations</h2>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {reservations.length > 0 ? (
              reservations.map((reservation) => {
                const checkInDate = new Date(reservation.checkInDate);
                const checkOutDate = new Date(reservation.checkOutDate);
                const numDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
                const baseCost = reservation.price * numDays;
                const totalCost = baseCost + baseCost * 0.12;
                const formatted =  Math.floor(totalCost);

                return (
                  <li key={reservation._id} style={{ padding: '10px', backgroundColor: '#f4f4f4', marginBottom: '10px', borderRadius: '4px' }}>
                    <div>
                      <p><strong>Hotel:</strong> {reservation.hotelName}</p>
                      <p><strong>Location:</strong> {reservation.location}</p>
                      <p><strong>Date:</strong> {reservation.checkInDate.split('T')[0]} to {reservation.checkOutDate.split('T')[0]}</p>
                      <p><strong>Price:</strong> ${reservation.price}/night</p>
                      <p><strong>Number of Nights:</strong> {numDays} nights</p>
                      <p><strong>Total:</strong> ${formatted}</p>
                      <p><strong>Confirmation Number:</strong> {reservation.confirmationNumber}</p>
                    </div>
                    <Button
                      color="danger"
                      variant="bordered"
                      onClick={() => handleCancelReservation(reservation._id)}
                      startContent={<MdFreeCancellation />}
                    >
                      Cancel Reservation
                    </Button>
                    <Spacer x={4} />
                    <Button
                        color="primary"
                        variant="bordered"
                        onClick={() => location.href=`/MakeReview?reservation=${reservation._id}`}
                        startContent={<MdRateReview />}
                    >
                      Write Review
                    </Button>
                  </li>
                );
              })
            ) : (
              <p>No reservations found.</p>
            )}
          </ul>
        </div>
      ) : role === 'admin' ? (
        <div style={{ marginTop: '20px' }}>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <h3 style={{ marginBottom: '10px' }}>Manage Hotels</h3>

          <form onSubmit={handleHotelSubmit} style={{ marginBottom: '20px' }}>
            <Input
              type="text"
              placeholder="Hotel Title"
              value={newHotel.title}
              onChange={(e) => setNewHotel({ ...newHotel, title: e.target.value })}
            />
            <Spacer y={4} />
            <Input
              type="text"
              placeholder="Location"
              value={newHotel.location}
              onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
            />
            <Spacer y={4} />
            <Input
              type="text"
              placeholder="Amenities (comma-separated)"
              value={newHotel.amenities}
              onChange={(e) => setNewHotel({ ...newHotel, amenities: e.target.value })}
            />
            <Spacer y={4} />
            <Input
              type="text"
              placeholder="Image URL"
              value={newHotel.image}
              onChange={(e) => setNewHotel({ ...newHotel, image: e.target.value })}
            />
            <Spacer y={4} />
            <Input
              type="number"
              placeholder="Price"
              value={newHotel.price}
              onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
            />
            <Spacer y={4} />
            <Input
              type="number"
              placeholder="Rating"
              value={newHotel.rating}
              onChange={(e) => setNewHotel({ ...newHotel, rating: e.target.value })}
            />
            <Spacer y={4} />
            <Input
              type="text"
              placeholder="Room type"
              value={newHotel.roomType}
              onChange={(e) => setNewHotel({ ...newHotel, roomType: e.target.value })}
            />
             <Spacer y={4} />
            <Button type="submit" color="warning" variant="bordered" startContent={<MdPostAdd />}>
              Add Hotel
            </Button>
          </form>
          <Divider className="my-4" />
          <h3 className="text-2xl font-bold">Reservation Report</h3>
          <Button
            color="primary"
            variant="bordered"
            onClick={handleDownloadReport}
            startContent={<FaDownload />}
          >
            Download Reservations Report
          </Button>
          <Divider className="my-4" />
          {editHotel && (
            <form onSubmit={handleUpdateHotel} style={{ marginBottom: '20px' }}>
              <h3 className="text-xl font-semibold">Update Hotel</h3>
              <Input
                label="Title"
                value={editHotel.title}
                onChange={(e) => setEditHotel({ ...editHotel, title: e.target.value })}
              />
              <Spacer y={4} />
              <Input
                label="Location"
                value={editHotel.location}
                onChange={(e) => setEditHotel({ ...editHotel, location: e.target.value })}
              />
              <Spacer y={4} />
              <Input
                label="Amenities"
                value={editHotel.amenities}
                onChange={(e) => setEditHotel({ ...editHotel, amenities: e.target.value })}
              />
              <Spacer y={4} />
              <Input
                label="Image URL"
                value={editHotel.image}
                onChange={(e) => setEditHotel({ ...editHotel, image: e.target.value })}
              />
              <Spacer y={4} />
              <Input
                label="Price per Night"
                value={editHotel.price}
                onChange={(e) => setEditHotel({ ...editHotel, price: e.target.value })}
              />
              <Spacer y={4} />
              
              <Input
              type="text"
              placeholder="Room type"
              value={editHotel.roomType}
              onChange={(e) => setEditHotel({ ...editHotel, roomType: e.target.value })}
            />
             <Spacer y={4} />
              <Button color="success" type="submit" variant="bordered" startContent={<MdPostAdd />}>
                Update Hotel
              </Button>
            </form>
          )}
          <Divider className="my-4" />
            <h3 className="text-2xl font-bold">Existing Hotels</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <li key={hotel._id} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <h4 className="text-xl font-bold">{hotel.title}</h4>
                      <p>Location: {hotel.location}</p>
                      <p>Amenities: {hotel.amenities.join(", ")}</p>
                      <p>Price: ${hotel.price}</p>
                      <p>Room Type: {hotel.roomType}</p>
                      <p>Rating: {hotel.rating} stars</p>
                      <Image src={hotel.image} alt={hotel.title} width={200}></Image>
                    </div>
                    <Spacer y={4} />
                    <Button onClick={() => setEditHotel(hotel)} color="secondary" variant="bordered" startContent={<FaRegEdit />}>
                      Edit
                    </Button>
                    <Spacer x={4} />
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
