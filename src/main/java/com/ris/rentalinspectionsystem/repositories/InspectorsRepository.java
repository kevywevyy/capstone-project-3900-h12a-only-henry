package com.ris.rentalinspectionsystem.repositories;

import com.ris.rentalinspectionsystem.model.Inspector;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InspectorsRepository extends CrudRepository<Inspector, Long> {
}
