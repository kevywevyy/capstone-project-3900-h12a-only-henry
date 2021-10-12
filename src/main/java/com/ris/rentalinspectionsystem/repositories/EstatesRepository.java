package com.ris.rentalinspectionsystem.repositories;

import com.ris.rentalinspectionsystem.model.Estate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstatesRepository extends CrudRepository<Estate, Long> {
    Estate findByAgentIdAndId(Long agent_id, Long id);
    List<Estate> findAllByAgentId(Long agent_id);
}
