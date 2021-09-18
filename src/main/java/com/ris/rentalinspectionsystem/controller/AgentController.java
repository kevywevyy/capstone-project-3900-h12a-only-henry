package com.ris.rentalinspectionsystem.controller;

import com.ris.rentalinspectionsystem.dao.AgentDao;
import com.ris.rentalinspectionsystem.model.Agent;
import com.ris.rentalinspectionsystem.model.AgentRegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/agent")
public class AgentController {

    private final AgentDao agentDao;

    @Autowired
    public AgentController(AgentDao agentDao) {
        this.agentDao = agentDao;
    }

    @GetMapping("")
    public List<Agent> getAgents() {
        return agentDao.getAgents();
    }

    @GetMapping("/{agentId")
    public Agent getAgent(
            @PathVariable("agentId") Long agentId
    ) {
        return agentDao.getAgent(agentId);
    }

    @PostMapping("")
    public void createAgent(
            @RequestBody AgentRegistrationRequest agentRegistrationRequest
    ) {
        try {
            agentDao.createAgent(agentRegistrationRequest);
        } catch (DuplicateKeyException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is already taken.");
        }
    }
}
