package com.ris.rentalinspectionsystem.controller;


import com.ris.rentalinspectionsystem.dao.InspectionDao;
import com.ris.rentalinspectionsystem.model.Inspection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/agent/{agentId}/estates/{estateId}/inspections")
public class InspectionController {

    private final InspectionDao inspectionDao;

    @Autowired
    public InspectionController(InspectionDao inspectionDao) {
        this.inspectionDao = inspectionDao;
    }

    @GetMapping
    public List<Inspection> getInspection(@PathVariable("estateId") Long estateId) {
        return inspectionDao.getInspections(estateId);
    }

    @PostMapping
    public Inspection createInspection(
            @PathVariable("estateId") Long estateId,
            @Valid @RequestBody Inspection inspection
    ) {
        return inspectionDao.createInspection(estateId, inspection);
    }

    @DeleteMapping("/{inspectionId}")
    public void deleteInspection(@PathVariable("inspectionId") Long inspectionId) {
        inspectionDao.deleteInspection(inspectionId);
    }
}
