package com.airbnb.airbnbclone.service.impl;

import com.airbnb.airbnbclone.exception.ResourceNotFoundException;
import com.airbnb.airbnbclone.exception.UnauthorizedException;
import com.airbnb.airbnbclone.model.domain.Booking;
import com.airbnb.airbnbclone.model.domain.Listing;
import com.airbnb.airbnbclone.model.domain.User;
import com.airbnb.airbnbclone.model.domain.enums.BookingStatus;
import com.airbnb.airbnbclone.model.dto.BookingDTO;
import com.airbnb.airbnbclone.repository.BookingRepository;
import com.airbnb.airbnbclone.repository.ListingRepository;
import com.airbnb.airbnbclone.repository.UserRepository;
import com.airbnb.airbnbclone.service.application.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO, Long guestId) {
        User guest = userRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + guestId));

        Listing listing = listingRepository.findById(bookingDTO.getListingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + bookingDTO.getListingId()));

        List<Booking> overlapping = bookingRepository.findOverlappingBookings(
                listing.getId(), bookingDTO.getCheckInDate(), bookingDTO.getCheckOutDate());

        if (!overlapping.isEmpty()) {
            throw new RuntimeException("Listing is not available for the selected dates");
        }

        long nights = ChronoUnit.DAYS.between(bookingDTO.getCheckInDate(), bookingDTO.getCheckOutDate());
        BigDecimal totalPrice = listing.getPricePerNight().multiply(BigDecimal.valueOf(nights));

        Booking booking = Booking.builder()
                .listing(listing)
                .guest(guest)
                .checkInDate(bookingDTO.getCheckInDate())
                .checkOutDate(bookingDTO.getCheckOutDate())
                .numberOfGuests(bookingDTO.getNumberOfGuests())
                .totalPrice(totalPrice)
                .status(BookingStatus.PENDING)
                .build();

        return mapToDTO(bookingRepository.save(booking));
    }

    @Override
    @Transactional(readOnly = true)
    public BookingDTO getBookingById(Long id, Long userId) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        boolean isGuest = booking.getGuest().getId().equals(userId);
        boolean isHost = booking.getListing().getHost().getId().equals(userId);

        if (!isGuest && !isHost) {
            throw new UnauthorizedException("You are not authorized to view this booking");
        }

        return mapToDTO(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByGuest(Long guestId) {
        return bookingRepository.findByGuestId(guestId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByListing(Long listingId) {
        return bookingRepository.findByListingId(listingId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByHost(Long hostId) {
        return bookingRepository.findByListingHostId(hostId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BookingDTO confirmBooking(Long id, Long hostId) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        if (!booking.getListing().getHost().getId().equals(hostId)) {
            throw new UnauthorizedException("You are not authorized to confirm this booking");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        return mapToDTO(bookingRepository.save(booking));
    }

    @Override
    public BookingDTO cancelBooking(Long id, Long userId) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        boolean isGuest = booking.getGuest().getId().equals(userId);
        boolean isHost = booking.getListing().getHost().getId().equals(userId);

        if (!isGuest && !isHost) {
            throw new UnauthorizedException("You are not authorized to cancel this booking");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        return mapToDTO(bookingRepository.save(booking));
    }

    private BookingDTO mapToDTO(Booking booking) {
        return BookingDTO.builder()
                .id(booking.getId())
                .listingId(booking.getListing().getId())
                .listingTitle(booking.getListing().getTitle())
                .guestId(booking.getGuest().getId())
                .guestName(booking.getGuest().getFirstName() + " " + booking.getGuest().getLastName())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .numberOfGuests(booking.getNumberOfGuests())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .build();
    }
}
