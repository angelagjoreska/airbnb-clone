package com.airbnb.airbnbclone.service.application;

import com.airbnb.airbnbclone.model.domain.enums.ListingCategory;
import com.airbnb.airbnbclone.model.dto.ListingDTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ListingService {

    ListingDTO createListing(ListingDTO listingDTO, Long hostId);

    ListingDTO getListingById(Long id);

    List<ListingDTO> getAllListings();

    List<ListingDTO> getListingsByCity(Long cityId);

    List<ListingDTO> getListingsByHost(Long hostId);

    List<ListingDTO> getListingsByCategory(ListingCategory category);

    List<ListingDTO> searchListings(Long cityId,
                                    String location,
                                    ListingCategory category,
                                    BigDecimal minPrice,
                                    BigDecimal maxPrice,
                                    Integer guests,
                                    LocalDate checkIn,
                                    LocalDate checkOut);

    ListingDTO updateListing(Long id, ListingDTO listingDTO, Long hostId);

    void deleteListing(Long id, Long hostId);

    ListingDTO toggleAvailability(Long id, Long hostId);
}
