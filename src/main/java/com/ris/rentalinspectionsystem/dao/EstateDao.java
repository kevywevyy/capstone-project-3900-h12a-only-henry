package com.ris.rentalinspectionsystem.dao;

import com.ris.rentalinspectionsystem.model.Estate;
import com.ris.rentalinspectionsystem.repositories.EstatesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EstateDao {

    private final EstatesRepository estatesRepository;

    @Autowired
    public EstateDao(estatesRepository estatesRepository) {
        this.estatesRepository = estatesRepository;
    }

    public List<Estate> getEstates() {
        return (List<Estate>) estatesRepository.findAll();
    }

    public Estate getEstate(Long id) {
        return estatesRepository.findById(id).orElse(null);
    }

    public Estate createEstate(Estate estate) {
        return estatesRepository.save(estate);
    }

    public Estate putEstate(Long estateId, Estate estate) {
        estate.setId(estateId);
        return estatesRepository.save(estate);
    }
}