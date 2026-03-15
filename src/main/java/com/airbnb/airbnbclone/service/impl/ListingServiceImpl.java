package com.airbnb.airbnbclone.service.impl;

import com.airbnb.airbnbclone.exception.ResourceNotFoundException;
import com.airbnb.airbnbclone.exception.UnauthorizedException;
import com.airbnb.airbnbclone.model.domain.City;
import com.airbnb.airbnbclone.model.domain.Listing;
import com.airbnb.airbnbclone.model.domain.User;
import com.airbnb.airbnbclone.model.domain.enums.ListingCategory;
import com.airbnb.airbnbclone.model.dto.ListingDTO;
import com.airbnb.airbnbclone.repository.CityRepository;
import com.airbnb.airbnbclone.repository.ListingRepository;
import com.airbnb.airbnbclone.repository.UserRepository;
import com.airbnb.airbnbclone.service.application.ListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ListingServiceImpl implements ListingService {

    private final ListingRepository listingRepository;
    private final CityRepository cityRepository;
    private final UserRepository userRepository;

    @Override
    public ListingDTO createListing(ListingDTO listingDTO, Long hostId) {
        User host = userRepository.findById(hostId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + hostId));

        City city = cityRepository.findById(listingDTO.getCityId())
                .orElseThrow(() -> new ResourceNotFoundException("City not found with id: " + listingDTO.getCityId()));

        Listing listing = mapToEntity(listingDTO, host, city);
        listing.setIsAvailable(true);

        Listing saved = listingRepository.save(listing);
        return mapToDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ListingDTO getListingById(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));
        return mapToDTO(listing);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListingDTO> getAllListings() {
        return listingRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListingDTO> getListingsByCity(Long cityId) {
        return listingRepository.findAvailableListingsByCity(cityId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListingDTO> getListingsByHost(Long hostId) {
        return listingRepository.findByHostId(hostId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListingDTO> getListingsByCategory(ListingCategory category) {
        return listingRepository.findByCategory(category)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ListingDTO> searchListings(Long cityId, ListingCategory category,
                                           BigDecimal minPrice, BigDecimal maxPrice, Integer guests) {
        return listingRepository.searchListings(cityId, category, minPrice, maxPrice, guests)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ListingDTO updateListing(Long id, ListingDTO listingDTO, Long hostId) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));

        if (!listing.getHost().getId().equals(hostId)) {
            throw new UnauthorizedException("You are not authorized to update this listing");
        }

        City city = cityRepository.findById(listingDTO.getCityId())
                .orElseThrow(() -> new ResourceNotFoundException("City not found with id: " + listingDTO.getCityId()));

        listing.setTitle(listingDTO.getTitle());
        listing.setDescription(listingDTO.getDescription());
        listing.setPricePerNight(listingDTO.getPricePerNight());
        listing.setMaxGuests(listingDTO.getMaxGuests());
        listing.setCategory(listingDTO.getCategory());
        listing.setCity(city);
        listing.setImageUrls(listingDTO.getImageUrls());
        listing.setAmenities(listingDTO.getAmenities());
        listing.setBedrooms(listingDTO.getBedrooms());
        listing.setBathrooms(listingDTO.getBathrooms());

        return mapToDTO(listingRepository.save(listing));
    }

    @Override
    public void deleteListing(Long id, Long hostId) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));

        if (!listing.getHost().getId().equals(hostId)) {
            throw new UnauthorizedException("You are not authorized to delete this listing");
        }

        listingRepository.delete(listing);
    }

    @Override
    public ListingDTO toggleAvailability(Long id, Long hostId) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));

        if (!listing.getHost().getId().equals(hostId)) {
            throw new UnauthorizedException("You are not authorized to modify this listing");
        }

        listing.setIsAvailable(!listing.getIsAvailable());
        return mapToDTO(listingRepository.save(listing));
    }

    private Listing mapToEntity(ListingDTO dto, User host, City city) {
        return Listing.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .pricePerNight(dto.getPricePerNight())
                .maxGuests(dto.getMaxGuests())
                .category(dto.getCategory())
                .city(city)
                .host(host)
                .imageUrls(dto.getImageUrls())
                .amenities(dto.getAmenities())
                .bedrooms(dto.getBedrooms())
                .bathrooms(dto.getBathrooms())
                .build();
    }

    private ListingDTO mapToDTO(Listing listing) {
        double avgRating = 0;
        int totalReviews = 0;

        if (listing.getReviews() != null && !listing.getReviews().isEmpty()) {
            totalReviews = listing.getReviews().size();
            avgRating = listing.getReviews().stream()
                    .mapToInt(r -> r.getRating())
                    .average()
                    .orElse(0);
        }

        return ListingDTO.builder()
                .id(listing.getId())
                .title(listing.getTitle())
                .description(listing.getDescription())
                .pricePerNight(listing.getPricePerNight())
                .maxGuests(listing.getMaxGuests())
                .category(listing.getCategory())
                .cityId(listing.getCity().getId())
                .cityName(listing.getCity().getName())
                .hostId(listing.getHost().getId())
                .hostName(listing.getHost().getFirstName() + " " + listing.getHost().getLastName())
                .imageUrls(listing.getImageUrls())
                .amenities(listing.getAmenities())
                .bedrooms(listing.getBedrooms())
                .bathrooms(listing.getBathrooms())
                .isAvailable(listing.getIsAvailable())
                .averageRating(avgRating)
                .totalReviews(totalReviews)
                .build();
    }
}