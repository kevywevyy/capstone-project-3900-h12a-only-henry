package com.ris.rentalinspectionsystem.controller;

import com.ris.rentalinspectionsystem.dao.EstateDao;
import com.ris.rentalinspectionsystem.model.Estate;
import com.ris.rentalinspectionsystem.model.EstateRegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/estate")
public class EstateController {
    private final EstateDao estateDao;

    @Autowired
    public EstateController(EstateDao estateDao) { this.estateDao = estateDao; }

    @GetMapping("")
    public List<Estate> getEstates() { return estateDao.getEstates(); }

    @GetMapping("/{estateId}")
    public Estate getEstate(
            @PathVariable("estateId") Long estateId
    ) {
        return estateDao.getEstate(estateId);
    }

    @PostMapping("")
    public void createEstate(
            @RequestBody EstateRegistrationRequest estateRegistrationRequest
    ) {
        try {
            estateDao.createEstate(estateRegistrationRequest);
        } catch (DuplicateKeyException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estate is already listed.");
        }
    }
}
