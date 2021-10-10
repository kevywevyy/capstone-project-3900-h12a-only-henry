package com.ris.rentalinspectionsystem.controller;

import com.ris.rentalinspectionsystem.dao.EstateDao;
import com.ris.rentalinspectionsystem.model.Estate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.conversion.DbActionExecutionException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/agent/{agentId}/estates")
public class EstateController {
    private final EstateDao estateDao;

    @Autowired
    public EstateController(EstateDao estateDao) { this.estateDao = estateDao; }

    @GetMapping("")
    public List<Estate> getEstates(@PathVariable("agentId") Long agentId) { return estateDao.getEstates(agentId); }

    @GetMapping("/{estateId}")
    public Estate getEstate(
            @PathVariable("agentId") Long agentId,
            @PathVariable("estateId") Long estateId
    ) {
        return estateDao.getEstate(agentId, estateId);
    }

    @PostMapping("")
    public void createEstate(
            @PathVariable("agentId") Long agentId,
            @Valid @RequestBody Estate estate
    ) {
        try {
            estateDao.createEstate(agentId, estate);
        } catch (DbActionExecutionException e) { // not sure if it's this exception yet
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("{estateId}")
    public Estate updateEstate (
            @PathVariable("agentId") Long agentId,
            @PathVariable("estateId") Long estateId,
            @Valid @RequestBody Estate estate
    ) {
        try {
            return estateDao.putEstate(agentId, estateId, estate);
        } catch (DbActionExecutionException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}