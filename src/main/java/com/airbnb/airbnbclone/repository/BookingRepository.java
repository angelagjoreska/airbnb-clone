package com.airbnb.airbnbclone.repository;

import com.airbnb.airbnbclone.model.domain.Booking;
import com.airbnb.airbnbclone.model.domain.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByGuestId(Long guestId);

    List<Booking> findByListingId(Long listingId);

    List<Booking> findByStatus(BookingStatus status);

    List<Booking> findByListingHostId(Long hostId);

    @Query("""
            SELECT b FROM Booking b
            WHERE b.listing.id = :listingId
            AND b.status != 'CANCELLED'
            AND (b.checkInDate < :checkOut AND b.checkOutDate > :checkIn)
            """)
    List<Booking> findOverlappingBookings(@Param("listingId") Long listingId,
                                          @Param("checkIn") LocalDate checkIn,
                                          @Param("checkOut") LocalDate checkOut);
}