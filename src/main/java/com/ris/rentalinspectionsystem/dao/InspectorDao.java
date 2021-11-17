package com.ris.rentalinspectionsystem.dao;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.ris.rentalinspectionsystem.model.Inspector;
import com.ris.rentalinspectionsystem.model.Login;
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

    public String login(Login login) {

        List<Inspector> inspectors = inspectorsRepository.findByEmailAndPassword(login.getUsername(), login.getPassword());
        if (inspectors.size() != 1) {
            return null;
        } else {
            Inspector inspector = inspectors.get(0);
            // Generate a token for the agent.
            JWTCreator.Builder jwtBuilder = JWT.create().withClaim("id", inspector.getInspectorId());
            return jwtBuilder.sign(Algorithm.HMAC256("rental-inspection-system"));
        }

    }
}
