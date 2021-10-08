package com.ris.rentalinspectionsystem.dao;

import com.ris.rentalinspectionsystem.model.Agent;
import com.ris.rentalinspectionsystem.repositories.AgentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AgentDao {

    private final AgentsRepository agentsRepository;

    @Autowired
    public AgentDao(AgentsRepository agentsRepository) {
        this.agentsRepository = agentsRepository;
    }

    public List<Agent> getAgents() {
        return (List<Agent>) agentsRepository.findAll();
    }

    public Agent getAgent(Long id) {
        return agentsRepository.findById(id).orElse(null);
    }

    public Agent createAgent(Agent agent) {
        return agentsRepository.save(agent);
    }

    public Agent putAgent(Agent agent) {
        return agentsRepository.save(agent);
    }
}
