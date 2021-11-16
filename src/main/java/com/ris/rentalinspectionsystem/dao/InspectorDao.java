package com.ris.rentalinspectionsystem.dao;

import com.ris.rentalinspectionsystem.model.Inspector;
import com.ris.rentalinspectionsystem.repositories.InspectorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InspectorDao {

    private final InspectorsRepository inspectorsRepository;

    @Autowired
    public InspectorDao(InspectorsRepository inspectorsRepository) { this.inspectorsRepository = inspectorsRepository; }

    public List<Inspector> getInspectors() { return (List<Inspector>) inspectorsRepository.findAll(); }

    public Inspector getInspector(Long id) { return inspectorsRepository.findById(id).orElse(null); }

    public Inspector createInspector(Inspector inspector) { return inspectorsRepository.save(inspector); }

    public Inspector putInspector(Long inspectorId, Inspector inspector) {
        inspector.setInspectorId(inspectorId);
        return inspectorsRepository.save(inspector);
    }
}
