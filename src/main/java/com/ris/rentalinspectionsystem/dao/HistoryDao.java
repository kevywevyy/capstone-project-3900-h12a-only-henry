package com.ris.rentalinspectionsystem.dao;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.ris.rentalinspectionsystem.model.History;
import com.ris.rentalinspectionsystem.repositories.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HistoryDao {

    private final HistoryRepository historyRepository;

    @Autowired
    public HistoryDao(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public List<History> getHistory(Long inspectorId) { return historyRepository.findByInspectorId(inspectorId); }

    public History createHistory(Long inspectorId, Long estateId) {
        History history = new History(null, inspectorId, estateId, java.time.LocalDate.now());
        return historyRepository.save(history);
    }
}
