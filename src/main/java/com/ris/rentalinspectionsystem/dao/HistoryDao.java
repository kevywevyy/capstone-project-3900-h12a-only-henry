package com.ris.rentalinspectionsystem.dao;

import com.ris.rentalinspectionsystem.model.History;
import com.ris.rentalinspectionsystem.repositories.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.Instant;
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
        Instant it = Instant.now();
        Timestamp timestamp = Timestamp.from(it);
        History prev = historyRepository.findByInspectorIdAndEstateId(inspectorId, estateId);
        History history;
        if (prev == null) {
            history = new History(null, inspectorId, estateId, timestamp);
        } else {
            history = new History(prev.getHistoryId(), inspectorId, estateId, timestamp);
        }
        return historyRepository.save(history);
    }
}
