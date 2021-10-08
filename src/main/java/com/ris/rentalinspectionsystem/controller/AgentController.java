package com.ris.rentalinspectionsystem.controller;

import com.ris.rentalinspectionsystem.dao.AgentDao;
import com.ris.rentalinspectionsystem.model.Agent;
import com.ris.rentalinspectionsystem.model.Enquiry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.conversion.DbActionExecutionException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
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

    @GetMapping("/{agentId}")
    public Agent getAgent(
            @PathVariable("agentId") Long agentId
    ) {
        return agentDao.getAgent(agentId);
    }

    @PostMapping("")
    public Agent createAgent(
            @Valid @RequestBody Agent agent
    ) {
        try {
            return agentDao.createAgent(agent);
        } catch (DbActionExecutionException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("/{agentId}")
    public Agent updateAgent(
            @PathVariable Long agentId,
            @Valid @RequestBody Agent agent
    ) {
        try {
            return agentDao.putAgent(new Agent(agentId, agent.getUsername(), agent.getPassword()));
        } catch (DbActionExecutionException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("/{agentId}/enquiries")
    public Enquiry contactAgent(
            @PathVariable Long agentId,
            @Valid @RequestBody Enquiry enquiry
    ) {
        return enquiry;
    }
}
