package com.airbnb.airbnbclone.repository;

import com.airbnb.airbnbclone.model.domain.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    Optional<City> findByNameIgnoreCase(String name);

    List<City> findByCountryIgnoreCase(String country);

    boolean existsByNameIgnoreCase(String name);
}