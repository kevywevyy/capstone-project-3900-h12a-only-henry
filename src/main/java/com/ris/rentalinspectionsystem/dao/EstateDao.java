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
    public EstateDao(EstatesRepository estatesRepository) {
        this.estatesRepository = estatesRepository;
    }

    public List<Estate> getEstates(Long id) {
        return estatesRepository.findAllByAgentId(id);
    }

    public Estate getEstate(Long agentId, Long estateId) {
        return estatesRepository.findByAgentIdAndId(agentId, estateId);
    }

    public Estate createEstate(Long agentId, Estate estate) {
        estate.setAgentId(agentId);
        return estatesRepository.save(estate);
    }

    public Estate putEstate(Long agentId, Long estateId, Estate estate) {
        estate.setAgentId(agentId);
        estate.setId(estateId);
        return estatesRepository.save(estate);
    }
}