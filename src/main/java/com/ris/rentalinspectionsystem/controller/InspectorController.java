package com.ris.rentalinspectionsystem.controller;

import com.ris.rentalinspectionsystem.dao.InspectorDao;
import com.ris.rentalinspectionsystem.model.Inspector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.conversion.DbActionExecutionException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/inspector")
public class InspectorController {

    private final InspectorDao inspectorDao;

    @Autowired
    public InspectorController(InspectorDao inspectorDao) {
        this.inspectorDao  = inspectorDao;
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
}
