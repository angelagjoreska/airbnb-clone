package com.airbnb.airbnbclone.model.domain;

import com.airbnb.airbnbclone.model.domain.enums.ListingCategory;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Listing extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerNight;

    @Column(nullable = false)
    private Integer maxGuests;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ListingCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id", nullable = false)
    private User host;

    @ElementCollection
    @CollectionTable(name = "listing_images", joinColumns = @JoinColumn(name = "listing_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;

    @ElementCollection
    @CollectionTable(name = "listing_amenities", joinColumns = @JoinColumn(name = "listing_id"))
    @Column(name = "amenity")
    private List<String> amenities;

    @Column(nullable = false)
    private Boolean isAvailable = true;

    private Integer bedrooms;

    private Integer bathrooms;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;
}