package com.ris.rentalinspectionsystem.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.sql.Timestamp;

@Data
@Table("history")
public class History {

    @Id
    @Null
    private final Long historyId;
    @NotNull
    @JsonProperty("inspector_id")
    private final Long inspectorId;
    @NotNull
    @JsonProperty("estate_id")
    private final Long estateId;
    @Null // maybe?? not sure how current timestamp works
    @JsonProperty("view_date")
    private final Timestamp viewDate; // Do I even include this??!

    public History(
            Long historyId,
            Long inspectorId,
            Long estateId,
            Timestamp viewDate
    ) {
        this.historyId = historyId;
        this.inspectorId = inspectorId;
        this.estateId = estateId;
        this.viewDate = viewDate;
    }
}
