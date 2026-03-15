package com.airbnb.airbnbclone.service.application;

import com.airbnb.airbnbclone.model.dto.BookingDTO;

import java.util.List;

public interface BookingService {

    BookingDTO createBooking(BookingDTO bookingDTO, Long guestId);

    BookingDTO getBookingById(Long id);

    List<BookingDTO> getBookingsByGuest(Long guestId);

    List<BookingDTO> getBookingsByListing(Long listingId);

    List<BookingDTO> getBookingsByHost(Long hostId);

    BookingDTO confirmBooking(Long id, Long hostId);

    BookingDTO cancelBooking(Long id, Long userId);
}