package com.ris.rentalinspectionsystem.controller;

import com.ris.rentalinspectionsystem.dao.EstateDao;
import com.ris.rentalinspectionsystem.dao.InspectorDao;
import com.ris.rentalinspectionsystem.model.Estate;
import com.ris.rentalinspectionsystem.model.Inspector;
import com.ris.rentalinspectionsystem.model.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.conversion.DbActionExecutionException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/inspector")
public class InspectorController {

    private final InspectorDao inspectorDao;
    private final EstateDao estateDao;

    @Autowired
    public InspectorController(InspectorDao inspectorDao, EstateDao estateDao) {
        this.inspectorDao  = inspectorDao;
        this.estateDao = estateDao;
    }

    @GetMapping("")
    public List<Inspector> getInspectors() { return inspectorDao.getInspectors(); }

    @GetMapping("/{inspectorId}")
    public Inspector getInspector(
            @PathVariable("inspectorId") Long inspectorId
    ) {
        return inspectorDao.getInspector(inspectorId);
    }

    @PostMapping("")
    public Inspector createInspector(
            @Valid @RequestBody Inspector inspector
    ) {
        try {
            return inspectorDao.createInspector(inspector);
        } catch (DbActionExecutionException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/{inspectorId}/estates/all")
    public List<Estate> getEstates(
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Integer bathrooms,
            @RequestParam(required = false) Integer garages,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) Integer landSqmMin,
            @RequestParam(required = false) Integer landSqmMax,
            @RequestParam(required = false) Integer priceMin,
            @RequestParam(required = false) Integer priceMax,
            @RequestParam(required = false) Boolean open
    ) {
        Map<String, Object> queryParams = new HashMap();
        queryParams.put("bedrooms", bedrooms);
        queryParams.put("bathrooms", bathrooms);
        queryParams.put("garages", garages);
        queryParams.put("property_type", propertyType);
        queryParams.put("land_sqm_min", landSqmMin);
        queryParams.put("land_sqm_max", landSqmMax);
        queryParams.put("price_min", priceMin);
        queryParams.put("price_max", priceMax);
        queryParams.put("open", open);

        queryParams.values().removeAll(Collections.singleton(null));

        return estateDao.getEstates(queryParams);
    }

    @PostMapping("/login")
    public String login(
            @Valid @RequestBody Login login
    ) {
        try {
            String token = inspectorDao.login(login);
            if (token == null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "The username or password is incorrect"
                );
            }
            return token;
        } catch (DbActionExecutionException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
