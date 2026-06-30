package com.airbnb.airbnbclone.repository;

import com.airbnb.airbnbclone.model.domain.Listing;
import com.airbnb.airbnbclone.model.domain.enums.ListingCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

    List<Listing> findByCityId(Long cityId);

    List<Listing> findByHostId(Long hostId);

    List<Listing> findByCategory(ListingCategory category);

    List<Listing> findByIsAvailableTrue();

    @Query("SELECT l FROM Listing l WHERE l.city.id = :cityId AND l.isAvailable = true")
    List<Listing> findAvailableListingsByCity(@Param("cityId") Long cityId);

    @Query("SELECT l FROM Listing l WHERE l.pricePerNight BETWEEN :minPrice AND :maxPrice AND l.isAvailable = true")
    List<Listing> findByPriceRange(@Param("minPrice") BigDecimal minPrice,
                                   @Param("maxPrice") BigDecimal maxPrice);

    @Query("SELECT l FROM Listing l WHERE l.maxGuests >= :guests AND l.isAvailable = true")
    List<Listing> findByMinGuests(@Param("guests") int guests);

    @Query("""
            SELECT l FROM Listing l
            WHERE (:cityId IS NULL OR l.city.id = :cityId)
            AND (:locationPattern IS NULL OR LOWER(l.city.name) LIKE :locationPattern
                OR LOWER(l.city.country) LIKE :locationPattern
                OR LOWER(l.title) LIKE :locationPattern)
            AND (:category IS NULL OR l.category = :category)
            AND (:minPrice IS NULL OR l.pricePerNight >= :minPrice)
            AND (:maxPrice IS NULL OR l.pricePerNight <= :maxPrice)
            AND (:guests IS NULL OR l.maxGuests >= :guests)
            AND l.isAvailable = true
            AND (:checkIn IS NULL OR :checkOut IS NULL OR NOT EXISTS (
                SELECT b FROM Booking b
                WHERE b.listing = l
                AND b.status != 'CANCELLED'
                AND b.checkInDate < :checkOut
                AND b.checkOutDate > :checkIn
            ))
            """)
    List<Listing> searchListings(@Param("cityId") Long cityId,
                                 @Param("locationPattern") String locationPattern,
                                 @Param("category") ListingCategory category,
                                 @Param("minPrice") BigDecimal minPrice,
                                 @Param("maxPrice") BigDecimal maxPrice,
                                 @Param("guests") Integer guests,
                                 @Param("checkIn") LocalDate checkIn,
                                 @Param("checkOut") LocalDate checkOut);
}
